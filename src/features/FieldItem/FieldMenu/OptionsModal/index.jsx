import React, { useState } from 'react';
import {
  Backdrop,
  Input,
  Box,
  Modal,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { customAlphabet } from 'nanoid';
import { CrossIcon, FolderOpenIcon } from '../../../../icons';
import Fade from '../../../../components/Fade';
import OptionModalList from './OptionModalList';

export default function OptionsModal({
  setLanguage,
  langSaveTo,
  anotherLang,
}) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [multilineValue, setMultilineValue] = useState('');

  const handleMultilineChange = (e) => {
    setMultilineValue(e.target.value);
  };
  const handleSave = () => {
    if (multilineValue === '') {
      handleClose();
      return;
    }
    const mArr = multilineValue.split('\n').map((title) => ({
      id: nanoid(),
      title,
      code: '',
      isVisible: true,
      isChecked: false,
    }));

    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: [...langs[langSaveTo].options, ...mArr],
      },
      ...(anotherLang && {
        [anotherLang]: {
          ...langs[anotherLang],
          options: [...langs[anotherLang].options, ...mArr],
        } }),
    }));
    handleClose();
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="rounded"
        color="secondary"
      >
        <FolderOpenIcon />
      </IconButton>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            top: '50%',
            left: '50%',
            display: 'flex',
            flexDirection: 'column',
            px: 6,
            pt: 5,
            pb: '17px',
            minWidth: 700,
            background: (theme) => theme.palette.light.main,
          }}>
            <Box display="flex" justifyContent="space-between" flexItem sx={{ mb:4 }}>
              <Typography variant="h3">
                Import existing list
              </Typography>
              <IconButton>
                <CrossIcon onClick={handleClose} />
              </IconButton>
            </Box>
            <Box display="flex" style={{
              overflowY: 'auto',
              maxHeight: '57vh'
            }}>
              <OptionModalList setMultilineValue={setMultilineValue}/>
              <Input rows={5} onChange={handleMultilineChange} value={multilineValue} fullWidth multiline placeholder="Add your custom choices"/>
            </Box>
            <Box display="flex" justifyContent="flex-end" flexItem sx={{ mt:4, mr:6, mb:4 }}>
              <Button onClick={handleClose} variant="ghost" size="m" sx={{ mr:1 }}>Discard</Button>
              <Button onClick={handleSave} variant="secondary" size="m">Add options</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
