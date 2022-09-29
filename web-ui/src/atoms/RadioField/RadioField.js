import React from "react";
import styled from "styled-components";

import { Box } from "atoms/Box";
import { Flex } from "atoms/Flex";
import { Text } from "atoms/Text";
import { Input } from "atoms/Input";
import { Error } from "atoms/Error";
import { Warning } from "atoms/Warning";

export const RadioFieldBase = styled(Box)`
  position: relative;
  display: grid;
  align-items: center;
  margin: 0 0 25px 0;
  gap: 10px;
  label {
    font-size: 1.4rem;
  }
`;

export const RadioField = ({ label, error, warning, ...props }) => {
  return (
    <RadioFieldBase>
      <Flex alignItems="center">
        <Input type="radio" width="auto" mt={0} ml={0} mr={4} {...props} />
        <Text as="label" color="gray.700" fontSize={{ xs: 7 }}>
          {label}
        </Text>
      </Flex>
      {error && <Error text={error} />}
      {warning && <Warning text={warning} />}
    </RadioFieldBase>
  );
};
