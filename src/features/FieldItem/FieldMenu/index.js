import * as React from 'react';
import {
  styled,
  Popover,
  Box,
  ButtonGroup,
  Typography,
  Tab,
  Tabs,
  Button,
} from '@mui/material';
import { TrashIcon, CheckIcon } from '../../../icons';
import RulesTab from './RulesTab';
import FieldTypeTab from './FieldTypeTab';

function TabPanel({ children, value, index, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 6,
        pt: 3,
        pb: '17px',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && children}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    sx: {
      alignItems: 'flex-start',
      minWidth: 'fit-content',
      p: 0,
      mr: 6,
    },
    disableRipple: true,
  };
}

const Menu = styled((props) => (
  <Popover
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 410,
    maxWidth: 410,
    boxShadow: '0px 4px 13px 0px #090B2114, 0px 0px 2px 0px #10111E33',
  },
}));

export default function CardSettingsMenu({
  children,
  cardId,
  containerId,
  templateData,
  dataSectionItems,
  setDataSectionItems,
  fieldsItems,
  handleRoleChange,
  fillBy,
}) {
  // select card item from all cards(fields)
  const cardItem = React.useMemo(
    () => dataSectionItems[containerId].items.find((x) => x.id === cardId),
    [cardId]
  );
  // main tab position
  const [tab, setTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isOpen = Boolean(anchorEl);

  const [langSaveTo, setLangSaveTo] = React.useState(templateData.primaryLang);
  const anotherLang
    = langSaveTo === templateData.primaryLang
      ? templateData.secondaryLang
      : templateData.primaryLang;

  // multiple languages fields
  const [language, setLanguage] = React.useState({
    [templateData.primaryLang]: cardItem.languages[templateData.primaryLang],
    [templateData.secondaryLang]: cardItem.languages[templateData.secondaryLang],
  });
  // TODO refactor, make one state from all props except lang and isActive
  // general
  const [inputType, setInputType] = React.useState(cardItem.type);
  // attachment
  const [allowedFileFormatsArray, setAllowedFileFormatsArray] = React.useState(
    cardItem.attachmentAllowedFileFormats
  );
  const [maxFileSize, setMaxFileSize] = React.useState(cardItem.maxFileSize);
  const [fileQuantityLimitation, setFileQuantityLimitation] = React.useState(
    cardItem.fileQuantityLimitation
  );
  // signature
  const [isDrawAllowed, setIsDrawAllowed] = React.useState(cardItem.isDrawAllowed);
  const [isUploadAllowed, setIsUploadAllowed] = React.useState(
    cardItem.isUploadAllowed
  );
  // phone
  const [isPhoneMaskChecked, setIsPhoneMaskChecked] = React.useState(
    cardItem.isPhoneMaskChecked
  );
  const [phoneCountriesValue, setPhoneCountriesValue] = React.useState(
    cardItem.phoneAllowedCountries
  );
  const [phoneDefaultCountryValue, setPhoneDefaultCountryValue] = React.useState(
    cardItem.phoneDefaultCountry
  );
  // all numeric
  const [charMin, setCharMin] = React.useState(cardItem.charMin);
  const [charMax, setCharMax] = React.useState(cardItem.charMax);
  // multiline
  const [rowMin, setRowMin] = React.useState(cardItem.rowMax);
  const [rowMax, setRowMax] = React.useState(cardItem.rowMin);
  // currency
  const [currencyValue, setCurrencyValue] = React.useState(cardItem.currency);
  // UI
  const [isVisible, setIsVisible] = React.useState(cardItem.isVisible);

  const [isTitleInteracted, setIsTitleInteracted] = React.useState(false);
  const [isPlaceholderInteracted, setIsPlaceholderInteracted] = React.useState(false);
  const [fieldCode, setFieldCode] = React.useState(cardItem.code);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleTabChange = (e, value) => setTab(value);

  React.useEffect(() => {
    setLanguage(() => ({
      [templateData.primaryLang]: cardItem.languages[templateData.primaryLang],
      [templateData.secondaryLang]: cardItem.languages[templateData.secondaryLang],
    }));
  }, [templateData.secondaryLang, templateData.primaryLang]);

  const handleSave = () => {
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((item) =>
          item.id === cardId
            ? {
              ...item,
              isActive: item.isActive && isVisible,
              languages: {
                ...item.languages,
                ...language,
              },
              type: inputType,
              code: fieldCode,
              isPhoneMaskChecked,
              attachmentAllowedFileFormats: allowedFileFormatsArray,
              phoneAllowedCountries: phoneCountriesValue,
              phoneDefaultCountry: phoneDefaultCountryValue,
              currency: currencyValue,
              fileQuantityLimitation,
              maxFileSize,
              isDrawAllowed,
              isUploadAllowed,
              isVisible,
              charMax,
              charMin,
              rowMin,
              rowMax,
            }
            : item
        ),
      },
    }));
    handleClose();
  };
  const handleRemove = () => {
    handleClose();
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.filter((x) => x.id !== cardId),
      },
    }));
  };
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      {React.cloneElement(children, {
        id: 'settings-card-item-button',
        'aria-controls': isOpen ? 'settings-card-item-menu' : undefined,
        'aria-haspopup': true,
        'aria-expanded': isOpen ? 'true' : undefined,
        variant: 'contained',
        onClick: handleOpen,
      })}
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={{ width: '100%' }}>
          <Tabs value={tab} onChange={handleTabChange} aria-label="fields">
            <Tab label="Field type" {...a11yProps(0)} />
            {/* <Tab label="Rules" {...a11yProps(1)} /> */}
          </Tabs>
          <TabPanel value={tab} index={0}>
            <FieldTypeTab
              fieldsItems={fieldsItems}
              templateData={templateData}
              langSaveTo={langSaveTo}
              anotherLang={anotherLang}
              cardItem={cardItem}
              charMax={charMax}
              charMin={charMin}
              isVisible={isVisible}
              inputType={inputType}
              rowMax={rowMax}
              rowMin={rowMin}
              language={language}
              currencyValue={currencyValue}
              maxFileSize={maxFileSize}
              fileQuantityLimitation={fileQuantityLimitation}
              isPhoneMaskChecked={isPhoneMaskChecked}
              isDrawAllowed={isDrawAllowed}
              isUploadAllowed={isUploadAllowed}
              isTitleInteracted={isTitleInteracted}
              isPlaceholderInetracted={isPlaceholderInteracted}
              allowedFileFormatsArray={allowedFileFormatsArray}
              phoneCountriesValue={phoneCountriesValue}
              phoneDefaultCountryValue={phoneDefaultCountryValue}
              fieldCode={fieldCode}
              setLangSaveTo={setLangSaveTo}
              setCharMax={setCharMax}
              setCharMin={setCharMin}
              setRowMax={setRowMax}
              setRowMin={setRowMin}
              setMaxFileSize={setMaxFileSize}
              setIsDrawAllowed={setIsDrawAllowed}
              setIsUploadAllowed={setIsUploadAllowed}
              setFileQuantityLimitation={setFileQuantityLimitation}
              setPhoneCountriesValue={setPhoneCountriesValue}
              setPhoneDefaultCountryValue={setPhoneDefaultCountryValue}
              setIsPhoneMaskChecked={setIsPhoneMaskChecked}
              setInputType={setInputType}
              setLanguage={setLanguage}
              setIsVisible={setIsVisible}
              setCurrencyValue={setCurrencyValue}
              setIsPlaceholderInteracted={setIsPlaceholderInteracted}
              setIsTitleInteracted={setIsTitleInteracted}
              setAllowedFileFormatsArray={setAllowedFileFormatsArray}
              setFieldCode={setFieldCode}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <RulesTab handleRoleChange={handleRoleChange} fillBy={fillBy} />
          </TabPanel>
        </Box>
        <ButtonGroup disableElevation variant="modal">
          <Button onClick={handleRemove}>
            <TrashIcon />
            <Typography>Remove</Typography>
          </Button>
          <Button onClick={handleSave}>
            <CheckIcon />
            <Typography>Save changes</Typography>
          </Button>
        </ButtonGroup>
      </Menu>
    </Box>
  );
}
