import React, {useState} from "react";
import { Loadable } from '../../../common';
import { renderErrorMessage } from '../../../util/error';
import UserForm from "../UserForm/UserForm";
import {Card, CardBody, CardGroup, Col, Container, Row} from "reactstrap";
import {getLogo} from "../../../util/image";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export default function AdminSignUp(props) {
    const {
        usersRegisterPending,
        initialValues, userId, roles,title,
        actions: {
            registerAdmin
        }
    } = props;

    const [open, setOpen] = useState(false);
    
    const handleCallback = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const renderMessage = () => {
        const {
            usersRegisterError, usersRegisterErrorMessage,
        } = props;
        return renderErrorMessage(usersRegisterError, usersRegisterErrorMessage);
    }

    const handleUserFormSubmit = (payload) => {
        console.log("AdminSignUp handleUserFormSubmit");

        const user = {
            mobileNumber: payload.mobileNumber,
            firstName: payload.firstName,
            lastName: payload.lastName,
            emailAddress: payload.emailAddress,
            roles: [{id: 1, name: "Admin", description: "Administrator of system"}],
        }
        registerAdmin(user, handleCallback);
    }

    return (
        <Loadable loading={usersRegisterPending}>
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card>
                                    <CardBody>
                                        <div className="logo-container">
                                            <img
                                                width="250"
                                                height="70"
                                                alt="logo"
                                                src={getLogo()}
                                            />
                                        </div>
                                        <div style={{padding:'50px 0 50px 100px'}}>
                                            <UserForm
                                                title="Admin Registration"
                                                submitLabel="Register"
                                                pendingLabel="Registering"
                                                errorMessage={renderMessage()}
                                                disableRoles={true}
                                                disableMobileNumber={false}
                                                hideRoles={true}
                                                hideTopActionBar={true}
                                                cancelClicked={handleCallback}
                                                userFormSubmit={handleUserFormSubmit}
                                                {...props} />
                                        </div>
                                        
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Admin is registered successfully 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Redirecting to login page. Please login with your registered mobile number.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Loadable>
        
    );
}
