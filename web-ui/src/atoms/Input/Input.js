import React, { forwardRef, useRef, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import mergeRefs from "utils/mergeRefs";
import { space, layout, color, position, border, shadow, typography, variant } from "styled-system";

import { Flex } from "atoms/Flex";
import { Text } from "atoms/Text";
import { useEffect } from "react";

export const InputBase = styled.input`
  width: 100%;
  font-weight: 600;
  font-family: Poppins;
  ${variant({
    variants: {
      primary: {
        p: "11px",
        border: "1px solid",
        borderColor: "gray.300",
        outline: "none",
        fontWeight: "400",

        borderRadius: "4px",
        "&:hover": {
          borderColor: "black",
        },
        "&:focus, &:active": {
          bg: "white.0",
        },
        "&::placeholder": {
          color: "gray.400",
          // fontSize: "14px",
        },
      },
      secondary: {
        display: "block",
        border: "none",
        borderBottom: "1px solid",
        borderColor: "gray.500",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      },
      error: {
        display: "block",
        color: "red.500",
        border: "none",
        borderBottom: "1px solid",
        borderColor: "gray.500",
      },
    },
  })};

  ${space}
  ${layout}
  ${color}
  ${position}
  ${border}
  ${shadow}
  ${typography}
`;

export const Input = forwardRef(
  ({ autoFocus, variant: v = "primary", type, onChange, ...props }, ref) => {
    const inputRef = useRef(null);

    const [isOpen, setOpen] = useState(false);
    const [toggleVisible, setToggleVisible] = useState(false);

    const toggle = useCallback(() => setOpen((prev) => !prev), []);

    const isPassword = useMemo(() => type === "password", [type]);

    const onChangeHandler = useCallback(
      (e) => {
        if (typeof onChange === "function") {
          onChange(e);
        }
        setToggleVisible(e?.currentTarget?.value?.length > 0);
      },
      [onChange]
    );
    useEffect(() => {
      if (autoFocus && inputRef?.current) {
        // eslint-disable-next-line
        inputRef?.current?.focus?.();
      }
      // eslint-disable-next-line
    }, []);

    return (
      <>
        {isPassword && toggleVisible && (
          <Flex
            onClick={toggle}
            position="absolute"
            top={0}
            right={0}
            cursor="pointer"
            alignItems="center"
            height="100%"
            width="4.5rem"
            justifyContent="center"
          >
            <Text textDecoration="underline" firstLetterCapital>
              {isOpen ? "hide" : "show"}
            </Text>
          </Flex>
        )}
        <InputBase
          type={isPassword && isOpen ? "text" : type}
          variant={v}
          ref={mergeRefs(ref, inputRef)}
          fontFamily="Poppins"
          onChange={onChangeHandler}
          {...props}
          pr={isPassword ? "4.5rem" : undefined}
        />
      </>
    );
  }
);
