import * as React from 'react';
import { Grid, Box, Tab, Tabs, Button, Chip, Typography } from '@mui/material';
import EditorPanelButton from '../../../components/EditorPanelButton';
import Accordion from '../../../components/Accordion';
import Popover from '../../../components/Popover';
import DraggableCards from '../../Dragndrop/DraggableCards';
import { PlusIcon, LayersIcon } from '../../../icons';
import SendingMenu from './SendingMenu';
import LanguageMenu from './LanguageMenu';
import LayoutMenu from './LayoutMenu';

// TODO tab panel refactoring / reuse / separate
//  LayersIcon,
//dataSectionItems,
//<DraggableCards items={dataSectionItems} icon={<LayersIcon />} />
function TabPanel({ children, value, index, ...props }) {
  return (
    <Box
      sx={{ pt: 4 }}
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

function EditPanelFieldsAccordion({ fieldsItems, customFields }) {
  const [tab, setTab] = React.useState(1);

  const handleChange = (event, value) => {
    setTab(value);
  };

  const TypographyFields = React.useMemo(
    () => Object.entries(fieldsItems).filter((x) => x[1].type === 'inline'),
    []
  );
  const InputFields = React.useMemo(
    () => Object.entries(fieldsItems).filter((x) => x[1].type !== 'inline'),
    []
  );
  const CustomFields = React.useMemo(
    () => Object.entries(customFields),
    [customFields]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tab} onChange={handleChange} aria-label="fields">
        <Tab label="Typography" {...a11yProps(0)} />
        <Tab label="Input Types" {...a11yProps(1)} />
        <Tab label="Custom Fields" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <DraggableCards
          type="input"
          items={TypographyFields}
          sx={{ padding: (theme) => theme.spacing(1.5, 4, 4, 5) }}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <DraggableCards
          type="input"
          items={InputFields}
          sx={{ padding: (theme) => theme.spacing(1.5, 4, 4, 5) }}
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <DraggableCards
          type="input"
          items={CustomFields}
          icon={LayersIcon}
          sx={{ padding: (theme) => theme.spacing(1.5, 4, 4, 5) }}
        />
      </TabPanel>
    </Box>
  );
}

function EditPanelDataSectionAccordion({ handleAddSection, customSections }) {
  const SectionCards = React.useMemo(
    () => Object.entries(customSections).map((x) => x),
    []
  );
  return (
    <Box sx={{ padding: (theme) => theme.spacing(1.5, 4, 4, 5) }}>
      <Grid item xs>
        <DraggableCards icon={LayersIcon} type="input" items={SectionCards} />
        <Button
          variant="ghost"
          size="m"
          sx={{ width: '100%' }}
          startIcon={<PlusIcon />}
          onClick={handleAddSection}
        >
          New section
        </Button>
      </Grid>
    </Box>
  );
}

export default function Edit({
  fieldsItems,
  customFields,
  customSections,
  templateData,
  setTemplateData,
  handleAddSection,
}) {
  const accordionArr = [
    {
      header: 'Data section',
      body: (
        <EditPanelDataSectionAccordion
          customSections={customSections}
          handleAddSection={handleAddSection}
        />
      ),
    },
    {
      header: 'Fields',
      body: (
        <EditPanelFieldsAccordion
          fieldsItems={fieldsItems}
          customFields={customFields}
        />
      ),
    },
  ];
  return (
    <>
      {/* <Popover */}
      {/*   styles={{minWidth: 232}} */}
      {/*   anchorOrigin={{ */}
      {/*     vertical: 'center', */}
      {/*     horizontal: 'right', */}
      {/*   }} */}
      {/*   transformOrigin={{ */}
      {/*     vertical: 'top', */}
      {/*     horizontal: 'left', */}
      {/*   }} */}
      {/*   title="Select offer format"> */}
      {/*   <EditorPanelButton title="Sending as"> */}
      {/*     <Typography variant="body13rich">DocuSign</Typography> */}
      {/*   </EditorPanelButton> */}
      {/*   <SendingMenu templateData={templateData} setTemplateData={setTemplateData} /> */}
      {/* </Popover> */}
      <Popover
        styles={{ minWidth: 232 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        title="Document languages"
      >
        <EditorPanelButton title="Language">
          <Chip
            variant="m"
            label={templateData.primaryLang.toUpperCase()}
            sx={{ ml: '10px' }}
          />
          {templateData.secondaryLang && (
            <Chip
              variant="m"
              label={templateData.secondaryLang.toUpperCase()}
              sx={{ ml: '10px' }}
            />
          )}
        </EditorPanelButton>
        <LanguageMenu
          templateData={templateData}
          setTemplateData={setTemplateData}
        />
      </Popover>
      {templateData.secondaryLang && (
        <Popover
          styles={{ minWidth: 444 }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          title="Select layout for the translation"
        >
          <EditorPanelButton title="Layout">
            <Typography variant="body13rich">
              {templateData.layout === 'row' ? 'Two rows' : 'Two columns'}{' '}
            </Typography>
          </EditorPanelButton>
          <LayoutMenu
            templateData={templateData}
            setTemplateData={setTemplateData}
          />
        </Popover>
      )}
      <Accordion items={accordionArr} />
    </>
  );
}
