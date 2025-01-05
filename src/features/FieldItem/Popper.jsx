import * as React from 'react';
import { customAlphabet } from 'nanoid';
import {
  Box,
  IconButton,
  MenuItem,
  Typography,
  FormControl,
  Select,
  Popper,
  Divider,
} from '@mui/material';
import FieldMenu from './FieldMenu';
import {
  CopyIcon,
  TrashIcon,
  SettingsIcon,
  CornerDownIcon,
  IndicatorIcon,
} from '../../icons';
import Fade from '../../components/Fade';
import IconButtonGroup from '../../components/IconsButtonGroup';
import { alignList, textModificationList } from '../../data/iconButtonLists';

function CustomPopper({
  type,
  open,
  cardId,
  anchorEl,
  fillBy,
  styleType,
  containerId,
  fieldsItems,
  templateData,
  dataSectionItems,
  setDataSectionItems,
}) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);
  const [roleSelelct, setRoleSelect] = React.useState(fillBy);
  const [typographySelect, setTypographySelect] = React.useState(styleType.type);

  const handleRoleChange = (e) => {
    setRoleSelect(e.target.value);
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((x) =>
          x.id === cardId ? { ...x, fillBy: e.target.value } : x
        ),
      },
    }));
  };
  const handleCopy = () =>
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.reduce(
          (acc, item) => [
            ...acc,
            ...(item.id !== cardId
              ? [item]
              : [item, { ...item, id: nanoid(), isActive: false }]),
          ],
          []
        ),
      },
    }));
  const handleTypographyChange = (e) => {
    setTypographySelect(e.target.value);
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((x) =>
          x.id === cardId
            ? {
              ...x,
              style: {
                ...styleType,
                fontSize:
                    fieldsItems[typographySelect.toLowerCase()].style.fontSize,
              },
            }
            : x
        ),
      },
    }));
  };
  const handleAlignment = (textAlign) =>
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((x) =>
          x.id === cardId ? { ...x, style: { ...styleType, textAlign } } : x
        ),
      },
    }));
  const handleTextStyle = (textDecoration) =>
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((x) =>
          x.id === cardId ? { ...x, style: { ...styleType, textDecoration } } : x
        ),
      },
    }));

  const handleRemove = () => {
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.filter((x) => x.id !== cardId),
      },
    }));
  };

  return (
    <Popper
      id={cardId}
      open={open}
      onClick={(e) => e.stopPropagation()}
      anchorEl={anchorEl}
      transition
      placement="top-start"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Box
            sx={{
              p: 2,
              mb: 2,
              bgcolor: 'light.main',
              boxShadow: 1,
              borderRadius: 2,
              display: 'flex',
              maxHeight: '36px',
            }}
          >
            <Box display="flex" alignItems="center">
              <FormControl fullWidth>
                {['inline'].includes(type) ? (
                  <Select
                    id="popper-select"
                    value={typographySelect}
                    variant="standard"
                    disableUnderline
                    sx={{ border: 'none' }}
                    IconComponent={CornerDownIcon}
                    onChange={handleTypographyChange}
                  >
                    {Object.values(fieldsItems)
                      .filter((f) => f.type === 'inline')
                      .map((f) => (
                        <MenuItem key={f.title} value={f.style.type}>
                          {f.style.type}
                        </MenuItem>
                      ))}
                  </Select>
                ) : (
                  <Select
                    id="popper-select"
                    value={roleSelelct}
                    variant="standard"
                    disableUnderline
                    sx={{ border: 'none', '.MuiSelect-select': { display: 'flex' } }}
                    IconComponent={CornerDownIcon}
                    onChange={handleRoleChange}
                  >
                    <MenuItem display="flex" value="sender">
                      <IndicatorIcon sx={{ color: 'secondary.$80' }} />
                      <Typography sx={{ mr: 1 }}>Sender</Typography>
                    </MenuItem>
                    <MenuItem value="recipient">
                      <IndicatorIcon sx={{ color: 'secondary.$80' }} />
                      <Typography sx={{ mr: 1 }}>Recipient</Typography>
                    </MenuItem>
                  </Select>
                )}
              </FormControl>
            </Box>
            {['inline'].includes(type) && (
              <>
                <Divider orientation="vertical" flexItem sx={{ mx: '9px' }} />
                <IconButtonGroup
                  border="none"
                  isExclusive
                  setValue={handleAlignment}
                  list={alignList}
                />
                <Divider orientation="vertical" flexItem sx={{ mx: '9px' }} />
                <IconButtonGroup
                  border="none"
                  setValue={handleTextStyle}
                  list={textModificationList}
                />
              </>
            )}
            <Divider orientation="vertical" flexItem sx={{ mx: '9px' }} />
            <Box display="flex">
              <IconButton onClick={handleCopy}>
                <CopyIcon />
              </IconButton>
              {!['inline'].includes(type) && (
                <FieldMenu
                  cardId={cardId}
                  fillBy={fillBy}
                  containerId={containerId}
                  fieldsItems={fieldsItems}
                  templateData={templateData}
                  setDataSectionItems={setDataSectionItems}
                  dataSectionItems={dataSectionItems}
                  handleRoleChange={handleRoleChange}
                >
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </FieldMenu>
              )}
              {['inline'].includes(type) && (
                <Divider orientation="vertical" flexItem sx={{ mx: '9px' }} />
              )}
              <IconButton onClick={handleRemove}>
                <TrashIcon />
              </IconButton>
            </Box>
          </Box>
        </Fade>
      )}
    </Popper>
  );
}

export default React.memo(CustomPopper);
