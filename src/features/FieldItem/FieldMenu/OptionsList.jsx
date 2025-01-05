import React, { memo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import {
  Box,
  Switch,
  Input,
  IconButton,
} from '@mui/material';
import { DndIcon, CrossIcon } from '../../../icons';

//Consider using React.memo to avoid unnecessary re-renders.
const Content = memo(({ option, index, handleSwitchChange, handleTitleChange, handleCodeChange, handleRemoveOption }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb:2, mt:2 }}>
    <IconButton disableRipple sx={{ cursor: 'grab' }}>
      <DndIcon sx={{ fontSize: 14 }} />
    </IconButton>
    <Switch
      onChange={() => handleSwitchChange(index, option.isVisible)}
      checked={option.isVisible}
    />
    <Input
      value={option.title}
      onChange={(e) => handleTitleChange(e, index)}
      sx={{ mx: 2.5, flex: 1 }}
    />
    <Input
      value={option.code}
      onChange={(e) => handleCodeChange(e, index)}
      sx={{ flex: '0 98px' }}
    />
    <IconButton
      onClick={() => handleRemoveOption(index)}
      sx={{ ml: 2.5 }}
      variant="rounded"
      color="error">
      <CrossIcon />
    </IconButton>
  </Box>
));

Content.displayName = "ContentComponent";

export default function OptionsList({ language, setLanguage, langSaveTo }) {
  const handleSwitchChange = (idx, isVisible) =>
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: langs[langSaveTo].options.map((opt, i) => (i === idx ? { ...opt, isVisible: !isVisible } : opt)),
      },
    }));

  const handleTitleChange = (e, idx) =>
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: langs[langSaveTo].options.map((opt, i) => (i === idx ? { ...opt, title: e.target.value } : opt)),
      },
    }));

  const handleCodeChange = (e, idx) =>
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: langs[langSaveTo].options.map((opt, i) => (i === idx ? { ...opt, code: e.target.value } : opt)),
      },
    }));

  const handleRemoveOption = (idx) =>
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: langs[langSaveTo].options.filter((x, i) => i !== idx),
      },
    }));


  // fixedItemHeight is optional
  // Can be used to improve performance if the rendered items are of known size.
  // Setting it causes the component to skip item measurements.
  // more in API https://virtuoso.dev/virtuoso-api-reference/
  return (
    <Virtuoso
      style={{ height: "344px" }}
      data={language[langSaveTo].options}
      fixedItemHeight={40}
      itemContent={(index, option) =>
        <Content
          index={index}
          option={option}
          handleSwitchChange={handleSwitchChange}
          handleCodeChange={handleCodeChange}
          handleTitleChange={handleTitleChange}
          handleRemoveOption={handleRemoveOption}
        />
      }
    />
  );
}
