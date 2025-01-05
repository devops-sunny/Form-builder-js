import * as React from 'react';
import {
  styled,
  Box,
  Divider,
  Chip,
  Button,
} from '@mui/material'
import AddSecondaryLanguageMenuContent from './AddSecondaryLanguageMenuContent';
import SecondaryLanguageMenuContent from './SecondaryLanguageMenuContent';
import Popover from '../../../../components/Popover';
import { PlusIcon, CornerRightIcon } from '../../../../icons';

const MenuContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 3, 2),
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  '& .MuiButton-root': {
    justifyContent: 'flex-start',
    padding: theme.spacing(3, 5),
    '.MuiButton-endIcon': {
      marginLeft: 'auto',
    },
  },
}));

export default function LanguageMenuContent({ templateData, setTemplateData }) {
  const primary = templateData.languages[templateData.primaryLang];
  const secondary = templateData.languages[templateData.secondaryLang];
  const handleFieldsItems = (e) => e.preventDefault();
  return (
    <MenuContainer>
      <Button startIcon={<div>{primary.icon}</div>} onClick={handleFieldsItems}>
        {`${primary.name} (${templateData.primaryLang.toUpperCase()})`} <Chip variant="xs" radius="sharp" label="Primary" sx={{ ml: 2 }} />
      </Button>
      {templateData.secondaryLang
       && <Popover
         styles={{ minWidth: 232 }}
         anchorOrigin={{
           vertical: 'center',
           horizontal: 'right',
         }}
         transformOrigin={{
           vertical: 'top',
           horizontal: 'left',
         }}>
         <Button startIcon={<div>{secondary.icon}</div>} endIcon={<CornerRightIcon />} onClick={handleFieldsItems}>
           {`${secondary.name} (${templateData.secondaryLang.toUpperCase()})`}
         </Button>
         <SecondaryLanguageMenuContent templateData={templateData} setTemplateData={setTemplateData}/>
       </Popover>
      }
      <Divider sx={{ my: 2 }} />
      <Popover
        styles={{ minWidth: 232 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        title="Select secondary language">
        <Button startIcon={<PlusIcon />} endIcon={<CornerRightIcon />}>
          Add language
        </Button>
        <AddSecondaryLanguageMenuContent templateData={templateData} setTemplateData={setTemplateData}/>
      </Popover>
    </MenuContainer>
  );
}
