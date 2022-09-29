import { CircularProgress } from '@material-ui/core';
import React, {useEffect} from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { getLogo } from '../../util/image';

export default function VideoLandingPage(props) {
    const {mobileNumber, history, actions: {
        sessionAutoLogin,
    }} = props;

    function loginCallback() {
        history.push('/videoKyc/customer/content');
    }

    useEffect(() => {
        if(mobileNumber) {
            sessionAutoLogin(mobileNumber, loginCallback);
        }
    }, [mobileNumber, sessionAutoLogin]);

    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <div className="logo-container">
                                    <img
                                        width="250"
                                        height="70"
                                        alt="logo"
                                        src={getLogo()}
                                    />
                                </div>
                                <Row className="p-4">
                                    <Col xs="10">
                                    <h1>Logging you in...</h1> 
                                    </Col>
                                    <Col xs="2">
                                        <CircularProgress size={40} />
                                    </Col>
                                </Row>
                                
                            </CardBody>
                        </Card>
                    </Col>  
                </Row>
            </Container>
        </div>
    );
}