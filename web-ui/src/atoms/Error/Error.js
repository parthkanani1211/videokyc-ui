import React from "react";
import { Text } from "atoms/Text";
import { ErrorMessage } from "formik";

export const Error = ({ text, ...props }) => {
  return (
    <Text
      as="span"
      variant="small"
      color="red.500"
      position="relative"
      bottom={{ xs: -22 }}
      left="0px"
      fontWeight="600"
      fontSize="10px"
      whiteSpace="nowrap"
      {...props}
    >
      {text}
    </Text>
  );
};
export const FormikError = ({ name }) => {
  return <ErrorMessage name={name}>{(error) => <Error text={error} />}</ErrorMessage>;
};
