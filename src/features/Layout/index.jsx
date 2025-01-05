import { Grid } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import dataCustomSections from '../../data/customSections';
import inputFields from '../../data/inputFields';
import tData from '../../data/templateData';
import useWindowSize from '../../utils/hooks/useWindowSize';
import EditorPanel from '../EditorPanel';
import Header from '../Header';
import Builder from './Builder';
import Previewer from './Previewer';


export default function App() {
  const { height } = useWindowSize();
  const [templateData, setTemplateData] = React.useState(tData);
  const [preview, setPreview] = React.useState({
    isActive: false,
    role: 'sender',
  });
  const [dataSectionItems, setDataSectionItems] = React.useState({});
  const [fieldsItems, setFieldsItems] = React.useState(inputFields);
  const [customSections, setCustomSections] = React.useState(dataCustomSections);
  const [customFields, setCustomFields] = React.useState({});

  const parsedUpdatedAt = new Date(templateData.updatedAt).getTime();
  const parsedCreatedAt = new Date(templateData.createdAt).getTime();
  const [lastTimeChanged, setLastTimeChanged] = React.useState(templateData.updatedAt ? parsedUpdatedAt : formatDistanceToNow(Date.now()));
  const [templateCreationTime, setTemplateCreationTime] = React.useState(templateData.createdAt ? parsedCreatedAt: '');

  const [dataSectionContainers, setDataSectionContainers] = React.useState([...Object.keys(dataSectionItems)]);
  const [offerData, setOfferData] = React.useState({});
  const [queryStatus, setQueryStatus] = React.useState('1');

  React.useEffect(() => {
    setTemplateData((data) => ({ ...data, updatedAt: Date.now() }))
  }, [dataSectionItems]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastTimeChanged(formatDistanceToNow(templateData.updatedAt || Date.now()));
    }, 5000);
    return () => clearInterval(interval);
  }, [templateData.updatedAt]);

  const isFieldDisabled = (fillBy) => {
    if (preview.isActive) return true;
    if (['4', '5'].includes(`${queryStatus}`)) return true;
    return !preview.isActive ? ['creator'].includes(templateData.editorRole) ? false : ![templateData.editorRole].includes(fillBy) : ![preview.role].includes(fillBy);
  };

  return (
    <BrowserRouter>
      <Grid
        container
        direction="column"
        sx={{
          background: '#FBFBFB',
          height,
          '> .MuiGrid-root': {
            // take any grid child except header
            '&:nth-of-type(2)': {
              height: 'calc(100% - 92px)',
            }
          },
        }}>
        <Header
          preview={preview}
          lastTimeChanged={lastTimeChanged}
          setPreview={setPreview}
          templateData={templateData}
          setTemplateData={setTemplateData}
          dataSectionItems={dataSectionItems}
          offerData={offerData}
        />
        <Grid container item xs sx={{ '> .MuiGrid-root': { height: '100%' } }}>
          {(!['creator'].includes(templateData.editorRole) || preview.isActive) && (
            //TODO since sender logic changed, its better to move Editor panel to Previewer comp
            <EditorPanel
              preview={preview}
              lastTimeChanged={lastTimeChanged}
              templateCreationTime={templateCreationTime}
              templateData={templateData}
              setTemplateData={setTemplateData}
              customSections={customSections}
              fieldsItems={fieldsItems}
              customFields={customFields}
              dataSectionItems={Object.entries(dataSectionItems).filter((k) => !Object.keys(dataSectionItems).includes(k[0]))}
              setFieldsItems={setFieldsItems}
              //TODO use setCustomSections
              setCustomSections={setCustomSections}
            />
          )}
          {!['creator'].includes(templateData.editorRole) || preview.isActive
            ? (<Previewer
              isFieldDisabled={isFieldDisabled}
              preview={preview}
              templateData={templateData}
              dataSectionItems={dataSectionItems}
              setDataSectionItems={setDataSectionItems} />)
            : (<Builder
              isFieldDisabled={isFieldDisabled}
              preview={preview}
              lastTimeChanged={lastTimeChanged}
              templateCreationTime={templateCreationTime}
              templateData={templateData}
              setTemplateData={setTemplateData}
              dataSectionItems={dataSectionItems}
              setDataSectionItems={setDataSectionItems}
              dataSectionContainers={dataSectionContainers}
              setDataSectionContainers={setDataSectionContainers}
              fieldsItems={fieldsItems}
              customFields={customFields}
              setFieldsItems={setFieldsItems}
              customSections={customSections} />)
          }
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
