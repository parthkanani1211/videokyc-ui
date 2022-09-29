import moment from 'moment';

import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { dataURItoBlob } from '../../util/image';

import {
    CUSTOMER_DOCUMENT_STATUSES,
    LOGIN_TYPE,
    LOGIN_TYPE_LABEL,
    KYC_DOCUMENT_TYPES,
    KYC_DOCUMENT_LIST,
} from '../../store/constants/videoKyc';

import { KycTypeList, VideoContainer } from './components';

const styles = {
    headerDivider: {
        margin: '10px 0',
    },
    contentDivider: {
        margin: '0 10px',
    },
    listContainer: {
        width: '100%',
        padding: '10px',
    },
    listHeaderDivider: {
        margin: '5px 0',
    },
};

const CHAT_TYPE = 'signal:chat';

const MESSAGE_INITIAL_STATE = {
    kycStatus: {},
    closeClientSession: false,
};

class VideoKycPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
            loginType: LOGIN_TYPE.AGENT,
            sendMessages: MESSAGE_INITIAL_STATE,
            receivedMessages: MESSAGE_INITIAL_STATE,
            geoLocationAvailable: false,
        };
    }

    geoLocationSuccess = ({ coords }) => {
        const { longitude, latitude } = coords;
        const { actions } = this.props;
        actions.getGeoLocation(longitude, latitude);
        this.setState({
            geoLocationAvailable: true,
        });
    };

    geoLocationFailure = (error) => {
        this.setState({
            geoLocationAvailable: false,
        });
    };

    fetchGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.geoLocationSuccess,
                this.geoLocationFailure
            );
        }
    };

    componentDidMount() {
        this.leaveSession();
        this.joinSession();
    }

    componentWillUnmount() {
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId = (e) => {
        this.setState({
            mySessionId: e.target.value,
        });
    };

    handleChangeUserName = (e) => {
        this.setState({
            myUserName: e.target.value,
        });
    };

    handleMainVideoStream = (stream) => {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream,
            });
        }
    };

    deleteSubscriber = (streamManager) => {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    };

    joinSession = () => {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        this.fetchGeoLocation();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(
                        event.stream,
                        undefined
                    );
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {
                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                mySession.on(CHAT_TYPE, ({ data }) => {
                    const receivedData = JSON.parse(data);

                    this.setState({
                        receivedMessages: receivedData,
                    });

                    if (receivedData.closeClientSession) {
                        this.leaveSession();
                    }
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(token, {
                            clientData: this.state.myUserName,
                            loginType: LOGIN_TYPE_LABEL[this.state.loginType],
                        })
                        .then(() => {
                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '   1280x720', // The resolution of your video
                                frameRate: 10, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---
                            mySession.publish(publisher);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log(
                                'There was an error connecting to the session:',
                                error.code,
                                error.message
                            );
                        });
                });
            }
        );
    };

    leaveSession = () => {
        const { actions } = this.props;

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined,
        });
        actions.clear();
    };

    getFileImageFileName = (kycType, frontBack = 'Front') => {
        const { subscribers } = this.state;

        const currentSubscriber = subscribers[0];
        const subscriberData = JSON.parse(
            currentSubscriber.stream.connection.data
        );

        return `${
            subscriberData.clientData
            }_${kycType}_${moment().unix()}_${frontBack}.png`;
    };

    handleVerifyClick = (kycType, frontCanvasRef, backCanvasRef) => {
        const { actions } = this.props;

        let formData = new FormData();
        formData.append('kycType', kycType);

        const frontFile = dataURItoBlob(frontCanvasRef.current.toDataURL());
        const frontFileName = this.getFileImageFileName(kycType);
        formData.append('files', frontFile, frontFileName);

        if (backCanvasRef && backCanvasRef.current) {
            const backFile = dataURItoBlob(backCanvasRef.current.toDataURL());
            const backFileName = this.getFileImageFileName(kycType, 'back');
            formData.append('files', backFile, backFileName);
        }

        actions.verify(formData);
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

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) =>
            this.createToken(sessionId)
        );
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(
                    process.env.REACT_APP_OPENVIDU_SERVER_URL + '/api/sessions',
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
                                process.env.REACT_APP_OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                process.env.REACT_APP_OPENVIDU_SERVER_URL +
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
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ session: sessionId });
            axios
                .post(
                    process.env.REACT_APP_OPENVIDU_SERVER_URL + '/api/tokens',
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
    }

    handleLoginTypeChange = (e) => {
        this.setState({ loginType: e.target.value });
    };

    checkStatus = (kycType, prevProps) => {
        if (
            prevProps.videoKyc[kycType].pending &&
            !this.props.videoKyc[kycType].pending
        ) {
            const { videoKyc } = this.props;
            const { error, isVerified } = videoKyc[kycType];

            if (error) {
                this.sendKycStatusMessage(
                    kycType,
                    CUSTOMER_DOCUMENT_STATUSES.FAILED
                );

                return;
            }

            if (!isVerified) {
                this.sendKycStatusMessage(
                    kycType,
                    CUSTOMER_DOCUMENT_STATUSES.FAILED
                );

                return;
            }

            this.sendKycStatusMessage(
                kycType,
                CUSTOMER_DOCUMENT_STATUSES.SUCCESS
            );
        }

        return;
    };

    componentDidUpdate(prevProps, prevState) {
        KYC_DOCUMENT_LIST.forEach(({ type }) => {
            this.checkStatus(type, prevProps);
        });
    }

    sendKycStatusMessage = (kycType = KYC_DOCUMENT_TYPES.PAN, status) => {
        this.setState(
            (prevState) => ({
                sendMessages: {
                    ...prevState.sendMessages,
                    kycStatus: {
                        ...prevState.sendMessages.kycStatus,
                        [kycType]: status,
                    },
                },
            }),
            () => this.updateAndSendMessage()
        );
    };

    handleCompleteClick = () => {
        const { history } = this.props;

        this.setState(
            (prevState) => ({
                sendMessages: {
                    ...prevState.sendMessages,
                    closeClientSession: true,
                },
            }),
            () => {
                this.updateAndSendMessage();
                history.push(`/audit-report/1`);
            }
        );
    };

    updateAndSendMessage = (to = []) => {
        const mySession = this.state.session;

        mySession.signal({
            data: JSON.stringify(this.state.sendMessages), // Any string (optional)
            to, // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: CHAT_TYPE, // The type of message (optional)
        });
    };

    renderGeoLocation = () => {
        const { geoLocation } = this.props;

        if (geoLocation) {
            const { address } = geoLocation;
            return ` ${address.road}, ${address.town}, ${address.state}, ${address.country}`;
        }
    };

    render() {
        const { classes, videoKyc } = this.props;
        const {
            receivedMessages,
            loginType,
            mySessionId,
            myUserName,
            publisher,
            subscribers,
            geoLocationAvailable,
        } = this.state;
        const { kycStatus } = receivedMessages;

        return (
            <Box display="flex" flexDirection="column" height="100%">
                {this.state.session === undefined ? (
                    <div id="join">
                        <div
                            id="join-dialog"
                            className="jumbotron vertical-center"
                        >
                            <h1> Join a video session </h1>
                            <form
                                className="form-group"
                                onSubmit={this.joinSession}
                            >
                                <p>
                                    <label> Login type: </label>
                                    <RadioGroup
                                        aria-label="loginType"
                                        name="loginType"
                                        value={loginType}
                                        onChange={this.handleLoginTypeChange}
                                        row
                                    >
                                        <FormControlLabel
                                            value={LOGIN_TYPE.AGENT}
                                            control={<Radio />}
                                            label={
                                                LOGIN_TYPE_LABEL[
                                                LOGIN_TYPE.AGENT
                                                ]
                                            }
                                        />
                                        <FormControlLabel
                                            value={LOGIN_TYPE.CUSTOMER}
                                            control={<Radio />}
                                            label={
                                                LOGIN_TYPE_LABEL[
                                                LOGIN_TYPE.CUSTOMER
                                                ]
                                            }
                                        />
                                    </RadioGroup>
                                </p>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
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
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <input
                                        className="btn btn-lg btn-success"
                                        name="commit"
                                        type="submit"
                                        value="JOIN"
                                    />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <Box display="flex" flexDirection="column" height="100%">
                        <Box display="flex" flexDirection="row-reverse">
                            {geoLocationAvailable ? (
                                <div className={classes.geoLocation}>
                                    <i className="fa fa-map-marker" />
                                    {this.renderGeoLocation()}
                                </div>
                            ) : (
                                    <div>
                                        No geolocation available. Please enable
                                        location
                                    </div>
                                )}
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <h1 id="session-title">{mySessionId}</h1>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.leaveSession}
                                >
                                    Leave session
                                </Button>
                            </Box>
                        </Box>
                        <Divider
                            variant="fullWidth"
                            className={classes.headerDivider}
                        />
                        <Box display="flex" height="100%">
                            <ReactResizeDetector
                                handleWidth
                                handleHeight
                                render={({ height }) => (
                                    <Box
                                        flex={1}
                                        display="flex"
                                        height={height}
                                        overflow="hidden"
                                    >
                                        <VideoContainer
                                            kycStatus={kycStatus}
                                            height={height}
                                            loginType={loginType}
                                            subscriber={subscribers[0]}
                                            publisher={publisher}
                                        />

                                        {loginType === LOGIN_TYPE.AGENT ? (
                                            <React.Fragment>
                                                <Box display="flex">
                                                    <Divider
                                                        variant="fullWidth"
                                                        className={
                                                            classes.contentDivider
                                                        }
                                                        orientation="vertical"
                                                    />
                                                </Box>
                                                <Box
                                                    display="flex"
                                                    flex={1}
                                                    alignItems="center"
                                                    justifyContent="flex-start"
                                                    padding="10px 0"
                                                    flexDirection="column"
                                                >
                                                    <KycTypeList
                                                        videoKycData={videoKyc}
                                                        sendMessage={
                                                            this
                                                                .sendKycStatusMessage
                                                        }
                                                        subscribers={
                                                            this.state
                                                                .subscribers
                                                        }
                                                        onVerifyClick={
                                                            this
                                                                .handleVerifyClick
                                                        }
                                                        onCompleteClick={
                                                            this
                                                                .handleCompleteClick
                                                        }
                                                    />
                                                </Box>
                                            </React.Fragment>
                                        ) : null}
                                    </Box>
                                )}
                            />
                        </Box>
                    </Box>
                ) : null}
            </Box>
        );
    }
}

export default withStyles(styles)(VideoKycPage);
