import React, { forwardRef } from 'react';
import {NumericFormat} from 'react-number-format';
import { TextField } from '@mui/material';
import _ from 'lodash';

const NumberCardField = forwardRef(({ onChange, ...props }, ref) => (
  <NumericFormat
    {...props}
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: props.name,
          value: values.value,
        },
      });
    }}
    isNumericString
  />
));

NumberCardField.displayName="NumberCardField";

// eslint-disable-next-line react/display-name
export default React.memo(({
  title,
  charMin,
  charMax,
  placeholder,
  handleSetValue,
  initialValue,
  disabled,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const debounceFn = React.useCallback(
    _.debounce((v) => handleSetValue(v), 800, { trailing: true }),
    []);
  const handleChange = (e) => {
    setValue(e.target.value);
    debounceFn(e.target.value);
  };
  return (
    <TextField
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      name={title}
      id={`${title}-number`}
      InputProps={{
        inputComponent: NumberCardField,
        inputProps: {
          minLength: charMin,
          maxLength: charMax,
        },
      }}
    />
  );
});
