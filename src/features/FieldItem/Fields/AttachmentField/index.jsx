import * as React from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { customAlphabet } from 'nanoid';
import { UploadIcon, FileBrandedIcon, MoreIcon } from '../../../../icons';
import FileUploader from '../../../../components/FileUploader';
import ListCard from '../../../../components/ListCard';
import FileMenu from './FileMenu';

export default function AttachmentField({
  handleSetValue,
  initialValue,
  allowedFormats,
  fileSizeLimit,
  fileQuantityLimit,
  buttonLabel,
  disabled,
}) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);
  const [files, setFiles] = React.useState(initialValue || []);

  const uniqueId = React.useMemo(() => nanoid(), [])

  const handleFileUpload = React.useCallback((file) => {
    if (file) {
      setFiles((prevFiles) => ([...prevFiles, [Date.now(), file]]))
      handleSetValue(files);
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" flex="1" sx={{ pointerEvents: disabled ? 'none' : '', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <Box sx={{ my: 2 }}>
        {files.map(([time, file]) => (
          <ListCard
            key={`${time}${file.lastModified}`}
            item={file}
            time={time}
            leftIcon={FileBrandedIcon}
            popoverIcon={MoreIcon}
            popoverBody={<FileMenu setFiles={setFiles} id={`${time}${file.lastModified}`} />} />
        ))}
      </Box>
      <FileUploader id={uniqueId} cb={handleFileUpload} matchFileType={allowedFormats} fileSizeLimit={fileSizeLimit} fileQuantityLimit={fileQuantityLimit} files={files}>
        <Box
          sx={{
            px: 6,
            py: 4,
            flex: 1,
            borderRadius: 1.5,
            border: (theme) => `1px dashed ${theme.palette.dark.$16}`,
          }}>
          <Typography weight="medium" sx={{ mb: 2 }}>
            Upload CV
          </Typography>
          <Button
            variant="primary"
            size="m"
            sx={{ pointerEvents: 'none', zIndex: 0, background: (theme) => theme.palette.primary.$80 }}
            startIcon={<UploadIcon />}>
            <Typography weight="medium" sx={{ mx: 2, color: (theme) => theme.palette.light.main }}>
              {buttonLabel}
            </Typography>
          </Button>
        </Box>
      </FileUploader>
    </Box>
  );
}

AttachmentField.displayName = 'AttachmentField';
