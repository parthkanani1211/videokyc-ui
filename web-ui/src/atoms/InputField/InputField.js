import React, { useRef } from "react";
import styled from "styled-components";
import css from "@styled-system/css";

import { Box } from "atoms/Box";
import { Text } from "atoms/Text";
import { Error } from "atoms/Error";

import { Warning } from "atoms/Warning";
import { Input } from "atoms/Input";
import mergeRefs from "utils/mergeRefs";

export const InputFieldBase = styled(Box)`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
  margin: 0 0 30px 0;
  label {
    font-size: 14px;
    ${({ labelHide }) =>
      css({
        borderRadius: "6px",
        span: {
          position: "absolute",
          top: "50%",
          bg: "white",
          left: "15px",
          transform: "translateY(-50%)",
          transition: "0.2s all",
          color: "gray.600",
          maxWidth: "calc(100% - 14px)",
        },

        ...(!labelHide && {
          "input, textarea": {
            "::placeholder": {
              opacity: 0,
              visibility: "hidden",
            },
            "&:focus": {
              borderColor: "gray.900",
              "& + span": {
                color: "gray.900",
                px: "3px",
              },
            },
            "&:focus + span, &:not(:placeholder-shown) + span": {
              top: "0px",
              fontSize: "12px",
              px: "3px",
              left: "12px",
            },
          },
          textarea: {
            "& + span": {
              top: "17px",
              transform: "none",
            },
            "&:focus + span, &:not(:placeholder-shown) + span": {
              top: "-7px",
              px: "3px",
              left: "12px",
            },
          },
          "&.input-error input, &.input-error input, &.input-error textarea": {
            borderColor: "red.500",
            "& + span": {
              color: "red.500",
            },
          },
        }),
      })}
  }
`;

export const InputField = ({
  label,
  error,
  warning,
  labelHide,
  showLength,
  noMargin,
  forwardRef,
  ...props
}) => {
  const ref = useRef(null);

  const inputRef = mergeRefs(ref, forwardRef);

  return (
    <InputFieldBase labelHide={labelHide} margin={noMargin ? "0 !important" : undefined}>
      <Text
        mb={0}
        as="label"
        color="gray.700"
        fontSize={{ xs: 7 }}
        className={error ? "input-error" : ""}
      >
        <Input placeholder={label} ref={inputRef} {...props} />
        {!labelHide && (
          <Text as="span" lineHeight="12px" ml="-0.2rem">
            {label}
          </Text>
        )}
      </Text>
      {showLength && (
        <Text
          fontSize="12px"
          position="absolute"
          bg="white"
          fontWeight="300"
          color="gray.700"
          right="7px"
          bottom="10px"
          style={{ pointerEvents: "none" }}
        >
          {
            // @ts-ignore
            inputRef?.current?.value?.length || 0
          }{" "}
          / {props.maxLength}
        </Text>
      )}
      {error && (
        <Box position="absolute" bottom="5px" style={{ pointerEvents: "none" }}>
          <Error text={error} />
        </Box>
      )}
      {warning && <Warning text={warning} />}
    </InputFieldBase>
  );
};
