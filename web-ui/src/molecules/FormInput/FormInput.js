import React, { useCallback, useMemo } from "react";
import { useField } from "formik";

import { onlyNumbers } from "store/request/constants";
import { Checkbox, InputField, SelectField } from "atoms";
import { isMobile } from "utils/utilities";

export const FormInput = ({ name, type, validate, restrict, onChange, maxLength, ...props }) => {
  const [field, meta, { setValue }] = useField({ name, validate });
  const error = (meta.touched && meta.error) || props.error || "";

  const restricRegex = useMemo(() => restrict || (type === "number" ? onlyNumbers : undefined), [
    type,
    restrict,
  ]);

  const onChangeHander = useCallback(
    (e) => {
      setValue(
        restricRegex
          ? e.target.value.replace(restricRegex, "")?.slice(0, maxLength)
          : e.target.value
      );
    },
    // eslint-disable-next-line
    [restricRegex, maxLength, name]
  );

  return (
    <InputField
      {...field}
      {...props}
      onChange={(e) => {
        onChangeHander(e);
        // eslint-disable-next-line
        props?.onChange?.(e);
      }}
      type={!isMobile() && type === "number" ? "text" : type}
      pattern={type === "number" ? "[0-9]*" : undefined}
      error={error}
      maxLength={maxLength}
    />
  );
};

export const FormCheckbox = ({ name, onChange: onChangeFromProps, ...props }) => {
  const [field, , { setValue }] = useField(name);

  const onChange = useCallback(
    (val) => {
      setValue(val);
      if (typeof onChangeFromProps === "function") {
        onChangeFromProps(val);
      }
    },
    [setValue, onChangeFromProps]
  );

  return <Checkbox {...field} {...props} onChange={onChange} />;
};

export const FormSelect = ({ name, options, validate, onChange, ...props }) => {
  const [field, meta, { setValue, setTouched }] = useField({ name, validate });
  const error = (meta.touched && meta.error) || "";

  const onChangeHandler = useCallback(
    (option) => {
      setTouched(true);
      const value = Array.isArray(option) ? option?.map((o) => o?.value) : option?.value;
      setValue(value);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange, setValue, setTouched]
  );

  return (
    <SelectField
      {...field}
      value={
        Array.isArray(field.value)
          ? options?.filter((o) => field.value.includes(o.value))
          : // eslint-disable-next-line eqeqeq
            options?.find((o) => o.value == field.value) || field.value
      }
      {...props}
      onChange={onChangeHandler}
      onBlur={(e) => {
        setTouched(true);
        if (props.onBlur) {
          props.onBlur(e);
        }
      }}
      options={options}
      error={error}
    />
  );
};
