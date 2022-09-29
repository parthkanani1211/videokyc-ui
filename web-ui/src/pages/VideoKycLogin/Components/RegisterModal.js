import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik } from 'formik';
import { Button, Box, TextField } from '../../../components';

const RegisterModal = (props) => {
    const { open, handleClose } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-vox"
            >
                <DialogContent>
                    <Formik
                        initialValues={{
                            otp: '',
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.otp) {
                                errors.otp = 'OTP required';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            alert(JSON.stringify(values));
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
                            <form onSubmit={handleSubmit}>
                                <Box>
                                    <TextField
                                        autoFocus
                                        error={Boolean(
                                            touched.otp && errors.otp
                                        )}
                                        helperText={errors.otp}
                                        label=" OTP "
                                        type="number"
                                        name="otp"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.otp}
                                    />
                                </Box>
                                <Box
                                    textAlign="center"
                                    p={2}
                                    flex="1"
                                    justifyContent="space-between"
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                    {'      '}
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RegisterModal;
