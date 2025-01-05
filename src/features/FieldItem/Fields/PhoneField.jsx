import React, { forwardRef } from 'react';
import {NumericFormat} from 'react-number-format';
import _ from 'lodash';
import {
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import { CornerDownIcon } from '../../../icons';

const PhoneCardField = forwardRef(({ onChange, mask, ...props }, ref) => (
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
    format={mask}
    mask="_"
  />
));

PhoneCardField.displayName="PhoneCardField";

// eslint-disable-next-line react/display-name
export default React.memo(({
  title,
  isPhoneMaskChecked,
  phoneAllowedCountries,
  phoneDefaultCountry,
  placeholder,
  charMin,
  charMax,
  handleSetValue,
  disabled,
}) => {
  // TODO make object instead of two states
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('');

  const debounceFn = React.useCallback(
    _.debounce((v) => handleSetValue(v), 800, { trailing: true }),
    []);

  const handleChange = (e) => {
    setValue(e.target.value);
    debounceFn(`${selectValue.code}${e.target.value}`);
  };
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
    debounceFn(`${e.target.value.code}${value}`);
  };
  return (
    <>
      <Select
        disabled={disabled}
        displayEmpty
        variant="standard"
        id="modal-placeholder-select"
        sx={{ mr:2 }}
        IconComponent={CornerDownIcon}
        value={selectValue}
        onChange={handleSelectChange}>
        <MenuItem value={phoneDefaultCountry || ''}>
          {phoneDefaultCountry?.code || 'Select'}
        </MenuItem>
        {phoneAllowedCountries.map((c) => (
          <MenuItem key={c.name} value={c}>
            {c.code}
          </MenuItem>
        ))}
      </Select>
      <TextField
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={title}
        id={`${title}-phone`}
        InputProps={{
          inputComponent: PhoneCardField,
          inputProps: {
            minLength: charMin,
            maxLength: charMax,
            /* picking the longest mask from the array if exists */
            mask: isPhoneMaskChecked && Array.isArray(selectValue.mask) ? selectValue.mask.sort((a, b) => b.length - a.length)[0] : selectValue.mask,
          },
        }}
      />
    </>
  );
});
