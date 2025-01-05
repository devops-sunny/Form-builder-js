import * as React from "react";
import { styled } from '@mui/material';
import { fileFormats } from '../data/fileFormats';

export default React.memo(({ id, children, cb, multiple = true, matchFileType, fileQuantityLimit = '', fileSizeLimit = '', files }) => {
  const typesArray = React.useMemo(() => {
    if (Array.isArray(matchFileType) && matchFileType.length) 
      return matchFileType;
    
    return Object.values(fileFormats).map((t) => t.fileType);
  }, [matchFileType]);

  const handleFileInput = React.useCallback((e) => Array.from(e.target.files).forEach((file) =>
    (file instanceof File)
        && (fileSizeLimit === '' ? true : file.size < fileSizeLimit * 1024)
        && (fileQuantityLimit === '' ? true : e.target.files.length < fileQuantityLimit && files.length < fileQuantityLimit)
        && typesArray.includes(file.type) && cb(file)) || [], [typesArray, fileSizeLimit, fileQuantityLimit, files])

  return (
    <Label id={`${id}-drop-zone`} ondrop={handleFileInput} htmlFor={id}>
      {children}
      <input
        type="file"
        id={id}
        multiple={multiple}
        onChange={handleFileInput}
      />
    </Label>
  );
});

const Label = styled('label')`
display: flex;
height: 100%;
width: 100%;
justify-content: center;
align-items: center;
cursor: pointer;
input[type="file"] {
display: none;
}
`;
