import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ClockIcon } from '../../../icons';

// eslint-disable-next-line react/display-name
export default React.memo(({ handleSetValue, initialValue, disabled }) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue) => {
    setValue(newValue);
    handleSetValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        disabled={disabled}
        value={value}
        onChange={handleChange}
        components={{
          OpenPickerIcon: ClockIcon
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
});
