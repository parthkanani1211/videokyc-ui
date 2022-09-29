import moment from "moment";
import { OpenVidu } from "openvidu-browser";

import React, { Component } from "react";
import CardIcon from "assets/icons/CardIcon.png";
import DocumentIcon from "assets/icons/DocumentIcon.png";

import { withStyles } from "@material-ui/core/styles";

import { Box as CBox, Grid as CGrid, Flex as CFlex, Text } from "atoms";

import { dataURItoBlob } from "../../util/image";

import {
  CUSTOMER_DOCUMENT_STATUSES,
  LOGIN_TYPE,
  LOGIN_TYPE_LABEL,
  KYC_DOCUMENT_TYPES,
  KYC_DOCUMENT_LIST,
} from "../../store/constants/videoKyc";

import { ACTIONS } from "../../store/request/constants";

import { KycTypeList, VideoContainer } from "./components";
import { AadharOtpModal, LeaveConfirmModal, WaitingForAgentModal } from "molecules";
import MemoEndCallIcon from "assets/icons/EndCallIcon";

const styles = {
  headerDivider: {
    margin: "10px 0",
  },
  contentDivider: {
    margin: "0 10px",
  },
  listContainer: {
    width: "100%",
    padding: "10px",
  },
  listHeaderDivider: {
    margin: "5px 0",
  },
};

const CHAT_TYPE = "signal:chat";
let cameraNumber = 0;
const MESSAGE_INITIAL_STATE = {
  kycStatus: {},
  closeClientSession: false,
};

// viewport height shrinks on android when keyboard is open
let windowHeight = "";
class VideoKycPage extends Component {
  constructor(props) {
    super(props);

    const { participantName, sessionId, loginType } = props;
    this.state = {
      mySessionId: sessionId,
      myUserName: participantName,
      session: undefined,
      myInitialsession: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      loginType,
      sendMessages: MESSAGE_INITIAL_STATE,
      receivedMessages: MESSAGE_INITIAL_STATE,
      geoLocationAvailable: false,
      waitForAgent: loginType === LOGIN_TYPE.CUSTOMER,
      waitSessionTime: 300, // in seconds
      openOTPDialog: false,
      isVisibleKYCModal: false,
    };

    this.agentWaitTimer = null;
    this.agentSessionTimeout = null;
  }

  componentDidMount() {
    console.log("PROPS::", this.props);

    const { waitForAgent } = this.state;
    this.leaveSession(false);

    if (waitForAgent) {
      this.agentWaitTimer = setInterval(this.checkAgentActive, 10000);

      this.agentSessionTimeout = setInterval(this.updateSessionTime, 1000);

      return;
    }

    windowHeight = window.innerHeight;
    window.onbeforeunload = function () {
      return "Are you sure you want to reload?";
    };

    //this.joinSession();
    this.getOpenViduToken();
  }

  getOpenViduToken = () => {
    const {
      actions: { getToken },
      sessionId,
    } = this.props;

    getToken(sessionId, this.joinSession);
  };
  getOpenViduTokenFlipOption = () => {
    const {
      actions: { getToken },
      sessionId,
    } = this.props;

    getToken(this.state.mySessionId, this.joinSessionFlip);
  };
  componentWillUnmount() {
    this.leaveSession();
    window.onbeforeunload = undefined;
  }

  updateSessionTime = () => {
    const { waitSessionTime } = this.state;
    const seconds = waitSessionTime - 1;

    this.setState({
      waitSessionTime: seconds,
    });

    if (seconds === 0) {
      this.leaveSession(true, false, true);
    }
  };

  clearIntervals = () => {
    clearInterval(this.agentWaitTimer);
    clearInterval(this.agentSessionTimeout);
  };

  getSessionCallback = () => {
    const { serverKycSession } = this.props;

    if (serverKycSession) {
      this.setState({ waitForAgent: false }, () => {
        this.getOpenViduToken();
        this.clearIntervals();
      });
    }
  };

  checkAgentActive = () => {
    const { mySessionId } = this.state;
    const {
      actions: { getSession },
    } = this.props;

    getSession(mySessionId, this.getSessionCallback);
  };

  geoLocationSuccess = ({ coords }) => {
    const { longitude, latitude } = coords;
    const { actions, requestSingleData } = this.props;
    const { id: requestId } = requestSingleData;
    actions.getGeoLocation(requestId, longitude, latitude);
    if (this.state.loginType === LOGIN_TYPE.CUSTOMER) {
      this.setState({
        geoLocationAvailable: true,
      });
    }
  };

  geoLocationFailure = (error) => {
    this.setState({
      geoLocationAvailable: false,
    });
  };

  fetchGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoLocationSuccess, this.geoLocationFailure);
    }
  };

  fetchKycStatus = () => {
    const {
      requestSingleData,
      actions: { getKycStatus },
    } = this.props;
    const { id: requestId } = requestSingleData;
    getKycStatus(requestId);
  };

  onbeforeunload(event) {
    this.leaveSession();
  }

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

  updateRequestAction = (action) => {
    const { requestSingleData, requestActions, authAuthenticationId } = this.props;

    if (requestSingleData) {
      const { id: requestId } = requestSingleData;

      requestActions.update(requestId, {
        userId: authAuthenticationId,
        action,
      });
    }
  };

  joinSessionFlip = () => {
    const { loginType } = this.state;
    const { token } = this.props;
    try {
      let _myInitialsessionOld = this.state.myInitialsession;
      let _myInitialsession = this.OV.initSession();
      _myInitialsession.on("streamCreated", (event) => {
        var subscriber = _myInitialsession.subscribe(event.stream, undefined);
        var subscribers = this.state.subscribers;
        subscribers.push(subscriber);
        this.setState({
          subscribers: subscribers,
        });
        if (loginType === LOGIN_TYPE.CUSTOMER && this.props.geoLocation?.display_name) {
          this.handleGeoLocation(this.props.geoLocation?.display_name);
        }
      });

      // On every Stream destroyed...
      _myInitialsession.on("streamDestroyed", (event) => {
        // Remove the stream from 'subscribers' array
        this.deleteSubscriber(event.stream.streamManager);
      });

      _myInitialsession.on(CHAT_TYPE, ({ data }) => {
        const receivedData = JSON.parse(data);
        if (receivedData === "show modal") {
          if (loginType === LOGIN_TYPE.CUSTOMER) {
            this.setState({
              openOTPDialog: true,
            });
          }
        } else if (receivedData === "OTP_CONFIRMED") {
          if (loginType === LOGIN_TYPE.AGENT) {
            console.log("recived mssage from customer");
            this.handleOtpCofirmationFromCustomer();
          }
        } else if (receivedData === "OTP_INVALID") {
          if (loginType === LOGIN_TYPE.AGENT) {
            this.setState({
              otpInvalid: true,
            });
            window.setTimeout(() => {
              this.setState({
                otpInvalid: false,
              });
            }, 5000);
          }
        } else if (typeof receivedData === "object" && receivedData?.location) {
          this.setState({
            geoLocationAvailable: true,
            geolocation: receivedData?.location,
          });
        } else {
          this.setState({
            receivedMessages: receivedData,
          });

          if (receivedData.closeClientSession && loginType === LOGIN_TYPE.CUSTOMER) {
            this.leaveSession(true);
          }
        }
      });

      let devices = [];
      this.OV.getDevices().then((mediaDevices) => {
        devices = mediaDevices;
      })
        .catch(() => { })
        .finally(() => {
          var videoDevices = devices.filter(device => device.kind === 'videoinput');
          if (videoDevices && videoDevices.length > 1) {
            var newVideoDevice = videoDevices.filter((device) => device.kind === "videoinput");
            if (newVideoDevice.length > 0) {
              _myInitialsessionOld.unpublish(this.state.publisher).then(() => {
                let newPublisher = this.OV.initPublisher(undefined, {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: newVideoDevice?.[cameraNumber]?.deviceId || undefined, // The source of video. If undefined default webcam
                  publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  resolution: "1280x720", // The resolution of your video
                  frameRate: 10, // The frame rate of your video
                  insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                  mirror: false, // Whether to mirror your local video or not
                });
                _myInitialsession.connect(token, {
                  clientData: this.state.myUserName,
                  loginType: LOGIN_TYPE_LABEL[this.state.loginType],
                })
                  .then((_session) => {
                    _myInitialsession.publish(newPublisher).then(() => {
                      this.publisher = newPublisher;
                      this.setState({
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                        myInitialsession: _myInitialsession
                      });
                    });
                  })
              })
            }
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  joinSession = () => {
    const { loginType } = this.state;
    const { token } = this.props;
    //alert("____cameraInt - " + cameraNumber)
    this.updateRequestAction(ACTIONS.JOIN);
    this.fetchKycStatus();

    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // this.OV.getDevices().then((devices) => {
    //   // Getting only the video devices
    //   const videoDevices = devices.filter((device) => device.kind === "videoinput");

    //   if (videoDevices && videoDevices.length > 1) {
    //     this.setState({
    //       isDualCameraAvailable: true,
    //       selectedCamera: 1,
    //       deviceId: videoDevices?.[1]?.deviceId,
    //     });
    //   }
    // });

    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });

          if (loginType === LOGIN_TYPE.CUSTOMER && this.props.geoLocation?.display_name) {
            this.handleGeoLocation(this.props.geoLocation?.display_name);
          }
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        mySession.on(CHAT_TYPE, ({ data }) => {
          const receivedData = JSON.parse(data);

          if (receivedData === "show modal") {
            if (loginType === LOGIN_TYPE.CUSTOMER) {
              this.setState({
                openOTPDialog: true,
              });
            }
          } else if (receivedData === "OTP_CONFIRMED") {
            if (loginType === LOGIN_TYPE.AGENT) {
              console.log("recived mssage from customer");
              this.handleOtpCofirmationFromCustomer();
            }
          } else if (receivedData === "OTP_INVALID") {
            if (loginType === LOGIN_TYPE.AGENT) {
              this.setState({
                otpInvalid: true,
              });
              window.setTimeout(() => {
                this.setState({
                  otpInvalid: false,
                });
              }, 5000);
            }
          } else if (typeof receivedData === "object" && receivedData?.location) {
            this.setState({
              geoLocationAvailable: true,
              geolocation: receivedData?.location,
            });
          } else {
            this.setState({
              receivedMessages: receivedData,
            });

            if (receivedData.closeClientSession && loginType === LOGIN_TYPE.CUSTOMER) {
              this.leaveSession(true);
            }
          }
        });
        mySession
          .connect(token, {
            clientData: this.state.myUserName,
            loginType: LOGIN_TYPE_LABEL[this.state.loginType],
          })
          .then((session) => {
            console.log("my session connect", session);
            let devices = [];
            // --- 5) Get your own camera stream ---

            if (navigator.mediaDevices) {
              navigator.mediaDevices
                .enumerateDevices()
                .then((mediaDevices) => {
                  devices = mediaDevices;
                })
                .catch(() => { })
                .finally(() => {
                  const videoDevices = devices.filter((device) => device.kind === "videoinput");
                  let publisher = this.OV.initPublisher(undefined, {
                    audioSource: undefined, // The source of audio. If undefined default microphone
                    videoSource: videoDevices?.[cameraNumber]?.deviceId || undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: true, // Whether you want to start publishing with your video enabled or not
                    resolution: "1280x720", // The resolution of your video
                    frameRate: 10, // The frame rate of your video
                    insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                    mirror: false, // Whether to mirror your local video or not
                  });

                  // --- 6) Publish your stream ---
                  mySession.publish(publisher);
                  this.publisher = publisher;

                  // Set the main video in the page to display our webcam and store our Publisher
                  this.setState({
                    mainStreamManager: publisher,
                    publisher: publisher,
                    myInitialsession: mySession
                  });

                  if (loginType === LOGIN_TYPE.CUSTOMER) {
                    this.fetchGeoLocation();
                  }
                });
            } else {
              const videoDevices = devices.filter((device) => device.kind === "videoinput");
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices?.[cameraNumber]?.deviceId || undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "1280x720", // The resolution of your video
                frameRate: 10, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---
              mySession.publish(publisher);
              this.publisher = publisher;

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
                myInitialsession: mySession
              });

              if (loginType === LOGIN_TYPE.CUSTOMER) {
                this.fetchGeoLocation();
              }
            }
          })
          .catch((error) => {
            console.log("session connect errr" + error);
            console.log("There was an error connecting to the session:", error.code, error.message);
          });
      }
    );

  };

  clearSession = () => {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mainStreamManager: undefined,
      publisher: undefined,
      leaveConfirm: false,
    });
  };

  clearStore = () => {
    const { actions, requestActions } = this.props;

    requestActions.clear();
    requestActions.clearList();
    actions.clear();
  };

  leaveSession = (clearStore, cancelSession, timedOut) => {
    this.clearSession();

    this.clearIntervals();

    if (clearStore) {
      const { loginType, history, hideUserDetails } = this.props;

      // Left by customer
      let requestAction = ACTIONS.LEAVE;

      // Left by agent
      if (loginType === LOGIN_TYPE.AGENT) {
        if (!cancelSession) {
          requestAction = ACTIONS.END;
        } else {
          requestAction = ACTIONS.CANCEL;
        }
      }

      // Cancel by customer
      if (loginType === LOGIN_TYPE.CUSTOMER && cancelSession) {
        requestAction = ACTIONS.CANCEL;
      }

      // Timedout on customer
      if (timedOut) {
        requestAction = ACTIONS.TIMEOUT;
      }

      this.updateRequestAction(requestAction);
      this.clearStore();

      if (loginType === LOGIN_TYPE.AGENT) {
        history.push("/videoKyc/agent");
      } else {
        if (hideUserDetails) {
          history.push("/videoKyc/success");
        } else {
          history.push("/videoKyc/customer");
        }
      }
    }
  };

  getFileImageFileName = (kycType, frontBack = "Front") => {
    const { subscribers } = this.state;

    const currentSubscriber = subscribers[0];
    const subscriberData = JSON.parse(currentSubscriber.stream.connection.data);

    return `${subscriberData.clientData}_${kycType}_${moment().unix()}_${frontBack}.png`;
  };

  handleExtractCallback = (kycType) => {
    if (kycType === "FACE" || kycType === "SIGN") {
      const { videoKyc } = this.props;
      const { error, isVerified } = videoKyc[kycType];

      if (error) {
        this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.FAILED);

        return;
      }

      if (!isVerified) {
        this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.FAILED);

        return;
      }

      this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.SUCCESS);
    }
  };

  handleExtractClick = (kycType, frontCanvasRef, backCanvasRef) => {
    const { actions, requestSingleData } = this.props;
    const { id: requestId } = requestSingleData;

    let formData = new FormData();
    formData.append("kycType", kycType);

    const frontFile = dataURItoBlob(frontCanvasRef.current.toDataURL());
    const frontFileName = this.getFileImageFileName(kycType);
    formData.append("files", frontFile, frontFileName);

    if (backCanvasRef && backCanvasRef.current) {
      const backFile = dataURItoBlob(backCanvasRef.current.toDataURL());
      const backFileName = this.getFileImageFileName(kycType, "back");
      formData.append("files", backFile, backFileName);
    }

    actions.extract(requestId, formData, this.handleExtractCallback);
  };

  aadharCallback = () => {
    console.log("sending signal");
    const to = [];
    const mySession = this.state.session;
    mySession.signal({
      data: JSON.stringify("show modal"), // Any string (optional)
      to, // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: CHAT_TYPE, // The type of message (optional)
    });
  };

  handleVerify = (data, verifyType, to = []) => {
    const { actions, requestSingleData } = this.props;
    // let { loginType } = this.state;
    const { id: requestId } = requestSingleData;
    if (verifyType === "aadhar") {
      actions.verify(requestId, data, verifyType, this.aadharCallback);
    } else {
      actions.verify(requestId, data, verifyType);
    }
  };

  handleClose = (to = []) => {
    const mySession = this.state.session;
    mySession.signal({
      data: JSON.stringify("close modal"), // Any string (optional)
      to, // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: CHAT_TYPE, // The type of message (optional)
    });
  };

  handleGeoLocation = (location = "", to = []) => {
    const mySession = this.state.session;
    if (mySession && !this.state.geolocation) {
      try {
        mySession.signal({
          data: JSON.stringify({ location }), // Any string (optional)
          to, // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: CHAT_TYPE, // The type of message (optional)
        });
      } catch (e) { }
    }
  };

  handleLoginTypeChange = (e) => {
    this.setState({ loginType: e.target.value });
  };

  checkStatus = (kycType, prevProps) => {
    if (prevProps.videoKyc[kycType].pending && !this.props.videoKyc[kycType].pending) {
      const { videoKyc } = this.props;
      let wasVerificationSuccess = false;
      const { error, isVerified, isVerifiedResponse } = videoKyc[kycType];

      if (!(kycType === "AADHAR" && videoKyc[kycType]?.responseData?.otp_sent !== undefined)) {
        if (kycType === "PAN" || kycType === "AADHAR") {
          wasVerificationSuccess = isVerifiedResponse;
        } else {
          wasVerificationSuccess = isVerified;
        }

        if (error) {
          this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.FAILED);

          return;
        }

        if (!wasVerificationSuccess) {
          this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.FAILED);

          return;
        }

        this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.SUCCESS);
      } else {
        this.sendKycStatusMessage(kycType, CUSTOMER_DOCUMENT_STATUSES.IN_PROGRESS);
      }
    }

    return;
  };

  componentDidUpdate(prevProps, prevState) {
    KYC_DOCUMENT_LIST.forEach(({ type }) => {
      this.checkStatus(type, prevProps);
    });

    if (
      this.props.confirmOtpError &&
      this.props.confirmOtpError !== prevProps.confirmOtpError &&
      this.state.loginType === LOGIN_TYPE.CUSTOMER
    ) {
      this.handleWrongOTP();
    }

    if (
      this.state.loginType === LOGIN_TYPE.CUSTOMER &&
      this.props.geoLocation?.display_name &&
      !this.state.geoLocation
    ) {
      this.handleGeoLocation(this.props.geoLocation?.display_name);
    }
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
    const { history, requestSingleData } = this.props;
    const { id: requestId } = requestSingleData;

    this.setState(
      (prevState) => ({
        sendMessages: {
          ...prevState.sendMessages,
          closeClientSession: true,
        },
      }),
      () => {
        this.updateAndSendMessage();
        this.updateRequestAction(ACTIONS.COMPLETE);
        this.clearSession();
        this.clearStore();
        // if(hideUserDetails) {
        //     history.push('/videoKyc/success');
        // }
        history.push(`/audit-report/${requestId}`);
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

  handleDialogClose = () => {
    this.setState({
      ...this.setState,
      openOTPDialog: false,
    });
  };

  renderGeoLocation = () => {
    const { geoLocation } = this.props;

    if (geoLocation) {
      if (this.state.loginType === LOGIN_TYPE.CUSTOMER) {
        this.handleGeoLocation(geoLocation.display_name);
      }
      const { display_name } = geoLocation;
      return `${display_name}`;
    }
  };

  handleWrongOTP = (to = []) => {
    const mySession = this.state.session;
    if (mySession) {
      try {
        mySession.signal({
          data: JSON.stringify("OTP_INVALID"), // Any string (optional)
          to, // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: CHAT_TYPE, // The type of message (optional)
        });
      } catch (e) { }
    }
  };

  handleConfirmOtpCallback = () => {
    this.setState({
      ...this.state,
      openOTPDialog: false,
    });

    const mySession = this.state.session;
    const message = "OTP_CONFIRMED";
    mySession.signal({
      data: JSON.stringify(message), // Any string (optional)
      to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: CHAT_TYPE, // The type of message (optional)
    });
  };

  handleConfirmOTP = (value) => {
    const {
      actions: { confirmOtp },
      requestSingleData,
    } = this.props;
    const { id: requestId } = requestSingleData;
    confirmOtp(requestId, { otpValue: value.otp }, this.handleConfirmOtpCallback);
  };

  // handleOtpChange = (event) => {
  //   this.setState({
  //     ...this.state,
  //     otpValue: event.target.value,
  //   });
  // };

  handleOtpCofirmationFromCustomer = () => {
    const {
      actions: { aadharVerify },
      requestSingleData,
    } = this.props;
    const { id: requestId } = requestSingleData;
    aadharVerify(requestId);
  };

  modalVisibleHandler = () => {
    this.setState({
      isVisibleKYCModal: true,
    });
  };
  closeModalVisibleHandler = () => {
    this.setState({
      isVisibleKYCModal: false,
    });
  };

  switchCameraHandler = () => {
    if (cameraNumber == 0) {
      cameraNumber = 1;
    }
    else {
      cameraNumber = 0;
    }
    this.getOpenViduTokenFlipOption();

    //this.clearIntervals();

    // let deviceIds = [];
    // navigator.mediaDevices
    //   .enumerateDevices()
    //   .then((devices) => {
    //     // Getting only the video devices
    //     const videoDevices = devices.filter((device) => device.kind === "videoinput");

    //     if (videoDevices && videoDevices.length > 1) {
    //       deviceIds = videoDevices?.map(({ deviceId }) => deviceId);
    //       this.setState({
    //         isDualCameraAvailable: true,
    //         deviceId: videoDevices?.[1]?.deviceId,
    //         deviceIds,
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("failure ==========>", e);
    //   });

    // this.isFrontCamera = false;

    // this.OV.getDevices()
    //   .then((devices) => {
    //     // Getting only the video devices
    //     const videoDevices = devices.filter((device) => device.kind === "videoinput");
    //     alert("Alert : "+videoDevices.length);
    //     if (videoDevices && videoDevices.length > 1) {
    //       // Creating a new publisher with specific videoSource
    //       // In mobile devices the default and first camera is the front one
    //       const newPublisher = this.OV.initPublisher("html-element-id", {
    //         videoSource: videoDevices?.filter(
    //           ({ deviceId }) => deviceId !== this.publisher?.properties?.videoSource
    //         )?.[0]?.deviceId,
    //         // videoSource: videoDevices?.[1]?.deviceId,
    //         publishAudio: true,
    //         publishVideo: true,
    //         audioSource: undefined, // The source of audio. If undefined default microphone
    //         resolution: "1280x720", // The resolution of your video
    //         frameRate: 10, // The frame rate of your video
    //         insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
    //         mirror: false, // Whether to mirror your local video or not
    //       });

    //       this.deleteSubscriber(this.publisher.stream);
    //       var subscribers = this.state.subscribers;
    //       let index = subscribers.indexOf(this.publisher.stream, 0);
    //       if (index > -1) {
    //         subscribers.splice(index, 1);
    //       }
    //       // Unpublishing the old publisher
    //       this.state.session
    //         .unpublish(this.publisher)
    //         .then(() => {
    //           console.log("Old publisher unpublished!");

    //           // Assigning the new publisher to our global variable 'publisher'
    //           this.publisher = newPublisher;
    //           var subscriber = this.state.session.subscribe(newPublisher.stream, undefined);
    //           subscribers.push(subscriber);

    //           // Update the state with the new subscribers
    //           this.setState({
    //             subscribers: subscribers,
    //           });

    //           // Publishing the new publisher
    //           this.state.session
    //             .publish(this.publisher)
    //             .then(() => {
    //               console.log("New publisher published!");
    //             })
    //             .catch((e) => {
    //               console.log("publish error " + e);
    //             });
    //         })
    //         .catch((e) => console.log("unpublish error " + JSON.stringify(e, null, 2)));

    //       // this.deleteSubscriber(this.publisher.stream);
    //       // var subscriber = this.state.session.subscribe(newPublisher.stream, undefined);
    //       // var subscribers = this.state.subscribers;
    //       // subscribers.push(subscriber);

    //       // Update the state with the new subscribers
    //       // this.setState({
    //       //   subscribers: subscribers,
    //       // });
    //       // this.publisher = newPublisher;
    //     }
    //   })
    //   .catch((e) => console.log("device Swith error => " + e));
  };

  render() {
    const {
      classes,
      videoKyc,
      currentState,
      currentStatusPending,
      kycDbStatus,
      confirmOtpError,
      confirmOtpPending,
    } = this.props;
    const {
      receivedMessages,
      loginType,
      publisher,
      subscribers,
      geoLocationAvailable,
      waitForAgent,
      waitSessionTime,
    } = this.state;
    let { kycStatus } = receivedMessages;

    console.log(videoKyc);

    // const dbStatus = currentState && currentState.map((status) => {
    //     return { [status]: true }
    // });

    if (kycDbStatus) {
      kycStatus = {
        ...kycStatus,
        ...kycDbStatus,
      };
    }

    if (waitForAgent) {
      return (
        // <Grid
        //     container
        //     spacing={0}
        //     direction="column"
        //     alignItems="center"
        //     justify="center"
        //     style={{ minHeight: '100%' }}
        // >
        //     <Grid item xs={12}>
        //         <Paper>
        //             <CBox padding="20px">
        //                 <Typography
        //                     variant="h4"
        //                     component="p"
        //                     gutterBottom
        //                     color="primary"
        //                 >
        //                     Waiting for agent to connect...
        //                     <CircularProgress size={30} />
        //                 </Typography>
        //                 <Typography
        //                     variant="h5"
        //                     component="p"
        //                     gutterBottom
        //                 >
        //                     Session will expire after:{'  '}
        //                     <Typography variant="h5" component="span">
        //                         {moment
        //                             .utc(waitSessionTime * 1000)
        //                             .format('mm:ss')}
        //                     </Typography>
        //                 </Typography>
        //                 <CBox padding="10px 0">
        //                     <Divider />
        //                 </CBox>
        //                 <CBox display="flex" justifyContent="center">
        //                     <CButton
        //                         onClick={() =>
        //                             this.leaveSession(true, true)
        //                         }
        //                         color="warning"
        //                     >
        //                         Cancel
        //                     </CButton>
        //                 </CBox>
        //             </Box>
        //         </Paper>
        //     </Grid>
        // </Grid>

        <WaitingForAgentModal
          isOpen
          onClick={() => this.leaveSession(true, true)}
          time={moment.utc(waitSessionTime * 1000).format("mm:ss")}
        />
      );
    }

    return (
      <CBox display="flex" flexDirection="column" height="100%">
        {this.state.session !== undefined ? (
          <CBox display="flex" flexDirection="column" height="100%">
            {loginType === LOGIN_TYPE.CUSTOMER && (
              // <Dialog
              //   open={this.state.openOTPDialog}
              //   onClose={this.handleDialogClose}
              //   aria-labelledby="form-dialog-title"
              // >
              //   <DialogTitle id="form-dialog-title">Aadhaar OTP</DialogTitle>
              //   <DialogContent>
              //     <DialogContentText>
              //       {confirmOtpError && (
              //         <div role="alert" className="alert alert-danger">
              //           <div className="alert-text">{confirmOtpError}</div>
              //         </div>
              //       )}
              //       To verify the Aadhaar data please enter the OTP
              //     </DialogContentText>
              //     <TextField
              //       autoFocus
              //       margin="dense"
              //       id="otp"
              //       label="OTP"
              //       type="number"
              //       onChange={(event) => {
              //         this.handleOtpChange(event);
              //       }}
              //     />
              //   </DialogContent>
              //   <DialogActions>
              //     <Button onClick={this.handleDialogClose} color="secondary">
              //       Cancel
              //     </Button>
              //     <Button
              //       disabled={confirmOtpPending}
              //       onClick={this.handleConfirmOTP}
              //       color="primary"
              //     >
              //       {confirmOtpPending && <CircularProgress size={15} />} &nbsp;Submit
              //     </Button>
              //   </DialogActions>
              // </Dialog>
              <AadharOtpModal
                error={confirmOtpError}
                loading={confirmOtpPending}
                onClose={this.handleDialogClose}
                onSubmit={this.handleConfirmOTP}
                isOpen={this.state.openOTPDialog}
              />
            )}

            {/* <CBox display="flex" justifyContent="flex-end" m={0} p={0}>
             {loginType === LOGIN_TYPE.CUSTOMER && (
                <CBox p={1}>
                  {geoLocationAvailable ? (
                    <div className={classes.geoLocation}>
                      <i className="fa fa-map-marker" />
                      {this.renderGeoLocation()}
                    </div>
                  ) : (
                    <div>No geolocation available. Please enable location</div>
                  )}
                </CBox>
              )}
              <CBox p={1} bgcolor="grey.300">
                <Button color="secondary" variant="contained" onClick={this.leaveSession}>
                  <Icon fontSize="small" iconName="powerSettingsNew" />
                </Button>
              </CBox>
            </Box> */}
            <CBox display="flex" height="100%">
              {/* <ReactResizeDetector
                handleWidth
                handleHeight
                render={({ height }) => ( */}
              <CGrid
                // height={height}
                my="32px"
                width="100%"
                overflow="hidden"
                gridTemplateColumns={{ xs: "1fr", md: "1.5fr 1fr" }}
                borderRadius={{ xs: "10px", md: "10px 10px 10px 0" }}
                height={{ xs: `calc(${windowHeight}px - 120px)`, md: "calc(100vh - 175px)" }}
              >
                <CBox>
                  <VideoContainer
                    kycStatus={kycStatus}
                    loginType={loginType}
                    publisher={publisher}
                    subscriber={subscribers[0]}
                    switchCameraHandler={this.switchCameraHandler}
                    isOtpModalOpen={this.state.openOTPDialog}
                  />
                  <CFlex background="black" p={{ xs: "15px", md: "22px 17px" }} alignItems="center">
                    <CBox
                      background="red"
                      borderRadius="4px"
                      width="100px"
                      textAlign="center"
                      py={{ xs: "2px", md: "5px" }}
                      cursor="pointer"
                      onClick={
                        this.state.loginType === LOGIN_TYPE.AGENT
                          ? () => {
                            this.setState({ leaveConfirm: true });
                            console.log("asdfasd");
                          }
                          : () => this.leaveSession(true)
                      }
                    >
                      <MemoEndCallIcon fill="white" width="30px" height="30px" />
                    </CBox>
                    <CFlex alignItems="center" color="white" fontSize={{ xs: "12px", md: "14px" }}>
                      {geoLocationAvailable ? (
                        <CFlex
                          className={classes.geoLocation}
                          ml={{ xs: "20px", md: "30px" }}
                          alignItems="center"
                        >
                          <i
                            className="fa fa-map-marker"
                            style={{ fontSize: "20px", marginRight: "10px" }}
                          />
                          {this.state.loginType === LOGIN_TYPE.AGENT
                            ? this.state.geolocation
                            : this.renderGeoLocation()}
                        </CFlex>
                      ) : (
                        <CBox ml="10px">
                          {loginType === LOGIN_TYPE.CUSTOMER
                            ? "No geolocation available. Please enable location."
                            : "Waiting for Customer portal to fetch location."}
                        </CBox>
                      )}
                    </CFlex>
                  </CFlex>
                </CBox>

                {loginType === LOGIN_TYPE.AGENT ? (
                  <CBox
                    flex={1}
                    display="flex"
                    overflow="auto"
                    background="white"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="flex-start"
                  >
                    <KycTypeList
                      videoKycData={videoKyc}
                      sendMessage={this.sendKycStatusMessage}
                      subscribers={this.state.subscribers}
                      onExtractClick={this.handleExtractClick}
                      onCompleteClick={this.handleCompleteClick}
                      currentStep={currentState}
                      onVerifyClick={this.handleVerify}
                      loading={currentStatusPending}
                    />
                    {this.state.otpInvalid && (
                      <CBox
                        left="50%"
                        top="20px"
                        p="5px 20px"
                        color="black"
                        zIndex="1030"
                        position="fixed"
                        borderRadius="4px"
                        bg="rgba(255,30,30,0.3)"
                        transform="translateX(-50%)"
                      >
                        Invalid OTP entered by Customer
                      </CBox>
                    )}
                  </CBox>
                ) : (
                  <CBox
                    flex={1}
                    display="flex"
                    overflow="auto"
                    background="white"
                    alignItems="center"
                    justifyContent="flex-start"
                    flexDirection="column"
                  >
                    <CGrid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <CGrid item xs={12}>
                        <CBox padding="20px">
                          <Text
                            as="h5"
                            color="#021355"
                            fontWeight="600"
                            fontSize={{ xs: "20px", md: "24px" }}
                          >
                            Video - KYC process
                          </Text>
                          <CBox margin="20px 0">
                            <Text fontSize={{ xs: "14px", md: "18px" }} color="#111111">
                              Please follow the below instructions:
                            </Text>
                          </CBox>
                          {/* <List dense>
                                <List.Item>
                                  <List.Item.Text primary="Please do not move away from this browser or open another app till you get connected to our Banking Agent." />
                                </List.Item>
                                <List.Item>
                                  <List.Item.Text primary="Once you are connected to our Banking Agent, you will receive a Video Call Invitation." />
                                </List.Item>
                                <List.Item>
                                  <List.Item.Text primary="Please keep original documents along with you to complete process on time." />
                                </List.Item>
                                <List dense>
                                  <List.Item>
                                    <List.Item.Icon>
                                      <Icon iconName="chevronRight" />
                                    </List.Item.Icon>
                                    <List.Item.Text primary="Pan card" />
                                  </List.Item>
                                  <List.Item>
                                    <List.Item.Icon>
                                      <Icon iconName="chevronRight" />
                                    </List.Item.Icon>
                                    <List.Item.Text primary="ADHAR card" />
                                  </List.Item>
                                  <List.Item>
                                    <List.Item.Icon>
                                      <Icon iconName="chevronRight" />
                                    </List.Item.Icon>
                                    <List.Item.Text primary="Blank paper and pen" />
                                  </List.Item>
                                </List>
                              </List> */}
                          <CGrid
                            gridGap={{ xs: "10px", md: "30px" }}
                            fontSize={{ xs: "12px", md: "14px" }}
                          >
                            <Text>
                              Please do not move away from this browser or open another app till you
                              get connected to our Banking Agent.
                            </Text>
                            <Text>
                              Once you are connected to our Banking Agent, you will receive a Video
                              Call Invitation.
                            </Text>
                            <Text>
                              Please keep original documents along with you to complete process on
                              time.
                            </Text>
                          </CGrid>
                          <CFlex
                            flexWrap="wrap"
                            justifyContent="flex-start"
                            mt={{ xs: "20px", md: "43px" }}
                            fontSize={{ xs: "12px", md: "14px" }}
                          >
                            <CFlex
                              border="1px solid"
                              borderColor="#4BC177"
                              borderRadius="4px"
                              bg="#B9F1CF"
                              alignItems="center"
                              width={{ xs: "140px", md: "155px" }}
                              height="55px"
                              padding="7px 8px"
                              mr="12px"
                              mt="12px"
                            >
                              <CFlex
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="40px"
                                width={{ xs: "28px", md: "38px" }}
                                height={{ xs: "28px", md: "38px" }}
                                bg="white"
                                mr="10px"
                              >
                                <img src={CardIcon} alt="icon" width="16px" height="16px" />
                              </CFlex>
                              Pan Card
                            </CFlex>
                            <CFlex
                              border="1px solid"
                              borderColor="#97B8FB"
                              borderRadius="4px"
                              bg="#D7E4FF"
                              alignItems="center"
                              width={{ xs: "140px", md: "155px" }}
                              height="55px"
                              padding="7px 8px"
                              mr="12px"
                              mt="12px"
                            >
                              <CFlex
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="40px"
                                width={{ xs: "28px", md: "38px" }}
                                height={{ xs: "28px", md: "38px" }}
                                bg="white"
                                mr="10px"
                              >
                                <img src={CardIcon} alt="icon" width="16px" height="16px" />
                              </CFlex>
                              Aadhaar Card
                            </CFlex>
                            <CFlex
                              mt="12px"
                              bg="#FFE3BA"
                              height="55px"
                              padding="7px 8px"
                              border="1px solid"
                              borderRadius="4px"
                              alignItems="center"
                              borderColor="#F6C479"
                              width={{ xs: "140px", md: "160px" }}
                            >
                              <CFlex
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="40px"
                                minWidth={{ xs: "28px", md: "38px" }}
                                height={{ xs: "28px", md: "38px" }}
                                bg="white"
                                mr="10px"
                              >
                                <img src={DocumentIcon} alt="icon" width="16px" height="16px" />
                              </CFlex>
                              Blank paper and pen
                            </CFlex>
                          </CFlex>
                        </CBox>
                      </CGrid>
                    </CGrid>
                  </CBox>
                )}
              </CGrid>
              {/* )}
              /> */}
            </CBox>
          </CBox>
        ) : null}
        {this.state.leaveConfirm && (
          <LeaveConfirmModal
            isOpen
            onClose={() => this.setState({ leaveConfirm: false })}
            onSubmit={({ reason }) => this.leaveSession(true, Boolean(reason))}
          />
        )}
      </CBox>
    );
  }
}

export default withStyles(styles)(VideoKycPage);

// handleChangeSessionId = (e) => {
//     this.setState({
//         mySessionId: e.target.value,
//     });
// };

// handleChangeUserName = (e) => {
//     this.setState({
//         myUserName: e.target.value,
//     });
// };

// handleMainVideoStream = (stream) => {
//     if (this.state.mainStreamManager !== stream) {
//         this.setState({
//             mainStreamManager: stream,
//         });
//     }
// };

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

// getToken() {
//     return this.createSession(this.state.mySessionId).then((sessionId) =>
//         this.createToken(sessionId)
//     );
// }

// createSession(sessionId) {
//     return new Promise((resolve, reject) => {
//         var data = JSON.stringify({
//             customSessionId: sessionId,
//             recordingMode: 'ALWAYS',
//         });
//         axios
//             .post(
//                 process.env.REACT_APP_OPENVIDU_SERVER_URL + '/api/sessions',
//                 data,
//                 {
//                     headers: {
//                         Authorization:
//                             'Basic ' +
//                             btoa(
//                                 'OPENVIDUAPP:' +
//                                 process.env
//                                     .REACT_APP_OPENVIDU_SERVER_SECRET
//                             ),
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )
//             .then((response) => {
//                 console.log('CREATE SESION', response);
//                 resolve(response.data.id);
//             })
//             .catch((response) => {
//                 var error = Object.assign({}, response);
//                 if (error.response.status === 409) {
//                     resolve(sessionId);
//                 } else {
//                     console.log(error);
//                     console.warn(
//                         'No connection to OpenVidu Server. This may be a certificate error at ' +
//                         process.env.REACT_APP_OPENVIDU_SERVER_URL
//                     );
//                     if (
//                         window.confirm(
//                             'No connection to OpenVidu Server. This may be a certificate error at "' +
//                             process.env.REACT_APP_OPENVIDU_SERVER_URL +
//                             '"\n\nClick OK to navigate and accept it. ' +
//                             'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
//                             process.env.REACT_APP_OPENVIDU_SERVER_URL +
//                             '"'
//                         )
//                     ) {
//                         window.location.assign(
//                             process.env.REACT_APP_OPENVIDU_SERVER_URL +
//                             '/accept-certificate'
//                         );
//                     }
//                 }
//             });
//     });
// }

// createToken(sessionId) {
//     return new Promise((resolve, reject) => {
//         var data = JSON.stringify({ session: sessionId });
//         axios
//             .post(
//                 process.env.REACT_APP_OPENVIDU_SERVER_URL + '/api/tokens',
//                 data,
//                 {
//                     headers: {
//                         Authorization:
//                             'Basic ' +
//                             btoa(
//                                 'OPENVIDUAPP:' +
//                                 process.env
//                                     .REACT_APP_OPENVIDU_SERVER_SECRET
//                             ),
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )
//             .then((response) => {
//                 resolve(response.data.token);
//             })
//             .catch((error) => reject(error));
//     });
// }
