import * as React from 'react';
import {
  alpha,
  styled,
  Box,
  RadioGroup,
  Typography,
  FormControlLabel,
  FormHelperText,
  Divider,
} from '@mui/material';
import Radio from '../../../../components/Radio';

const MenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: theme.spacing(2),
  ' .MuiFormHelperText-root': {
    marginTop: 0,
  },
  '.MuiFormControlLabel-root': {
    padding: theme.spacing(3),
    borderRadius: 8,
    alignItems: 'flex-start',
    '&:hover': {
      background: theme.palette.dark.$a4,
    },
    '.MuiFormControlLabel-label': {
      marginLeft: theme.spacing(2),
      display: 'flex',
      flex: 1,
    },
  }
}));

const GrayStripe = styled(Box)(({ theme }) => ({
  borderRadius: '34px',
  background: `${alpha(theme.palette.dark.main, 0.1)}`,
  height: '4px',
  marginRight: theme.spacing(1.5),
}));

function LabelText({ title, description, dir, templateData }) {
  return (
    <>
      <Box sx={{ mr: 'auto' }}>
        <Typography>
          {title}
        </Typography>
        <FormHelperText>
          {description}
        </FormHelperText>
      </Box>
      <Box
        display="flex"
        flexDirection={dir === 'row' ? 'row' : 'column'}
        sx={dir === 'row' ? { alignItems: 'flex-end' } : { justifyContent: 'flex-end' }}>
        <Box display="flex" flexDirection={dir !== 'row' ? 'row' : 'column'}>
          <Typography sx={dir !== 'column' ? { mb: 1.5 } : { mr: 6.5 }}>
            {templateData.primaryLang.toUpperCase()}
          </Typography>
          <Box display="flex" alignItems={dir === 'column' && 'center'} flexDirection={dir !== 'row' ? 'row' : 'column'}>
            <GrayStripe sx={{ width: 48, mb: dir === 'row' && 1.5 }} />
            <GrayStripe sx={{ width: 30 }} />
          </Box>
        </Box>
        {dir === 'row' && <Divider orientation="vertical" flexItem sx={{ ml: 2.5, mr: 4 }} />}
        <Box display="flex" flexDirection={dir !== 'row' ? 'row' : 'column'}>
          <Typography sx={dir !== 'column' ? { mb: 1.5 } : { mr: 6.5 }}>
            {templateData.secondaryLang.toUpperCase()}
          </Typography>
          <Box display="flex" alignItems={dir === 'column' && 'center'} flexDirection={dir !== 'row' ? 'row' : 'column'}>
            <GrayStripe sx={{ width: 30, mb: dir === 'row' && 1.5 }} />
            <GrayStripe sx={{ width: 48 }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default function TypographyMenuContent({ templateData, setTemplateData }) {
  const [radioValue, setRadioValue] = React.useState(templateData.layout);
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setRadioValue(value);
    setTemplateData((data) => ({
      ...data,
      layout: value,
    }));
  };
  return (
    <MenuContainer>
      <RadioGroup
        aria-labelledby="layout-radio-buttons-group"
        name="layout-radio-buttons-group"
        value={radioValue}
        onChange={handleRadioChange}>
        <FormControlLabel
          value="row"
          control={<Radio style={{ maxHeight: 20 }} />}
          label={<LabelText title="Side by side" dir="row" templateData={templateData} description="Two rows layout" />}
        />
        <FormControlLabel
          value="column"
          control={<Radio style={{ maxHeight: 20 }} />}
          label={<LabelText title="Vertical layout" dir="column" templateData={templateData} description="Two columns layout" />}
        />
      </RadioGroup>
    </MenuContainer>
  );
}
