import React, { useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Typography,
  Select,
  MenuItem,
} from '@mui/material'
import { CornerDownIcon } from '../../../icons';
import IconButtonGroup from '../../../components/IconsButtonGroup';
import { alignList, textModificationList } from '../../../data/iconButtonLists';

export default function TypographyMenuContent({ item, setFieldsItems }) {
  const currentType = item.style.type.toLowerCase();
  const [fontFamily, setFontFamily] = useState(item.style.fontFamily);
  const [fontSize, setFontSize] = useState(item.style.fontSize);

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
    setFieldsItems((items) => ({
      ...items,
      [currentType]: {
        ...item,
        style: {
          ...item.style,
          fontFamily: e.target.value,
        },
      },
    }));
  };
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    setFieldsItems((items) => ({
      ...items,
      [currentType]: {
        ...item,
        style: {
          ...item.style,
          fontSize: e.target.value,
        },
      },
    }));
  };

  const handleAlignment = (textAlign) => setFieldsItems((items) => ({
    ...items,
    [currentType]: {
      ...item,
      style: {
        ...item.style,
        textAlign,
      },
    },
  }));
  const handleTextStyle = (textDecoration) => setFieldsItems((items) => ({
    ...items,
    [currentType]: {
      ...item,
      style: {
        ...item.style,
        textDecoration,
      },
    },
  }));

  return (
    <Box sx={{ px: 5, py: 3 }}>
      <Box className="settings-item-box">
        <Typography variant="caption">
          Font
        </Typography>
        <Box>
          <Select
            fullWidth
            variant="standard"
            id="font-select"
            IconComponent={CornerDownIcon}
            value={fontFamily}
            onChange={handleFontChange}>
            {['Arials', 'IBM Plex Sans Arabic', 'Helvetica', 'Times New Roman', 'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Didot'].map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box className="settings-item-box">
        <Typography variant="caption">
          Font size
        </Typography>
        <Box>
          <Select
            fullWidth
            variant="standard"
            id="modal-input-type-select"
            IconComponent={CornerDownIcon}
            value={fontSize}
            onChange={handleFontSizeChange}>
            {_.range(10, 48, 2).map((x) =>
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            )}
          </Select>
        </Box>
      </Box>
      <Box className="settings-item-box">
        <Typography variant="caption">
          Alignment
        </Typography>
        <IconButtonGroup
          isExclusive
          setValue={handleAlignment}
          list={alignList}
          defaultValue={alignList[0].value}
        />
      </Box>
      <Box className="settings-item-box">
        <Typography variant="caption">
          Text style
        </Typography>
        <IconButtonGroup setValue={handleTextStyle} list={textModificationList} />
      </Box>
    </Box>
  );
}
