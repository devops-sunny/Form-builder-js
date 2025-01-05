import React, { forwardRef, useEffect } from 'react';
import {NumericFormat} from 'react-number-format';
import _ from 'lodash';
import {
  TextField,
  Typography,
} from '@mui/material';

const CurrencyCardField = forwardRef(({ onChange, prefix, ...props }, ref) => (
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
    decimalSeparator="."
    isNumericString
    prefix={prefix}
  />
));

CurrencyCardField.displayName = "CurrencyCardField";

// eslint-disable-next-line react/display-name
export default React.memo(({
  title,
  charMin,
  charMax,
  placeholder,
  currency,
  handleSetValue,
  initialValue,
  disabled,
}) => {
  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const debounceFn = React.useCallback(
    _.debounce((v) => handleSetValue(v), 800, { trailing: true }),
    []);

  const handleChange = (e) => {
    setValue(e.target.value);
    debounceFn(e.target.value);
  };

  return (
    <>
      <TextField
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={title}
        id={`${title}-currency`}
        InputProps={{
          sx: { width: 112 },
          inputComponent: CurrencyCardField,
          inputProps: {
            minLength: charMin,
            maxLength: charMax,
            prefix: currency?.symbol,
          },
        }}
      />
      <Typography
        sx={{ display: 'flex', alignItems: 'center', ml: 4, mr: 2 }}>{currency?.currency || ' '}</Typography>
    </>
  );
})
