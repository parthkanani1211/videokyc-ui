import React, { useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Loadable } from '../../../common';
import { renderErrorMessage } from '../../../util/error';
import { Col, Row } from 'reactstrap';

import {
  Input, Button, makeStyles, TextField, FormControl, Select,
  InputLabel, MenuItem, Card, CardHeader, CardContent, CardActions,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

export default function AiBlockEditPage(props) {

  const {
    mode, usersCreatePending, usersUpdatePending, clientsGetPending,
    initialValues, userId,
    actions: {
      userCreate, userUpdate, userGet
    }
  } = props;

  const isEdit = mode === 'edit';
  const classes = useStyles();

  const handleCallback = () => {
    props.history.push('/users');
  }

  useEffect(() => {
    if (mode === 'edit') {
      userGet(userId);
    }
  }, [userId, mode, userGet]);

  const renderMessage = () => {
    const {
      usersCreateError, usersCreateErrorMessage,
      usersUpdateError, usersUpdateErrorMessage,
    } = props;
    return renderErrorMessage(usersCreateError, usersCreateErrorMessage)
      || renderErrorMessage(usersUpdateError, usersUpdateErrorMessage);
  }

  return (
    <Loadable loading={usersCreatePending || usersUpdatePending || clientsGetPending}>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {};

          if (!values.username) {
            errors.username = 'Required field';
          }

          if (!values.email) {
            errors.email = 'Required field';
          }

          if (!values.firstname) {
            errors.firstname = 'Required field';
          }

          if (!values.lastname) {
            errors.lastname = 'Required field';
          }

          if (!isEdit) {
            if (!values.password) {
              errors.password = 'Required field';
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required field';
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password didn't match.";
            }
          }

          return errors;
        }}
        onSubmit={(values) => {
          let payload = {
            username: values.username,
            firstname: values.firstname,
            lastname: values.lastname,
            roles: [{ id: values.role }],
            email: values.email,
          }

          // create
          if (mode === 'create') {
            payload = {
              ...payload,
              password: values.password,
            }
            userCreate(payload, handleCallback);
          }
          // update
          else {
            payload = {
              ...payload,
              id: values.id,
            }
            userUpdate(values.id, payload, handleCallback);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Row>
                <Col lg={10}>
                  <Card>
                    <CardHeader
                      title={!isEdit ? "Add new User" : "Edit User"}
                      action={
                        <CardActions>
                          <Button
                            size="small"
                            component={Link}
                            to="/users"
                            variant="contained"
                            color="default"
                            className={classes.button}>
                            Cancel
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            type="submit"
                            disabled={usersCreatePending || usersUpdatePending}
                          >
                            {(usersCreatePending || usersUpdatePending) ? 'Saving Changes' : 'Save Changes'}
                          </Button>
                        </CardActions>
                      }
                    />
                    <CardContent>
                      <div className="main-content">
                        <div className="row">
                          <div className="col-md-10">
                            {renderMessage()}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6">
                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="role">Select Role</InputLabel>
                                  <Select
                                    value={values.role}
                                    onChange={handleChange}
                                    disabled={isEdit}
                                    error={Boolean(touched.role && errors.role)}
                                    input={<Input id="role" />}
                                    inputProps={{
                                      name: "role",
                                      id: "role"
                                    }}
                                  >
                                    {props.roles.map(role => (
                                      <MenuItem
                                        key={role.id}
                                        value={role.id}
                                      >
                                        {role.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <TextField
                                  required
                                  label="Firstname"
                                  name="firstname"
                                  className={classes.textField}
                                  margin="normal"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.firstname}
                                  helperText={touched.firstname && errors.firstname}
                                  error={Boolean(touched.firstname && errors.firstname)}
                                />
                              </div>
                              <div className="col-md-6">
                                <TextField
                                  required
                                  label="Lastname"
                                  name="lastname"
                                  className={classes.textField}
                                  margin="normal"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.lastname}
                                  helperText={touched.lastname && errors.lastname}
                                  error={Boolean(touched.lastname && errors.lastname)}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <TextField
                                  required
                                  label="User Name"
                                  name="username"
                                  className={classes.textField}
                                  margin="normal"
                                  onBlur={handleBlur}
                                  disabled={isEdit}
                                  onChange={handleChange}
                                  value={values.username}
                                  helperText={touched.username && errors.username}
                                  error={Boolean(touched.username && errors.username)}
                                />
                              </div>
                              <div className="col-md-6">
                                <TextField
                                  required
                                  label="Email"
                                  name="email"
                                  placeholder="john@smith.com"
                                  className={classes.textField}
                                  margin="normal"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.email}
                                  helperText={touched.email && errors.email}
                                  error={Boolean(touched.email && errors.email)}
                                />
                              </div>
                            </div>

                            {(mode === "create") && (
                              <>
                                <div className="row">
                                  <div className="col-md-6">
                                    <TextField
                                      type="password"
                                      margin="normal"
                                      label="Password"
                                      className={classes.textField}
                                      name="password"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.password}
                                      helperText={touched.password && errors.password}
                                      error={Boolean(touched.password && errors.password)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <TextField
                                      type="password"
                                      margin="normal"
                                      label="Confirm Password"
                                      className={classes.textField}
                                      name="confirmPassword"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.confirmPassword}
                                      helperText={touched.confirmPassword && errors.confirmPassword}
                                      error={Boolean(
                                        touched.confirmPassword && errors.confirmPassword
                                      )}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </form>
          )}
      </Formik>
    </Loadable>
  );
}