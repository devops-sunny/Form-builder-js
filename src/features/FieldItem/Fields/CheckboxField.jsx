import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FormGroup, FormControlLabel } from '@mui/material';
import Checkbox from '../../../components/Checkbox';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

StyledFormControlLabel.displayName = "StyledFormControlLabel";

const MemoListItem = React.memo(({ id, title, isChecked, isVisible, handleChange, disabled }) => (
  <StyledFormControlLabel
    label={title}
    checked={isChecked}
    control={
      <Checkbox
        disabled={disabled}
        checked={isChecked}
        sx={{ display: !isVisible && 'none' }}
        onChange={(e) => handleChange(e, id)}
      />
    }
  />
));

MemoListItem.displayName = "MemoListItem";

export default function CheckboxList({ list, handleSetValue, initialValue, disabled }) {
  const initialValueArrayToIdArray = list.filter((k) => initialValue.includes(k.title) && k.isChecked).map((x) => x.id);
  const [, setCheckedList] = React.useState(initialValueArrayToIdArray);

  const handleChange = React.useCallback(
    (e, id) => {
      setCheckedList((prevList) => {
        if (prevList.includes(id)) {
          handleSetValue(prevList.filter((curId) => curId !== id), id, e.target.checked)
          return prevList.filter((curId) => curId !== id);
        }
        handleSetValue([...prevList, id], id, e.target.checked)
        return [...prevList, id];
      });
    },
    []);
  return (
    <FormGroup>
      {list.map(({ id, title, isChecked, isVisible }) => (
        <MemoListItem
          key={id}
          id={id}
          title={title}
          disabled={disabled}
          isChecked={isChecked}
          isVisible={isVisible}
          handleChange={handleChange}
        />
      ))}
    </FormGroup>
  );
}
