import * as React  from 'react';
import _ from 'lodash';
import {
  alpha,
  styled,
  Icon,
  Box,
  CardMedia,
  TextField,
  Button,
  Switch,
  Divider,
  Popover,
  FormGroup,
  Typography,
  ButtonGroup,
  FormControlLabel,
} from '@mui/material';
import Checkbox from '../../components/Checkbox';
import {
  DraggableCardIcon,
  TrashIcon,
  CheckIcon,
  UploadCloudIcon,
  RefreshIcon,
} from '../../icons';
import FileUploader from '../../components/FileUploader';
import { toBase64 } from '../../utils/helpers/toBase64';

const Menu = styled((props) => (
  <Popover
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
  // TODO shadows from theme
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 8,
    minWidth: 398,
    boxShadow: '0px 4px 13px 0px #090B2114, 0px 0px 2px 0px #10111E33',
    '& .MuiInputBase-root': {
      ...theme.typography.body13controls,
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
  '.MuiFormControlLabel-root': {
    '.MuiSwitch-root': {
      marginRight: 10,
    },
  },
}));

// TODO DRY
const InputOptionBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  & > .MuiTypography-root {
    flex: 0 112px;
    margin-right: 8px;
    margin-top: 10px;
  }
  & > .MuiBox-root {
    flex: 1;
  }
`;

export default function SectionMenu({
  children,
  containerId,
  primaryLang,
  currentSection,
  setDataSectionItems,
  setDataSectionContainers,
}) {
  const [sectionHeight, setSectionHeight] = React.useState(currentSection.height);
  const [logoDescription, setLogoDescription] = React.useState(currentSection.logoDescription);
  const [logoName, setLogoName] = React.useState(currentSection.logoName);
  const [isTitleVisibleOnTheFinalDocument, setIsTitleVisibleOnTheFinalDocument] = React.useState(currentSection.isTitleVisibleOnTheFinalDocument);

  const [titleValue, setTitleValue] = React.useState(currentSection.title);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemove = () => {
    handleClose();
    setDataSectionContainers((arr) => arr.filter((x) => x !== containerId));
    setDataSectionItems((obj) => (_.omit(obj, [containerId])));
  };
  const handleNameChange = (e) => {
    setTitleValue(e.target.value);
  };
  const handleSwitchChange = (e) => {
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((item) => ({
          ...item,
          isVisible: item.id === e.target.id ? e.target.checked : item.isVisible,
        })),
      },
    }));
  };
  const handleSave = () => {
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        title: titleValue === '' ? 'Untitled section' : titleValue,
        isTitleVisibleOnTheFinalDocument,
        height: sectionHeight,
        logoName,
        logoDescription,
      },
    }));
    handleClose();
  };
  const handleBackgroundImage = React.useCallback(async (file) => {
    const bgImage = await toBase64(file);
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        bgImage,
      },
    }));
  }, []);
  const handleLogoImage = React.useCallback(async (file) => {
    const logoImage = await toBase64(file);
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        logoImage,
      },
    }));
  }, []);
  const handleSectionHeightChange = ({ target: { value } }) =>
    setSectionHeight(value);

  const handleLogoNameChange = ({ target: { value } }) =>
    setLogoName(value);

  const handleLogoDescriptionChange = ({ target: { value } }) =>
    setLogoDescription(value);

  const handleIsSectionTitleVisibleOnFinalDocument = ({ target: { checked } }) =>
    setIsTitleVisibleOnTheFinalDocument(checked);

  return (
    <Box>
      {React.cloneElement(children, {
        id: 'settings-card-button',
        'aria-label': "section-settings",
        'aria-controls': isOpen ? 'settings-card-menu' : undefined,
        'aria-haspopup': true,
        'aria-expanded': isOpen ? 'true' : undefined,
        className: isOpen ? '' : 'hidden-button',
        variant: 'contained',
        onClick: handleOpen,
      })}
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 6,
          pt: 5,
        }}>
          {!['bg', 'logo'].includes(currentSection.subModel) && (
            <>
              <InputOptionBox>
                <Typography variant="caption">
                  Section name
                </Typography>
                <Box>
                  <TextField onChange={handleNameChange} value={titleValue} sx={{ py: '2px' }} />
                </Box>
              </InputOptionBox>
              <InputOptionBox>
                <Typography variant="caption">{' '}</Typography>
                <Box display="flex" sx={{ mt: '9px' }}>
                  <Checkbox
                    checked={isTitleVisibleOnTheFinalDocument}
                    onChange={handleIsSectionTitleVisibleOnFinalDocument}
                  />
                  <Typography lh="double" sx={{ ml: '9px', fontSize: '12px', color: 'dark.$40' }}>
                    Visible on the final document
                  </Typography>
                </Box>
              </InputOptionBox>

              <Divider sx={{ my: 2, mx: -6 }} />

              <Typography variant="h6">Fields</Typography>
              <Box sx={{ mb: 2 }}>
                {!currentSection.items.length && <Typography sx={{ mt:4, color: 'dark.$40' }}>Add fields to control them</Typography>}
                {currentSection.items.map(({ id, languages, isVisible }) => (
                  <FormGroup
                    key={id}
                    sx={{ py: 3, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          id={id}
                          checked={isVisible}
                          onChange={handleSwitchChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      sx={{ color: !isVisible ? 'dark.$60' : 'dark.main', m: 0 }}
                      label={languages[primaryLang].title}
                    />
                    <DraggableCardIcon sx={{ ml: 'auto', cursor: 'grab' }} />
                  </FormGroup>
                ))}
              </Box>
            </>
          )}
          {['logo'].includes(currentSection.subModel) && (
            <>
              <InputOptionBox>
                <Typography variant="caption">
                  Uplodade logo
                </Typography>
                <Box>
                  <FileUploader id={`logo-${Date.now()}`} cb={handleLogoImage} matchFileType={['image/png', 'image/jpeg', 'image/jpg']}>
                    <Box display="flex" flexDirection="column" flex="1">
                      {currentSection.logoImage ? (
                        <CardMedia component="img" src={currentSection.logoImage} sx={{ height: 70, width: 70 }} />
                      ) : (
                        <Typography>
                          No logo image
                        </Typography>
                      )}
                      <Button
                        sx={{ mt:2, pointerEvents: 'none' }}
                        variant="border"
                        size="m"
                        startIcon={<Icon component={currentSection.logoImage ? RefreshIcon : UploadCloudIcon}/>}>
                        <Typography color="dark.main" variant="body13" weight="medium">
                          {currentSection.logoImage ? 'Replace' : 'Upload image'}
                        </Typography>
                      </Button>
                    </Box>
                  </FileUploader>
                </Box>
              </InputOptionBox>
              <Divider sx={{ my: 2, mx: -6 }} />
            </>
          )}
          {['bg', 'logo'].includes(currentSection.subModel) && (
            <>
              <InputOptionBox>
                <Typography variant="caption">
                  Background image
                </Typography>
                <Box>
                  <FileUploader id={`bg-${Date.now()}`} cb={handleBackgroundImage} matchFileType={['image/png', 'image/jpeg', 'image/jpg']}>
                    <Box display="flex" flexDirection="column" flex="1">
                      {currentSection.bgImage ? (
                        <CardMedia component="img" src={currentSection.bgImage} sx={{ height: 52, width: 248 }} />
                      ) : (
                        <Typography>
                          No background image
                        </Typography>
                      )}
                      <Button
                        sx={{ mt:2, pointerEvents: 'none' }}
                        variant="border"
                        size="m"
                        startIcon={<Icon component={currentSection.bgImage ? RefreshIcon : UploadCloudIcon}/>}
                      >
                        <Typography color="dark.main" variant="body13" weight="medium">
                          {currentSection.bgImage ? 'Replace' : 'Upload image'}
                        </Typography>
                      </Button>
                    </Box>
                  </FileUploader>
                </Box>
              </InputOptionBox>
              <InputOptionBox>
                <Typography variant="caption">
                  Section height
                </Typography>
                <Box>
                  <TextField onChange={handleSectionHeightChange} value={sectionHeight} sx={{ py: '2px' }} />
                </Box>
              </InputOptionBox>
            </>
          )}
          {['logo'].includes(currentSection.subModel) && (
            <>
              <Divider sx={{ my: 2, mx: -6 }} />
              <InputOptionBox>
                <Typography variant="caption">
                  Displayed name
                </Typography>
                <Box>
                  <TextField onChange={handleLogoNameChange} value={logoName} sx={{ py: '2px' }} />
                </Box>
              </InputOptionBox>
              <InputOptionBox>
                <Typography variant="caption">
                  Description
                </Typography>
                <Box>
                  <TextField onChange={handleLogoDescriptionChange} value={logoDescription} sx={{ py: '2px' }} />
                </Box>
              </InputOptionBox>
            </>
          )}
        </Box>
        <ButtonGroup disableElevation variant="modal">
          <Button onClick={handleRemove}>
            <TrashIcon />
            <Typography>Remove</Typography>
          </Button>
          <Button onClick={handleSave}>
            <CheckIcon />
            <Typography>Save</Typography>
          </Button>
        </ButtonGroup>
      </Menu>
    </Box>
  );
}
