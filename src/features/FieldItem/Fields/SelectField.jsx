import * as React from 'react';
import PT from 'prop-types';
import { Select, MenuItem } from '@mui/material';
import { CornerDownIcon } from '../../../icons';

// eslint-disable-next-line react/display-name
function SelectField({
  list,
  placeholder,
  handleSetValue,
  initialId,
  disabled,
}) {
  const [value, setValue] = React.useState(initialId);

  React.useEffect(() => {
    setValue(initialId);
  }, [initialId]);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleSetValue(e.target.value);
  };

  return (
    <Select
      fullWidth
      disabled={disabled}
      displayEmpty
      variant="standard"
      id="modal-card-item-select"
      IconComponent={CornerDownIcon}
      value={value}
      onChange={handleChange}>
      <MenuItem value=''>
        {placeholder || 'Select'}
      </MenuItem>
      {list.map(({ id, title, isVisible }) => (
        <MenuItem
          key={id}
          value={id}
          sx={{ display: !isVisible && 'none' }}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
}



SelectField.propTypes = {
  list: PT.array.isRequired,
  handleSetValue: PT.func.isRequired,
  placeholder: PT.string,
  intialId: PT.string,
};

SelectField.defaultProps = {
  placeholder: '',
  initialId: '',
};

export default React.memo(SelectField);
