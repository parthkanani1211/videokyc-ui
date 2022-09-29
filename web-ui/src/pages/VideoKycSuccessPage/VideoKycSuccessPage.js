import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { getLogo } from '../../util/image';

export default function VideoLandingPage(props) {
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
                                <br />
                                <h4>Your KYC was completed Successfully. You can now close the browser</h4>                                 
                            </CardBody>
                        </Card>
                    </Col>  
                </Row>
            </Container>
        </div>
    );
}