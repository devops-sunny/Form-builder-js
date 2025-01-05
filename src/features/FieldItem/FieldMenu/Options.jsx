import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import _ from 'lodash';
import {
  Box,
  Button,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { PlusIcon } from '../../../icons';

import OptionsModal from './OptionsModal';
import OptionsList from './OptionsList';

export default function Options({
  language,
  setLanguage,
  langSaveTo,
  anotherLang,
}) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);
  const [isAsc, setIsAsc] = useState(false);

  const handleAddOption = () => {
    const id = nanoid();
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: [
          ...langs[langSaveTo].options,
          {
            id,
            title: `Option ${langs[langSaveTo].options.length + 1}`,
            code: '',
            selectedId: '',
            isVisible: true,
            isChecked: false,
          }
        ]
      },
      ...(anotherLang && {
        [anotherLang]: {
          ...langs[anotherLang],
          options: [
            ...langs[anotherLang].options,
            {
              id,
              title: `Option ${langs[anotherLang].options.length + 1}`,
              code: '',
              selectedId: '',
              isVisible: true,
              isChecked: false,
            }
          ]
        }
      })
    }))
  };
  const handleSorting = () => {
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        options: _.orderBy(langs[langSaveTo].options, ['title'], [isAsc ? 'asc' : 'desc']),
      },
    }));
    setIsAsc((asc) => !asc);
  };

  return (
    <Box>
      <Box display="flex" sx={{ mt: 2 }}>
        <Box display="flex" alignItems="center" sx={{ mr: 'auto' }}>
          <Typography variant="caption" weight="regular" color="dark.main">
            Options
          </Typography>
          <Typography variant="caption" weight="regular" sx={{ mx: 1 }}>
            •
          </Typography>
          <Typography variant="caption" weight="regular">
            {language[langSaveTo].options.length}
          </Typography>
        </Box>
        <Button onClick={handleSorting} variant="ghost" size="s">
          <Typography
            variant="caption"
            align="center"
            sx={{ cursor: 'pointer', color: 'dark.$80' }}>
            Sort by {isAsc ? 'AZ' : 'ZA'}
          </Typography>
        </Button>
        <IconButton
          onClick={handleAddOption}
          variant="rounded"
          color="secondary"
          sx={{ mx: 1 }}>
          <PlusIcon color="light.main" />
        </IconButton>
        <OptionsModal anotherLang={anotherLang} setLanguage={setLanguage} langSaveTo={langSaveTo} />
      </Box>
      <Divider sx={{ mt: 1 }} />
      <OptionsList language={language} setLanguage={setLanguage} langSaveTo={langSaveTo} />
    </Box>
  );
}
