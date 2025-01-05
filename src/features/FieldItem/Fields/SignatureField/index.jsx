import * as React from 'react';
import { Box, SvgIcon, CardMedia } from '@mui/material';
import Popover from '../../../../components/Popover';
import SignatureMenu from './SignatureMenu';
import { toBase64 } from '../../../../utils/helpers/toBase64';

// eslint-disable-next-line react/display-name
export default React.memo(({
  handleSetValue,
  initialValue,
  isDrawAllowed,
  isUploadAllowed,
  disabled,
}) => {
  const [signature, setSignature] = React.useState(initialValue);

  // TODO figure out disabled and encryption
  const handleSignature = React.useCallback(async (file) => {
    if (file instanceof File) {
      const base64File = await toBase64(file);
      setSignature(base64File);
    } else 
      setSignature(file);

    handleSetValue(signature);
  }, []);

  return (
    <Popover
      styles={{ minWidth: 826 }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      title="">
      <Box
        sx={{
          mt: 4,
          maxHeight: 124,
          minHeight: 124,
          maxWidth: 284,
          minWidth: 284,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: disabled ? 'none' : '',
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: 1.5,
          outline: (theme) => `1px solid ${theme.palette.dark.$a8}`,
          '&:hover': {
            outline: (theme) => `2px solid ${theme.palette.secondary.$80}`,
          },
        }}
        onClick={handleSignature}>
        {!signature ? (
          <SvgIcon sx={{ fontSize: 84 }} inheritViewBox>
            <svg width="82" height="74" viewBox="0 0 82 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.47443 36.9999C7.91572 -2.87086 10.8436 -2.87086 10.258 36.9999C9.76489 64.2799 12.6928 64.2799 19.0416 36.9999C25.4829 9.71991 28.4107 9.71991 27.8252 36.9999C27.0267 84.1199 29.9545 84.1199 36.6087 36.9999C43.05 -10.1201 45.9779 -10.1201 45.3923 36.9999C44.9537 60.4645 47.8816 60.4645 54.1759 36.9999C60.6172 13.5353 63.5451 13.5353 62.9595 36.9999C62.343 62.9445 65.2708 62.9445 71.7431 36.9999C78.1844 11.0553 81.1122 11.0553 80.5267 36.9999" stroke="#242533" strokeOpacity="0.2" strokeWidth="1.5"/>
            </svg>
          </SvgIcon>
        ) : (
          <CardMedia sx={{ width: 284, height: 124 }} component='img' src={signature} />
        )}
      </Box>
      <SignatureMenu isDrawAllowed={isDrawAllowed} isUploadAllowed={isUploadAllowed} handleSignature={handleSignature}/>
    </Popover>
  );
});
