import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

import React, { useState, useRef, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import UserVideoComponent from './UserVideoComponent';

const VideoKycPage = () => {
    const setSession = useState()[1];
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [mySessionId, setMySessionId] = useState('SessionA');
    const [myUserName, setMyUserName] = useState(
        'Participant' + Math.floor(Math.random() * 100)
    );
    const [mainStreamManager, setMainStreamManager] = useState();

    const canvasRef = useRef();
    const OVRef = useRef();
    const sessionRef = useRef();

    const onStreamCreated = useCallback(async (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        const newSession = sessionRef.current;

        const subscriber = await newSession.subscribe(event.stream, undefined);
        //debugger; // eslint-disable-line

        // Update the state with the new subscribers
        setSubscribers((prevValue) => [...prevValue, subscriber]);
    }, []);

    const onStreamDestroyed = useCallback(
        (event) => {
            const subscribersObj = subscribers;
            const index = subscribersObj.indexOf(event.stream.streamManager, 0);
          //  debugger; // eslint-disable-line
            if (index > -1) {
                subscribersObj.splice(index, 1);
                setSubscribers(subscribersObj);
            }
        },
        [subscribers]
    );

    const updateSession = async (newSession) => {
        newSession.on('streamCreated', onStreamCreated);

        // On every Stream destroyed...
        newSession.on('streamDestroyed', onStreamDestroyed);

        // --- 4) Connect to the session with a valid user token ---

        const createSession = (sessionId) => {
            return new Promise((resolve, reject) => {
                var data = JSON.stringify({ customSessionId: sessionId });
                axios
                    .post(
                        process.env.REACT_APP_OPENVIDU_SERVER_URL +
                        '/api/sessions',
                        data,
                        {
                            headers: {
                                Authorization:
                                    'Basic ' +
                                    btoa(
                                        'OPENVIDUAPP:' +
                                        process.env
                                            .REACT_APP_OPENVIDU_SERVER_SECRET
                                    ),
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                    .then((response) => {
                        resolve(response.data.id);
                    })
                    .catch((response) => {
                        var error = Object.assign({}, response);
                        if (error.response.status === 409) {
                            resolve(sessionId);
                        } else {
                            console.log(error);
                            console.warn(
                                'No connection to OpenVidu Server. This may be a certificate error at ' +
                                process.env.REACT_APP_OPENVIDU_SERVER_URL
                            );
                            if (
                                window.confirm(
                                    'No connection to OpenVidu Server. This may be a certificate error at "' +
                                    process.env
                                        .REACT_APP_OPENVIDU_SERVER_URL +
                                    '"\n\nClick OK to navigate and accept it. ' +
                                    'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                    process.env
                                        .REACT_APP_OPENVIDU_SERVER_URL +
                                    '"'
                                )
                            ) {
                                window.location.assign(
                                    process.env.REACT_APP_OPENVIDU_SERVER_URL +
                                    '/accept-certificate'
                                );
                            }
                        }
                    });
            });
        };

        const createToken = (sessionId) => {
            return new Promise((resolve, reject) => {
                var data = JSON.stringify({ session: sessionId });
                axios
                    .post(
                        process.env.REACT_APP_OPENVIDU_SERVER_URL +
                        '/api/tokens',
                        data,
                        {
                            headers: {
                                Authorization:
                                    'Basic ' +
                                    btoa(
                                        'OPENVIDUAPP:' +
                                        process.env
                                            .REACT_APP_OPENVIDU_SERVER_SECRET
                                    ),
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                    .then((response) => {
                        resolve(response.data.token);
                    })
                    .catch((error) => reject(error));
            });
        };

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        const getToken = async () => {
            const sessionId_1 = await createSession(mySessionId);
            return await createToken(sessionId_1);
        };

        await getToken().then((token) => {
            // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
            // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
            newSession
                .connect(token, { clientData: myUserName })
                .then(() => {
                    // --- 5) Get your own camera stream ---

                    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                    // element: we will manage it on our own) and with the desired properties
                    const OV = OVRef.current;

                    let publisher = OV.initPublisher(undefined, {
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: true, // Whether you want to start publishing with your video enabled or not
                        resolution: '640x480', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: false, // Whether to mirror your local video or not
                    });

                    // --- 6) Publish your stream ---

                    newSession.publish(publisher);

                    // Set the main video in the page to display our webcam and store our Publisher
                    setMainStreamManager(publisher);
                    setPublisher(publisher);
                })
                .catch((error) => {
                    console.log(
                        'There was an error connecting to the session:',
                        error.code,
                        error.message
                    );
                });
        });

        sessionRef.current = newSession;
        setSession(newSession);
    };

    const leaveSession = () => {
        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
        const newSession = sessionRef.current;

        if (newSession) {
            newSession.disconnect();
        }

        // Empty all properties...
        OVRef.current = undefined;
        sessionRef.current = undefined;

        setSession(undefined);
        setSubscribers([]);
        setMySessionId('SessionA');
        setMyUserName('Participant' + Math.floor(Math.random() * 100));
        setMainStreamManager(undefined);
        setPublisher(undefined);
    };

    const handleChangeSessionId = (e) => {
        setMySessionId(e.target.value);
    };

    const handleChangeUserName = (e) => {
        setMyUserName(e.target.value);
    };

    const handleMainVideoStream = (stream) => {
        if (mainStreamManager !== stream) {
            setMainStreamManager(stream);
        }
    };

    const handleCaptureImage = (subIndex) => {
        const currentSubscriber = subscribers[subIndex];
        const videoTrack = currentSubscriber.stream
            .getMediaStream()
            .getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        imageCapture.grabFrame().then(processFrame);
    };

    const processFrame = (imgData) => {
        console.log(imgData);
        canvasRef.current.width = imgData.width;
        canvasRef.current.height = imgData.height;
        canvasRef.current.getContext('2d').drawImage(imgData, 0, 0);

        canvasRef.current.toBlob(sendToApi);
    };

    const sendToApi = (blob) => {
        axios
            .post(
                process.env.REACT_APP_API_SERVER +
                '/v1/videoKYC/requests/1/pan',
                blob,
                {
                    headers: {
                        Authorization:
                            'Basic ' +
                            btoa(
                                'OPENVIDUAPP:' +
                                process.env.REACT_APP_OPENVIDU_SERVER_SECRET
                            ),
                        'Content-Type': 'image/png',
                    },
                }
            )
            .then((response) => {
                console.log({ response });
                alert('Image uploaded');
            });
    };

    const joinSession = () => {
        // --- 1) Get an OpenVidu object ---
        const OV = new OpenVidu();
        OVRef.current = OV;

        // --- 2) Init a session ---
        updateSession(OV.initSession());
    };

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
     *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
     *   3) The token must be consumed in Session.connect() method
     */

    console.log(sessionRef.current);
    return (
        <div className="container">
            {sessionRef.current === undefined ? (
                <div id="join">
                    <div id="join-dialog" className="jumbotron vertical-center">
                        <h1> Join a video session </h1>
                        <form className="form-group">
                            <p>
                                <label>Participant: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="userName"
                                    value={myUserName}
                                    onChange={handleChangeUserName}
                                    required
                                />
                            </p>
                            <p>
                                <label> Session: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="sessionId"
                                    value={mySessionId}
                                    onChange={handleChangeSessionId}
                                    required
                                />
                            </p>
                            <p className="text-center">
                                <input
                                    className="btn btn-lg btn-success"
                                    name="commit"
                                    type="button"
                                    value="JOIN"
                                    onClick={joinSession}
                                />
                            </p>
                        </form>
                    </div>
                </div>
            ) : null}

            {sessionRef.current !== undefined ? (
                <div id="session">
                    <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="Leave session"
                        />
                    </div>

                    <Box display="flex" flexWrap="wrap">
                        {publisher !== undefined ? (
                            <Box p={1} css={{ maxWidth: 300 }}>
                                <div
                                    onClick={() =>
                                        handleMainVideoStream(publisher)
                                    }
                                >
                                    <UserVideoComponent
                                        streamManager={publisher}
                                    />
                                </div>
                            </Box>
                        ) : null}
                        {subscribers.map((sub, i) => (
                            <Box p={1} css={{ maxWidth: 300 }}>
                                <div
                                    key={i}
                                    onClick={() => handleMainVideoStream(sub)}
                                >
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleCaptureImage(i)}
                                >
                                    Capture image
                                </Button>
                            </Box>
                        ))}
                        <Box p={1} css={{ maxWidth: 300 }}>
                            <canvas ref={canvasRef}></canvas>
                        </Box>
                    </Box>
                </div>
            ) : null}
        </div>
    );
};

export default VideoKycPage;
