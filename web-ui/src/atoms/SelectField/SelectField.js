import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import ReactSelect, { components } from "react-select";

import { Box } from "atoms/Box";
import { Text } from "atoms/Text";
import { Error } from "atoms/Error";
import { Warning } from "atoms/Warning";
import MemoSearchIcon from "assets/icons/SearchIcon";

export const SelectFieldBase = styled(Box)`
  position: relative;
  width: 100%;
  font-family: Poppins;
  display: grid;
  align-items: center;
  margin: 0 0 30px 0;
  gap: 10px;
  cursor: pointer;
  label {
    font-size: 14px;
    ${({ labelHide }) =>
      css({
        borderRadius: "6px",
        span: {
          position: "absolute",
          top: "50%",
          left: "0px",
          transform: "translateY(-50%)",
          transition: "0.2s all",
        },

        ...(!labelHide && {
          input: {
            "::placeholder": {
              opacity: 0,
              visibility: "hidden",
            },
            "&:focus + span, &:not(:placeholder-shown) + span": {
              top: "0px",
              fontSize: "12px",
            },
          },
        }),
      })}
  }
`;

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

export const SelectField = ({
  label,
  error,
  width,
  height,
  warning,
  noMargin,
  labelHide,
  searchable,
  borderRadius,
  ...props
}) => {
  return (
    <SelectFieldBase labelHide={labelHide} margin={noMargin ? "0 !important" : undefined}>
      <Text as="label" color="gray.700" fontSize={{ xs: 7 }} mb="0">
        <ReactSelect
          placeholder={label}
          components={{
            ValueContainer: CustomValueContainer,
          }}
          blurInputOnSelect={false}
          styles={{
            control: (provided, state) => ({
              ...provided,
              borderColor: error ? "#f44336" : "#e0e0e0 !important",
              boxShadow: "none",
              flexWrap: "nowrap",
              cursor: "pointer",
              padding: "4.5px 0px",
              ...(searchable && {
                borderRadius: borderRadius || "100px",
                paddingLeft: "4rem",
              }),
              backgroundColor: state.isDisabled ? "#fafafa" : "inherit",
            }),
            valueContainer: (provided) => ({
              ...provided,
              overflow: "visible",
              // height: "33px",
              height: height,
              width: width || provided.width,
            }),
            placeholder: (provided, state) => ({
              ...provided,
              position: "absolute",
              top: state.hasValue || state.selectProps.inputValue ? "-6px" : "50%",
              transition: "top 0.1s, font-size 0.1s",
              fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
              lineHeight: "4px",
              backgroundColor: (state.hasValue || state.selectProps.inputValue) && "white",
              paddingLeft: 2,
              paddingRight: 2,
              color: error ? "#f44336" : provided.color,
              whiteSpace: "nowrap",
              display:
                (state.hasValue || state.selectProps.inputValue) && labelHide
                  ? "none"
                  : provided.state,
            }),
            loadingIndicator: (provided) => ({
              ...provided,
              position: "relative",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: 0,
              paddingRight: "4px",
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: state.isDisabled ? "#616161" : "inherit",
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor:
                state.isSelected || state.isFocused ? "rgba(196, 196, 196, 0.3)" : "",
              color: state.isSelected ? "#000000" : "",
              "&:hover": {
                backgroundColor: `rgba(196, 196, 196, 0.3)`,
                color: "#000000",
              },
            }),
            multiValue: (styles, { data }) => {
              // const color = chroma(data.color);
              return {
                ...styles,
                backgroundColor: "#006CFB",
                color: "#ffffff",
              };
            },
            multiValueLabel: (styles, { data }) => ({
              ...styles,
              color: "#ffffff",
            }),
            multiValueRemove: (base, state) => {
              return state.data.isFixed ? { ...base, display: "none" } : base;
            },
          }}
          closeMenuOnSelect={!props.isMulti}
          tabSelectsValue={false}
          {...props}
        />
        {searchable && (
          <Box position="absolute" top="15px" left="23px">
            <MemoSearchIcon />
          </Box>
        )}
      </Text>
      {error && (
        <Box position="absolute" bottom="4px">
          <Error text={error} />
        </Box>
      )}
      {warning && <Warning text={warning} />}
    </SelectFieldBase>
  );
};

SelectField.defaultProps = {
  height: "33px",
};
