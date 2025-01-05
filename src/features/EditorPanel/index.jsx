import React from 'react';
import { Grid, styled } from '@mui/material';
import Drawer from '../Navigation/Drawer';
import PanelRoute from './routes';
import Info from './Info';

const PanelGridLayout = styled(Grid)(({ theme }) => ({
  maxHeight: '100%',
  overflowY: 'auto',
  width: '336px',
  background: theme.palette.light.main,
}));

export default function EditorPanel({
  preview,
  lastTimeChanged,
  templateCreationTime,
  templateData,
  setTemplateData,
  dataSectionItems,
  fieldsItems,
  customFields,
  customSections,
  setFieldsItems,
  handleAddSection,
}) {
  return (
    <Grid
      item
      xs="auto"
      container
      sx={{
        maxHeight: '100%',
        order: ['recipient'].includes(templateData.editorRole) && 1,
      }}>
      {!['recipient'].includes(templateData.editorRole)
       && (!['recipient'].includes(preview.role) || !preview.isActive) ? (
          <>
            <Drawer preview={preview} templateData={templateData} />
            <PanelGridLayout>
              <PanelRoute
                preview={preview}
                lastTimeChanged={lastTimeChanged}
                templateCreationTime={templateCreationTime}
                dataSectionItems={dataSectionItems}
                templateData={templateData}
                setTemplateData={setTemplateData}
                customFields={customFields}
                fieldsItems={fieldsItems}
                customSections={customSections}
                setFieldsItems={setFieldsItems}
                handleAddSection={handleAddSection}
              />
            </PanelGridLayout>
          </>
        ) : (
          <PanelGridLayout>
            <Info lastTimeChanged={lastTimeChanged} templateCreationTime={templateCreationTime} templateData={templateData} />
          </PanelGridLayout>
        )}
    </Grid>
  );
}
