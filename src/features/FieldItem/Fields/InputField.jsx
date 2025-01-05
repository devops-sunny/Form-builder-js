import * as React from 'react';
import { TextField } from '@mui/material';
import _ from 'lodash';

// eslint-disable-next-line react/display-name
export default React.memo(({
  placeholder,
  multiline,
  charMax,
  charMin,
  rowMax,
  rowMin,
  style,
  type,
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
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxRows={rowMax}
      minRows={rowMin}
      multiline={multiline}
      rows={multiline && 3}
      inputProps={{
        sx: ['inline'].includes(type) && {
          fontFamily: style.fontFamily,
          fontSize: `${style.fontSize}px`,
          lineHeight: `${style.fontSize}px`,
          fontStyle: style.textDecoration.includes('italic') && 'italic',
          fontWeight: style.textDecoration.includes('bold') && 700,
          textDecoration: style.textDecoration.includes('underline') && 'underline',
          textAlign: style.textAlign,
        },
        maxLength: charMax,
        minLength: charMin,
      }}
    />
  );
});
