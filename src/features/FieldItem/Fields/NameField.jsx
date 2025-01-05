import * as React from 'react';
import { TextField } from '@mui/material';
import _ from 'lodash';

export default function NameField({ placeholder, handleSetValue, initialValue, disabled }) {
  const [firstName, middleName, lastName, fourthName] = placeholder.split(',');
  const [fullName, setFullName] = React.useState(Array.isArray(initialValue) ? initialValue : ['', '', '', '']);

  const debounceFn = React.useCallback(
    _.debounce((v) => handleSetValue(v), 800, { trailing: true }),
    []);
  const handleName = (e, idx) => {
    setFullName((arr) => arr.map((x, i) => idx === i ? e.target.value : x));
    debounceFn(fullName);
  };
  return (
    <>
      <TextField
        disabled={disabled}
        value={fullName[0]}
        onChange={(e) => handleName(e, 0)}
        placeholder={firstName}
        sx={{ mr: 2 }}
      />
      <TextField
        disabled={disabled}
        value={fullName[1]}
        onChange={(e) => handleName(e, 1)}
        placeholder={middleName}
        sx={{ mr: 2 }}
      />
      <TextField
        disabled={disabled}
        value={fullName[2]}
        onChange={(e) => handleName(e, 2)}
        placeholder={lastName}
        sx={{ mr: 2 }}
      />
      <TextField
        disabled={disabled}
        value={fullName[3]}
        onChange={(e) => handleName(e, 3)}
        placeholder={fourthName}
      />
    </>
  );
}
