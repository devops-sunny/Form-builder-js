import * as React from 'react';
import {
  styled,
  Box,
  Button,
} from '@mui/material'
import { CheckIcon } from '../../../../icons';

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

export default function SecondaryLang({ templateData, setTemplateData }) {
  const handleSecondaryLang = (secondaryLang) => {
    setTemplateData((data) => ({
      ...data,
      secondaryLang,
    }))
  };
  return (
    <MenuContainer>
      {Object.entries(templateData.languages).filter(([k,]) => templateData.primaryLang !== k ).map(([k, { name }]) =>
        <Button key={`templateDataLanguagesKey${k}`} startIcon={templateData.secondaryLang === k ? <CheckIcon /> : <Box sx={{ width: 20, height: 20 }} />} onClick={() => handleSecondaryLang(k)}>
          {`${name} (${k.toUpperCase()})`}
        </Button>
      )}
    </MenuContainer>
  );
}
