import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FormGroup, FormControlLabel } from '@mui/material';
import Radio from '../../../components/Radio';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

const MemoRadioItem = React.memo(({ id, title, isChecked, isVisible, handleChange, disabled }) => (
  <StyledFormControlLabel
    label={title}
    checked={isChecked}
    control={
      <Radio
        disabled={disabled}
        checked={isChecked}
        sx={{ display: !isVisible && 'none' }}
        onChange={(e) => handleChange(e, id)}
        value={id}
        name="radio-buttons"
        inputProps={{ 'aria-label': { title } }}
      />}
  />
));

MemoRadioItem.displayName="MemoRadioItem";

export default function RadioList({ list, handleSetValue, disabled }) {

  // TODO figure out disabled state
  const handleChange = React.useCallback(({ target: { value } }, id) => {
    handleSetValue(value, id, true);
  }, []);

  return (
    <div>
      <FormGroup>
        {list.map(({ isVisible, isChecked, id, title }) => (
          <MemoRadioItem
            disabled={disabled}
            key={id}
            id={id}
            title={title}
            isChecked={isChecked}
            isVisible={isVisible}
            handleChange={handleChange}
          />
        ))}
      </FormGroup>
    </div>
  );
}
