import * as React from 'react';
import {
  styled,
  Box,
  Button,
} from '@mui/material'
import { TrashIcon, FlagIcon } from '../../../../icons';

const MenuContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 3, 2),
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  '.MuiButton-root': {
    justifyContent: 'flex-start',
    padding: theme.spacing(2, 3),
    '.MuiButton-endIcon': {
      marginLeft: 'auto',
    },
  },

}));

export default function SecondaryLang({ setTemplateData }) {
  const handleRemoveSecondaryLang = () => {
    setTemplateData((data) => ({
      ...data,
      secondaryLang: '',
    }));
  };
  const handleMakeSecondaryLangPrimary = () => {
    setTemplateData((data) => ({
      ...data,
      primaryLang: data.secondaryLang,
      secondaryLang: data.primaryLang,
    }));
  };
  return (
    <MenuContainer>
      <Button startIcon={<FlagIcon />} onClick={handleMakeSecondaryLangPrimary}>
        Mark as primary
      </Button>
      <Button startIcon={<TrashIcon />} onClick={handleRemoveSecondaryLang}>
        Remove
      </Button>
    </MenuContainer>
  );
}
