import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { Box } from "../Box";
import { Flex } from "../Flex";
import { Text } from "../Text";
import { Loader } from "../Loader";

const ButtonBase = styled(Box)`
  position: relative;
  cursor: pointer;
  outline: none;
  display: grid;
  align-items: center;
  /* padding: 0 10px; */

  ${variant({
    variants: {
      primary: {
        color: "white",
        bg: "blue.500",
        // px: "10px",
        fontFamily: "primary",
        fontSize: "16px",
        border: "1px solid",
        borderColor: "blue.500",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        // width: "100%",
        "&:active, &:hover": {
          bg: "transparent",
          color: "blue.500",
          boxShadow: "0 10px 25px rgba(25, 118, 210, 0.5)",
        },

        "&:focus": {
          outline: "none",
        },
      },
      secondary: {
        color: "blue.500",
        fontFamily: "primary",
        bg: "transparent",
        border: "1px solid",
        fontSize: "16px",
        borderRadius: "4px",
        px: "10px",
        borderColor: "blue.500",
        cursor: "pointer",
        transition: "all .3s",
        "&:active, :hover": {
          bg: "blue.500",
          color: "white",
          boxShadow: "0 10px 25px rgba(25, 118, 210, 0.5)",
        },
        "&:focus": {
          outline: "none",
        },
      },
      default: {
        color: "rgba(17, 17, 17, 0.5)",
        bg: "transparent",
        fontFamily: "primary",
        fontSize: "16px",
        border: "1px solid",
        borderColor: "rgba(17, 17, 17, 0.5)",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        // width: "100%",
        "&:active, &:hover": {
          bg: "transparent",
          color: "rgba(17, 17, 17, 0.5)",
        },

        "&:focus": {
          outline: "none",
        },
      },
      warning: {
        color: "rgba(17, 17, 17, 0.6)",
        bg: "yellow.600",
        fontFamily: "primary",
        fontSize: "16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all .3s",
        "&:active, &:hover": {
          bg: "#d5b304",
          color: "rgba(17, 17, 17, 0.6)",
          boxShadow: "0 10px 25px rgba(25, 118, 210, 0.5)",
        },

        "&:focus": {
          outline: "none",
        },
      },
      error: {
        color: "white",
        bg: "red.500",
        px: "10px",
        fontFamily: "primary",
        fontSize: "16px",
        border: "1px solid",
        borderColor: "red.500",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all .3s",
        // width: "100%",
        "&:active, &:hover": {
          bg: "transparent",
          color: "red.500",
          boxShadow: "0 10px 25px rgba(210, 25, 25, 0.5)",
        },

        "&:focus": {
          outline: "none",
        },
      },
    },
  })}
  &[disabled] {
    background-color: #ddd;
    border-color: #ddd;
    color: white;
    pointer-events: none;
  }
`;

export const Button = ({
  disabled,
  loading,
  children,
  variant: v = "primary",
  onClick,
  showAsyncLoad,
  ...rest
}) => {
  const [asyncLoading, setLoading] = useState(false);
  const onClickHandler = useCallback(
    async (...arg) => {
      setLoading(true);
      try {
        await onClick?.(arg);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    },
    [onClick]
  );

  return (
    <ButtonBase
      variant={v}
      as="button"
      color="white"
      {...rest}
      onClick={onClickHandler}
      disabled={disabled || loading || (showAsyncLoad && asyncLoading)}
      overflow="hidden"
    >
      {(loading || (showAsyncLoad && asyncLoading)) && (
        <Flex
          left={0}
          right={0}
          position="absolute"
          justifyContent="center"
          alignItems="center"
          fontSize={2}
          height="15px"
          width="15px"
          mx="auto"
        >
          <Loader loading color="blue.500" />
        </Flex>
      )}
      <Text color="inherit" opacity={loading || (showAsyncLoad && asyncLoading) ? 0 : 1}>
        {children}
      </Text>
    </ButtonBase>
  );
};

Button.defaultProps = {
  as: "button",
  width: "100%",
};
