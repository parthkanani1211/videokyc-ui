import React from "react";
import { Formik } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

import { getLogo } from "../../util/image";

import "./LoginPage.scss";
import Loadable from "../../common/loadable/Loadable";

export default function LoginPage(props) {
  const {
    loginPending,
    loginError,
    loginErrorMessage,
    actions: { sessionLogin },
  } = props;

  return (
    <Loadable loading={loginPending}>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div className="logo-container">
                      <img width="250" height="70" alt="logo" src={getLogo()} />
                    </div>
                    <Formik
                      initialValues={{
                        username: "",
                        password: "",
                      }}
                      validate={(values) => {
                        const errors = {};

                        if (!values.username) {
                          // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                          errors.username = "Username is required";
                        }

                        if (!values.password) {
                          errors.password = "Password is required";
                        }

                        return errors;
                      }}
                      onSubmit={(values) => {
                        sessionLogin(values.username, values.password);
                      }}
                    >
                      {({
                        values,
                        status,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form
                          noValidate={true}
                          autoComplete="off"
                          className="kt-form"
                          onSubmit={handleSubmit}
                        >
                          <p className="text-muted">Sign In to your account</p>
                          {loginError && (
                            <div role="alert" className="alert alert-danger">
                              <div className="alert-text">{loginErrorMessage}</div>
                            </div>
                          )}
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name="username"
                              type="text"
                              placeholder="Username"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.username}
                              invalid={Boolean(touched.username && errors.username)}
                            />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              placeholder="Password"
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              invalid={Boolean(touched.password && errors.password)}
                            />
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button type="submit" color="primary" className="px-4">
                                Login
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </Loadable>
  );
}
