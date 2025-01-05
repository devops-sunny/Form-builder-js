import * as React from 'react';
import {
  useTheme,
  Divider,
  Typography,
  Button,
  styled,
  Box,
  Tab,
  Tabs,
  SvgIcon,
} from '@mui/material'
import { nanoid } from 'nanoid';
import Canvas from '../../../Canvas';
import FileUploader from '../../../../components/FileUploader';

const MenuContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 6, 4, 6),
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  ' .MuiTabs-flexContainer': {
    marginRight: `${theme.spacing(3)} /* @noflip */`,
    marginLeft: '12px /* @noflip */',
  },
  '.signmenu-header': {
    alignItems: 'center',
    padding: theme.spacing(4, 3, 6, 3),
    '.MuiSvgIcon-root': {
      marginRight: `${theme.spacing(3)} /* @noflip */`,
    },
  },
}));

function TabPanel({ children, value, index, ...props }) {
  return (
    <Box
      sx={{ pt: 7.5 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}>
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

const Circle = styled(Box)(() => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  cursor: 'pointer',
  marginLeft: '10px /*! @noflip */'
}));


export default function SendingMenu({
  handleClose,
  handleSignature,
  isDrawAllowed,
  isUploadAllowed,
}) {
  const t = useTheme();
  const [color, setColor] = React.useState(t.palette.dark.main);
  const [tab, setTab] = React.useState(isDrawAllowed ? 0 : isUploadAllowed ? 2 : 1);
  const [isClear, setIsClear] = React.useState(false);
  const canvasRef = React.useRef(null);

  const uniqueId = React.useMemo(() => nanoid(), [])

  const handleImageSave = () => {
    if (canvasRef.current) handleSignature(canvasRef.current.toDataURL("image/png"));
    handleClose();
  };

  const handleCancel = () => {
    handleSignature('');
    handleClose();
  };

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <MenuContainer dir="ltr" onClick={(e) => e.stopPropagation()}>
      <Box display="flex" className="signmenu-header">
        <SvgIcon sx={{ fontSize: 32 }} inheritViewBox>
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.33984 16C3.40106 -0.787698 4.33797 -0.787698 4.15059 16C3.99279 27.4863 4.92971 27.4863 6.96134 16C9.02255 4.51368 9.95946 4.51368 9.77208 16C9.51656 35.84 10.4535 35.84 12.5828 16C14.644 -3.84001 15.581 -3.84001 15.3936 16C15.2532 25.8798 16.1901 25.8798 18.2043 16C20.2655 6.12016 21.2024 6.12016 21.0151 16C20.8178 26.924 21.7547 26.924 23.8258 16C25.887 5.07595 26.8239 5.07595 26.6366 16" stroke="#4851C8"/>
          </svg>
        </SvgIcon>
        <Typography variant="h3">
          Add signature
        </Typography>
      </Box>
      <Divider sx={{ mx: -6 }} />
      <Box>
        {tab === '' && 'All modes disallowed'}
        <Tabs
          sx={{ mx: -6 }}
          value={tab}
          onChange={handleTabChange}
          aria-label="fields">
          <Tab label="Draw" {...a11yProps(0)} disabled={!isDrawAllowed} />
          <Tab label="Write" {...a11yProps(1)} />
          <Tab label="Upload" {...a11yProps(2)} disabled={!isUploadAllowed} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Box display="flex">
            <Circle onClick={() => setColor(t.palette.dark.main)} sx={{ background: (theme) => theme.palette.dark.main }} />
            <Circle onClick={() => setColor(t.palette.primary.$80)} sx={{ background: (theme) => theme.palette.primary.$80 }} />
            <Circle onClick={() => setColor(t.palette.secondary.$80)} sx={{ background: (theme) => theme.palette.secondary.$80 }} />
            <Button
              onClick={() => setIsClear(true)}
              variant="ghost"
              sx={{ ml: 'auto /* @noflip */', color: t.palette.dark.$60 }}>
              Clear
            </Button>
          </Box>
          <Box sx={{
            border: `1px solid ${t.palette.dark.$a8}`,
            borderRadius: 4,
            cursor: 'crosshair',
            my: 5.5 }}>
            <Canvas
              ref={canvasRef}
              width={762}
              height={340}
              color={color}
              isClear={isClear}
              setIsClear={setIsClear}
            />
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Coming soon...
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Box sx={{
            height: 340,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 762,
            border: `1px solid ${t.palette.dark.$a8}`,
            borderRadius: 4,
            cursor: 'pointer',
            my: 5.5 }}>
            <FileUploader id={uniqueId} cb={handleSignature} multiple={false} matchFileType={['image/png', 'image/jpeg']}>
              <Typography sx={{ fontSize: 15, color: t.palette.secondary.$80 }}>
                Upload signature
              </Typography>
            </FileUploader>
          </Box>
        </TabPanel>
      </Box>
      <Box display="flex" alignItems="center" className="signmenu-footer">
        <Typography sx={{ color: t.palette.dark.$60 }}>
          Learn more about third party Terms & Agreements
        </Typography>
        <Button
          onClick={handleCancel}
          variant="border"
          size="l"
          sx={{
            ml: 'auto /* @noflip */',
            mr: '8px /* @noflip */',
            color: t.palette.dark.$60
          }}>
          Cancel
        </Button>
        <Button
          onClick={handleImageSave}
          variant="primary"
          size="l"
          sx={{ px: 6 }}
        >
          Sign
        </Button>
      </Box>
    </MenuContainer>
  );
}
