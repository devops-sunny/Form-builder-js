import * as React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Edit from './Edit';
import Info from './Info';
import Customizing from './Customizing';
import Vars from './Vars';
import Settings from './Settings';
import Flow from './Flow';
import History from './History';

export default function PanelRouter({
  preview,
  lastTimeChanged,
  templateCreationTime,
  dataSectionItems,
  templateData,
  setTemplateData,
  setFieldsItems,
  handleAddSection,
  customFields,
  fieldsItems,
  customSections,
}) {
  return (
    <Routes>
      {/* <Navigate to="/form-builder/edit" replace />; */}
      {/* <Route exact path="/form-builder"> */}
      {/* </Route> */}
      <Route
        exact
        path="/form-builder/info"
        element={<Info
          preview={preview}
          lastTimeChanged={lastTimeChanged}
          templateCreationTime={templateCreationTime}
          templateData={templateData}
          setTemplateData={setTemplateData}
        />}
      />
      <Route
        exact
        path="/form-builder/flow"
        element={<Flow />}
      />
      {!['sender'].includes(templateData.editorRole) && !preview.isActive && (
        <>
          <Route
            exact
            path="/form-builder/edit"
            element={
              <Edit
                templateData={templateData}
                setTemplateData={setTemplateData}
                fieldsItems={fieldsItems}
                customFields={customFields}
                customSections={customSections}
                dataSectionItems={dataSectionItems}
                handleAddSection={handleAddSection} />}
          />
          <Route
            exact
            path="/form-builder/customizing"
            element={<Customizing fieldsItems={fieldsItems} setFieldsItems={setFieldsItems} />}
          />
          <Route
            exact
            path="/form-builder/vars"
            element={<Vars />}
          />
          <Route
            exact
            path="/form-builder/settings"
            element={<Settings />}
          />
          <Route
            exact
            path="/form-builder/history"
            element={<History />}
          />

        </>
      )}
      <Route path="*" element={<Navigate to="/form-builder/edit" replace />} />
    </Routes>
  );
}
