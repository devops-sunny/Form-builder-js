import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateIcon } from '../../../icons';

// eslint-disable-next-line react/display-name
export default React.memo(({ handleSetValue, initialValue, disabled }) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue) => {
    setValue(`${newValue}`);
    handleSetValue(`${newValue}`);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disabled={disabled}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
        components={{
          OpenPickerIcon: DateIcon
        }}
      />
    </LocalizationProvider>
  );
});
