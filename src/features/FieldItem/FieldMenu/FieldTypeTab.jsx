import React from 'react';
import {
  styled,
  Box,
  TextField,
  Select,
  IconButton,
  FormControl,
  FormHelperText,
  MenuItem,
  Switch,
  Icon,
  Typography,
  Divider,
} from '@mui/material';
import _ from 'lodash';
import { MoreIcon, CornerDownIcon } from '../../../icons';
import ToggleLanguageButtons from './ToggleLanguageButtons';
import Options from './Options';
import Description from './Description';
import { countries } from '../../../data/countries';
import { fileFormats } from '../../../data/fileFormats';

const InputOptionBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  & > .MuiTypography-root {
    flex: 0 112px;
    margin-right: 8px;
  }
  & > .MuiBox-root {
    flex: 1;
  }
`;

export default function FieldTypeTab({
  cardItem,
  fieldsItems,
  templateData,
  langSaveTo,
  setLangSaveTo,
  anotherLang,
  language,
  setLanguage,
  inputType,
  maxFileSize,
  isVisible,
  charMax,
  charMin,
  rowMax,
  rowMin,
  setCharMax,
  setCharMin,
  isDrawAllowed,
  isUploadAllowed,
  phoneCountriesValue,
  allowedFileFormatsArray,
  phoneDefaultCountriesArray,
  isPhoneMaskChecked,
  setRowMax,
  setRowMin,
  currencyValue,
  fieldCode,
  fileQuantityLimitation,
  setPhoneCountriesValue,
  setPhoneDefaultCountryValue,
  setIsPhoneMaskChecked,
  setCurrencyValue,
  setIsVisible,
  setInputType,
  setMaxFileSize,
  setIsDrawAllowed,
  setIsUploadAllowed,
  isTitleInteracted,
  isPlaceholderIneteracted,
  setIsTitleInteracted,
  setIsPlaceholderInteracted,
  setFileQuantityLimitation,
  setAllowedFileFormatsArray,
  setFieldCode,
}) {
  const handleIsDrawAllowed = () =>
    setIsDrawAllowed((isDraw) => !isDraw);

  const handleIsUploadAllowed = () =>
    setIsUploadAllowed((isUpload) => !isUpload);

  const handlePhoneMaskChange = () =>
    setIsPhoneMaskChecked((prev) => !prev);

  const handleFileQuantityLimitation = ({ target: { value } }) =>
    setFileQuantityLimitation(value);

  const handleMaxFileSizeChange = ({ target: { value } }) =>
    setMaxFileSize(value);

  const handlePhoneCountryChange = ({ target: { value } }) =>
    setPhoneCountriesValue(value);

  const handleAllowedFileFormatsChange = ({ target: { value } }) =>
    setAllowedFileFormatsArray(value);

  const handlePhoneDefaultCountryChange = ({ target: { value } }) =>
    setPhoneDefaultCountryValue(value);

  const handleFieldCodeChange = ({ target: { value } }) =>
    setFieldCode(value);

  const handleCurrencyChange = ({ target: { value } }) =>
    setCurrencyValue(value);

  const handleInputMinChange = ({ target: { value } }) =>
    setCharMin(value);

  const handleInputMaxChange = ({ target: { value } }) =>
    setCharMax(value);

  const handleRowMinChange = ({ target: { value } }) =>
    setRowMin(value);

  const handleRowMaxChange = ({ target: { value } }) =>
    setRowMax(value);

  const handleButtonLabelChange = ({ target: { value } }) => {
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        buttonLabel: value,
      }
    }))
  };

  const handlePlaceholderChange = ({ target: { value } }) => {
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        placeholder: value,
      }
    }))
    if (!isPlaceholderIneteracted) setIsPlaceholderInteracted(true);
  };

  const handleNameChange = ({ target: { value } }) => {
    setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        title: value,
      }
    }))
    if (!isTitleInteracted) setIsTitleInteracted(true);
  };

  const handleCardVisibilityChange = () =>
    setIsVisible((isVis) => !isVis);

  const handleInputTypeChange = ({ target: { value } }) => {
    setInputType(value);
    if (!isTitleInteracted) setLanguage((langs) => ({
      ...langs,
      [langSaveTo]: {
        ...langs[langSaveTo],
        title: fieldsItems[value].languages[langSaveTo].title,
      }
    }));
    if (!isPlaceholderIneteracted)
      setLanguage((langs) => ({
        ...langs,
        [langSaveTo]: {
          ...langs[langSaveTo],
          placeholder: fieldsItems[value].languages[langSaveTo].placeholder,
        }
      }))
  };

  return (
    <>
      {templateData.secondaryLang
       && <>
         <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
           <Typography variant="caption" lh="rich" weight="medium" color="dark.$60" align="center">
             Add data for each language
           </Typography>
           <IconButton>
             <MoreIcon />
           </IconButton>
         </Box>
         <ToggleLanguageButtons langSaveTo={langSaveTo} setLangSaveTo={setLangSaveTo} templateData={templateData} />
       </>
      }

      <InputOptionBox sx={{ mt: 4 }}>
        <Typography variant="caption" align="center">
          Input Type
        </Typography>
        <Box component={FormControl}>
          <Select
            displayEmpty
            fullWidth
            variant="standard"
            id="modal-input-type-select"
            IconComponent={CornerDownIcon}
            value={inputType}
            onChange={handleInputTypeChange}>
            {Object.entries(fieldsItems).filter(([,{ type }]) => type !== 'inline').map(([k, { languages, id, type, icon }]) => (
              <MenuItem key={id} value={type} name={k}>
                <Box display="flex" alignItems="center">
                  <Icon component={icon} />
                  {languages[templateData.primaryLang].title}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </InputOptionBox>
      <InputOptionBox>
        <Typography variant="caption" align="center">
          Label
        </Typography>
        <Box>
          <TextField onChange={handleNameChange} value={language[langSaveTo].title} sx={{ py: '2px' }} />
        </Box>
      </InputOptionBox>

      {!['radio', 'checkbox', 'attachment', 'signature'].includes(inputType) && (
        <InputOptionBox>
          <Typography variant="caption" align="center">
            Placeholder
          </Typography>
          <Box component={FormControl}>
            {inputType === 'select' ? (
              <Select
                fullWidth
                displayEmpty
                variant="standard"
                id="modal-placeholder-select"
                IconComponent={CornerDownIcon}
                value={language[langSaveTo].placeholder}
                onChange={handlePlaceholderChange}>
                <MenuItem value=''>
                  Select
                </MenuItem>
                {language[langSaveTo].options.map(({ id, title }) => (
                  <MenuItem key={id} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField value={language[langSaveTo].placeholder} onChange={handlePlaceholderChange} />
            )}
          </Box>
        </InputOptionBox>
      )}

      {['signature'].includes(inputType) && (
        <>
          <InputOptionBox sx={{ mt: 2.5 }}>
            <Typography variant="caption" align="center">
              Signature
            </Typography>
            <Switch
              checked={isDrawAllowed}
              onChange={handleIsDrawAllowed}
              sx={{ alignSelf: 'center', mr: 2.5 }}
              inputProps={{ 'aria-label': 'controlled-card-item-switch' }}
            />
            <Typography variant="body13" align="center" color="dark.main">
              Allow handdrawing
            </Typography>
          </InputOptionBox>
          <InputOptionBox>
            <Typography variant="caption">{' '}</Typography>
            <Box display="flex" alignItems="center" flexItem sx={{ mt: 2 }}>
              <Switch
                checked={isUploadAllowed}
                onChange={handleIsUploadAllowed}
                sx={{ mr: 2.5 }} />
              <Typography>
                Allow signature file upload
              </Typography>
            </Box>
          </InputOptionBox>
        </>
      )}

      {['attachment'].includes(inputType) && (
        <>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Button Label
            </Typography>
            <Box>
              <TextField onChange={handleButtonLabelChange} value={language[langSaveTo].buttonLabel} sx={{ py: '2px' }} />
            </Box>
          </InputOptionBox>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Allowed formats
            </Typography>
            <Box component={FormControl}>
              <Select
                displayEmpty
                multiple
                variant="standard"
                id="formats-multiselect"
                IconComponent={CornerDownIcon}
                value={allowedFileFormatsArray}
                onChange={handleAllowedFileFormatsChange}>
                <MenuItem value=''>
                  Select formats
                </MenuItem>
                {Object.entries(fileFormats).map(([k,v]) => (
                  <MenuItem key={k} value={v.fileType}>
                    {k.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </InputOptionBox>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Max file size | KB
            </Typography>
            <Box>
              <TextField onChange={handleMaxFileSizeChange} value={maxFileSize} sx={{ py: '2px' }} />
            </Box>
          </InputOptionBox>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Limit file quantity
            </Typography>
            <Box component={FormControl}>
              <Select
                displayEmpty
                fullWidth
                variant="standard"
                id="file-quantity-select"
                IconComponent={CornerDownIcon}
                value={fileQuantityLimitation}
                onChange={handleFileQuantityLimitation}>
                <MenuItem value=''>
                  Unlimited
                </MenuItem>
                {_.range(1, 11).map((k) => (
                  <MenuItem key={k} value={k}>
                    {k}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </InputOptionBox>
        </>
      )}

      {['phone'].includes(inputType) && (
        <>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Allowed countries
            </Typography>
            <Box component={FormControl}>
              <Select
                displayEmpty
                multiple
                variant="standard"
                id="currency-select"
                IconComponent={CornerDownIcon}
                value={phoneCountriesValue}
                onChange={handlePhoneCountryChange}>
                <MenuItem value=''>
                  Select countries
                </MenuItem>
                {countries.map((c) => (
                  <MenuItem key={c.name} value={c}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </InputOptionBox>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Default country
            </Typography>
            <Box component={FormControl}>
              <Select
                displayEmpty
                fullWidth
                variant="standard"
                id="currency-select"
                IconComponent={CornerDownIcon}
                value={phoneDefaultCountriesArray}
                onChange={handlePhoneDefaultCountryChange}>
                <MenuItem value=''>
                  Select
                </MenuItem>
                {countries.map((c) => (
                  <MenuItem key={c.name} value={c}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </InputOptionBox>
          <InputOptionBox sx={{ mt:3 }}>
            <Typography variant="caption" align="center">
              Mask format
            </Typography>
            <Box display="flex">
              <Switch checked={isPhoneMaskChecked}  onChange={handlePhoneMaskChange} sx={{ mr: 2 }}  />
              <Typography>Use phone mask</Typography>
            </Box>
          </InputOptionBox>

          <InputOptionBox>
            <Typography variant="caption" align="center">{' '}</Typography>
          </InputOptionBox>
          <Divider sx={{ mt:6, mb:3, mx: -6 }}/>
        </>
      )}

      {['salary'].includes(inputType) && (
        <>
          <InputOptionBox>
            <Typography variant="caption" align="center">
              Currency
            </Typography>
            <Box component={FormControl}>
              <Select
                displayEmpty
                fullWidth
                variant="standard"
                id="currency-select"
                IconComponent={CornerDownIcon}
                value={currencyValue}
                onChange={handleCurrencyChange}>
                <MenuItem value=''>
                  Select currency
                </MenuItem>
                {countries.map((c) => (
                  <MenuItem key={c.name} value={c}>
                    {c.currency}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </InputOptionBox>
          <Divider sx={{ mt:6, mb:3, mx: -6 }}/>
        </>
      )}

      {(['input', 'multiline', 'salary', 'number', 'phone'].includes(inputType)) && (
        <InputOptionBox>
          <Typography variant="caption" align="center" sx={{ pb:4 }}>
            Characters limit
          </Typography>
          <Box component={FormControl} variant="standard" sx={{ mr:2 }}>
            <TextField
              id="max-char-input-settings"
              value={charMin}
              onChange={handleInputMinChange}
              aria-describedby="min-input-settings-text"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                'aria-label': 'Min',
              }}
            />
            <FormHelperText id="min-input-settings-text">Min</FormHelperText>
          </Box>
          <Box component={FormControl}>
            <TextField
              id="min-char-input-settings"
              value={charMax}
              onChange={handleInputMaxChange}
              aria-describedby="max-input-settings-text"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                'aria-label': 'Max',
              }}
            />
            <FormHelperText id="max-input-settings-text" sx={{ m:0 }}>Max</FormHelperText>
          </Box>
        </InputOptionBox>
      )}

      {['multiline'].includes(inputType) && (
        <InputOptionBox>
          <Typography variant="caption" align="center" sx={{ pb:4 }}>
            Rows limit
          </Typography>
          <Box component={FormControl} variant="standard" sx={{ mr:2 }}>
            <TextField
              id="min-rows-input-settings"
              value={rowMin}
              onChange={handleRowMinChange}
              aria-describedby="min-row-settings-text"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                'aria-label': 'row-min',
              }}
            />
            <FormHelperText id="min-row-settings-text">Min</FormHelperText>
          </Box>
          <Box component={FormControl}>
            <TextField
              id="min-rows-input-settings"
              value={rowMax}
              onChange={handleRowMaxChange}
              aria-describedby="max-row-settings-text"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                'aria-label': 'row-max',
              }}
            />
            <FormHelperText id="max-row-settings-text">Max</FormHelperText>
          </Box>
        </InputOptionBox>
      )}

      {cardItem.description !== '' && (<Description description={cardItem.description} />)}

      {['select', 'radio', 'checkbox'].includes(inputType) && (<Options setLanguage={setLanguage} language={language} langSaveTo={langSaveTo} anotherLang={anotherLang} />)}

      <Divider sx={{ mx: -6, mb: 4, mt: 1 }} />
      <InputOptionBox>
        <Typography variant="caption" align="center">
          Field code
        </Typography>
        <Box>
          <TextField value={fieldCode} onChange={handleFieldCodeChange} />
        </Box>
      </InputOptionBox>
      <Divider sx={{ mx: -6, mb: 4, mt: 1 }} />
      <InputOptionBox>
        <Typography variant="caption" align="center">
          Visibility
        </Typography>
        <Switch
          checked={isVisible}
          onChange={handleCardVisibilityChange}
          sx={{ alignSelf: 'center', mr: 2.5 }}
          inputProps={{ 'aria-label': 'controlled-card-item-switch' }}
        />
        <Typography variant="body13" align="center" color="dark.main">
          Active
        </Typography>
      </InputOptionBox>
    </>
  );
}
