import React from "react";
import { Formik } from "formik";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Box, Button, Grid, Text } from "atoms";
import { FormInput, FormSelect } from "molecules";
import { LOGIN_TYPE } from "store/constants/videoKyc";
import { EMAIL_REGEX } from "store/constants/pages";

const GridStyle = styled(Grid)`
  .user-form-input-style {
    height: 55px;
  }
  .role-select-input {
    input {
      height: 33px;
    }
  }
  @media only screen and (max-width: 600px) {
    .user-form-input-style {
      height: 45px !important;
    }
    .role-select-input {
      input {
        height: 23px !important;
      }
    }
  }
`;

export default function UserForm(props) {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={(values) => {
        const errors = {};

        if (!values.mobileNumber) {
          errors.mobileNumber = "Required field";
        } else if (
          values.mobileNumber?.toString().length !== 10 ||
          /[^\d]/g.test(values.mobileNumber)
        ) {
          console.log(
            values.mobileNumber.length !== 10,
            /[^\d]/g.test(values.mobileNumber),
            values.mobileNumber
          );
          errors.mobileNumber = "Invalid Mobile Number";
        }

        if (!values.emailAddress) {
          errors.emailAddress = "Required field";
        } else if (!EMAIL_REGEX.test(values.emailAddress)) {
          errors.emailAddress = "Invalid email";
        }

        if (!values.firstName) {
          errors.firstName = "Required field";
        }

        if (!values.lastName) {
          errors.lastName = "Required field";
        }

        if (
          !props.disableRoles &&
          !props.hideRoles &&
          (!values.roles || values.roles.length === 0)
        ) {
          errors.roles = "Required field";
        }

        return errors;
      }}
      onSubmit={props.userFormSubmit}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Row>
            {/*  <Col lg={10}>
              <Card>
                <CardHeader
                  title={props.title}
                  action={
                    <CardActions hidden={props.hideTopActionBar}>
                      <Button
                        size="small"
                        component={Link}
                        onClick={props.cancelClicked}
                        variant="contained"
                        color="default"
                        className={classes.button}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                        disabled={props.pending}
                      >
                        {props.pending ? props.pendingLabel : props.submitLabel}
                      </Button>
                    </CardActions>
                  }
                />
                <CardContent>
                  <div className="main-content">
                    <div className="row">
                      <div className="col-md-10">{props.errorMessage}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <TextField
                              required
                              label="Firstname"
                              name="firstName"
                              className={classes.textField}
                              margin="normal"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.firstName}
                              helperText={touched.firstName && errors.firstName}
                              error={Boolean(touched.firstName && errors.firstName)}
                            />
                          </div>
                          <div className="col-md-6">
                            <TextField
                              required
                              label="Lastname"
                              name="lastName"
                              className={classes.textField}
                              margin="normal"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              helperText={touched.lastName && errors.lastName}
                              error={Boolean(touched.lastName && errors.lastName)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <TextField
                              required
                              label="Mobile number"
                              name="mobileNumber"
                              className={classes.textField}
                              margin="normal"
                              onBlur={handleBlur}
                              disabled={props.disableMobileNumber}
                              onChange={handleChange}
                              value={values.mobileNumber}
                              helperText={touched.mobileNumber && errors.mobileNumber}
                              error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                            />
                          </div>
                          <div className="col-md-6">
                            <TextField
                              required
                              label="Email"
                              name="emailAddress"
                              placeholder="john@smith.com"
                              className={classes.textField}
                              margin="normal"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.emailAddress}
                              helperText={touched.emailAddress && errors.emailAddress}
                              error={Boolean(touched.emailAddress && errors.emailAddress)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <FormControl className={classes.formControl}>
                              <Autocomplete
                                multiple
                                hidden={props.hideRoles}
                                name="roles"
                                defaultChecked={props.roles}
                                options={props.roles}
                                defaultValue={values.roles}
                                onChange={(event, value) => autoCompleteChangeHandler(event, value)}
                                disabled={props.disableRoles}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                renderOption={(option, { selected }) => (
                                  <React.Fragment>
                                    <Checkbox
                                      color="primary"
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                    />
                                    {option.name}
                                  </React.Fragment>
                                )}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" label="Roles" />
                                )}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-9"></div>
                          <div className="col-md-3">
                            <CardActions hidden={!props.hideTopActionBar}>
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                disabled={props.pending}
                              >
                                {props.pending ? props.pendingLabel : props.submitLabel}
                              </Button>
                            </CardActions>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Col>*/}
          </Row>

          <Box
            my={{ xs: "20px", md: "50px" }}
            bg="white"
            width="100%"
            borderRadius="1rem"
            maxWidth="1335px"
            p={{ xs: "30px 20px", md: "44px 36px" }}
          >
            <Box>
              <Text lineHeight="30px" fontSize="20px" color="black" mb="30px">
                {props.title}
              </Text>
              <GridStyle
                gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr .4fr" }}
                gridGap="100px"
                gridRowGap={{ xs: "0", md: "10px" }}
                pb={{ xs: "20px", md: "100px" }}
              >
                <Box>
                  <Text
                    as="h5"
                    style={{ fontWeight: "500" }}
                    color="rgba(17, 17, 17, 0.8)"
                    fontSize="14px"
                  >
                    Firstname*
                  </Text>
                  <FormInput
                    required
                    label="Firstname"
                    name="firstName"
                    placeholder="Enter Firstname"
                    value={values.firstName}
                    className="user-form-input-style"
                    labelHide
                  />
                </Box>
                <Box>
                  <Text
                    as="h5"
                    style={{ fontWeight: "500" }}
                    color="rgba(17, 17, 17, 0.8)"
                    fontSize="14px"
                  >
                    Lastname*
                  </Text>
                  <FormInput
                    required
                    label="Lastname"
                    name="lastName"
                    placeholder="Enter Lastname"
                    value={values.lastName}
                    className="user-form-input-style"
                    labelHide
                  />
                </Box>
                <Box />
                <Box>
                  <Text
                    as="h5"
                    style={{ fontWeight: "500" }}
                    color="rgba(17, 17, 17, 0.8)"
                    fontSize="14px"
                  >
                    Mobile Number*
                  </Text>
                  <FormInput
                    required
                    label="Mobile number"
                    name="mobileNumber"
                    placeholder="Enter Mobile number"
                    value={values.mobileNumber}
                    disabled={props.disableMobileNumber}
                    className="user-form-input-style"
                    labelHide
                    maxLength={10}
                  />
                </Box>
                <Box>
                  <Text
                    as="h5"
                    style={{ fontWeight: "500" }}
                    color="rgba(17, 17, 17, 0.8)"
                    fontSize="14px"
                  >
                    Email*
                  </Text>
                  <FormInput
                    required
                    label="Email"
                    name="emailAddress"
                    placeholder="john@smith.com"
                    value={values.emailAddress}
                    className="user-form-input-style"
                    labelHide
                  />
                </Box>
                <Box />
                <Box>
                  <Text
                    as="h5"
                    style={{ fontWeight: "500" }}
                    color="rgba(17, 17, 17, 0.8)"
                    fontSize="14px"
                  >
                    Roles*
                  </Text>
                  <FormSelect
                    options={
                      props.initialValues.roles === "SuperAdmin"
                        ? [
                            { label: "SuperAdmin", value: "SuperAdmin" },
                            { label: LOGIN_TYPE.ADMIN, value: LOGIN_TYPE.ADMIN },
                            { label: LOGIN_TYPE.AGENT, value: LOGIN_TYPE.AGENT },
                            { label: LOGIN_TYPE.CHECKER, value: LOGIN_TYPE.CHECKER },
                            { label: LOGIN_TYPE.AUDITOR, value: LOGIN_TYPE.AUDITOR },
                          ]
                        : [
                            { label: LOGIN_TYPE.ADMIN, value: LOGIN_TYPE.ADMIN },
                            { label: LOGIN_TYPE.AGENT, value: LOGIN_TYPE.AGENT },
                            { label: LOGIN_TYPE.CHECKER, value: LOGIN_TYPE.CHECKER },
                            { label: LOGIN_TYPE.AUDITOR, value: LOGIN_TYPE.AUDITOR },
                          ]
                    }
                    noMargin
                    labelHide
                    width="30px"
                    name="roles"
                    menuPlacement="top"
                    label="Select Roles"
                    height={{ md: "55px" }}
                    className="role-select-input"
                    isDisabled={props.initialValues.roles === "SuperAdmin"}
                  />
                </Box>
                <Box mt="30px" alignSelf="flex-end">
                  {/* <CardActions
                    hidden={props.hideTopActionBar}
                    style={{ justifyContent: "flex-end" }}
                  > */}
                  <Grid
                    gridGap="10px"
                    gridAutoFlow="column"
                    justifyContent={{ xs: "center", md: "flex-end" }}
                  >
                    <Button
                      component={Link}
                      onClick={props.cancelClicked}
                      variant="default"
                      width="fit-content"
                      px="20px"
                      height="40px"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={props.pending}
                      width="fit-content"
                      height="40px"
                      px="20px"
                    >
                      {props.pending ? props.pendingLabel : props.submitLabel}
                    </Button>
                  </Grid>
                  {/* </CardActions> */}
                </Box>
                <Text
                  fontSize="14px"
                  color="red.500"
                  textAlign="center"
                  mt="2rem"
                  gridColumn={{ md: "1 / 3" }}
                  gridRow={{ md: "4" }}
                >
                  {props.errorMessage}
                </Text>
              </GridStyle>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
}
