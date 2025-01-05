import React from 'react';
import {
  Box,
  Typography,
  Switch,
  Divider,
} from '@mui/material';
import EditorPanelButton from '../../../components/EditorPanelButton';
import Popover from '../../../components/Popover';
import TypographyMenuContent from './TypographyMenuContent';

export default function Customizing({ fieldsItems, setFieldsItems }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: (theme) => theme.spacing(4, 4, 4, 5),
      }}>
        <Typography variant="body13rich">
          Branding section on the document
        </Typography>
        <Switch />
      </Box>
      <Divider />
      <Popover
        styles={{ minWidth: 340 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        title="Define typography for headings">
        <EditorPanelButton title="Headings">
          <Typography variant="body13rich">{Object.values(fieldsItems).filter((f) => f.type === 'inline').map((x) => x.style.fontSize).join(', ')}</Typography>
        </EditorPanelButton>
        <TypographyMenuContent fieldsItems={fieldsItems} setFieldsItems={setFieldsItems}/>
      </Popover>
      {/* <Popover */}
      {/*   styles={{minWidth: 340}} */}
      {/*   anchorOrigin={{ */}
      {/*     vertical: 'center', */}
      {/*     horizontal: 'right', */}
      {/*   }} */}
      {/*   transformOrigin={{ */}
      {/*     vertical: 'top', */}
      {/*     horizontal: 'left', */}
      {/*   }} */}
      {/*   title="Define typography for inputs"> */}
      {/*   <EditorPanelButton name="Inputs"> */}
      {/*     <Typography variant="body13rich">Arial, 14</Typography> */}
      {/*   </EditorPanelButton> */}
      {/*   <TypographyMenuContent fieldsItems={fieldsItems} setFieldsItems={setFieldsItems}/> */}
      {/* </Popover> */}
    </Box>
  );
}
