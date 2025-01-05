import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateIcon } from '../../../icons';

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
      <DesktopDatePicker
        disabled={disabled}
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={handleChange}
        components={{
          OpenPickerIcon: DateIcon,
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
});
