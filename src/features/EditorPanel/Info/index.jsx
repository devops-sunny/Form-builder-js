import * as React from 'react';
import PT from 'prop-types';
import { Box, styled, Chip, Typography, Divider, Button } from '@mui/material';
import { IndicatorIcon, ArrowRightIcon } from '../../../icons';
import Person from '../../../components/Person';
import InputTextToggler from './InputTextToggler';

const TemplateRolesEnum = {
  Creator: {
    key: 'creator',
    value: 'creator',
  },
  Sender: {
    key: 'sender',
    value: 'sender',
  },
  Recipient: {
    key: 'recipient',
    value: 'recipient',
  }
};

const OptionBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  & > .MuiTypography-root {
    flex: 0 80px;
    margin-right: 8px;
  }
  & > .MuiBox-root {
    flex: 1;
  }
`;

function InfoRoute({
  preview,
  templateData: { title, name, sender, recipient, status, description, editorRole },
  lastTimeChanged,
  templateCreationTime,
  setTemplateData,
}) {
  const [templateTitle, setTemplateTitle] = React.useState({
    text: title,
    isText: true,
  });
  const [templateDescription, setTemplateDescription] = React.useState({
    text: description,
    isText: true,
  });

  React.useEffect(() => {
    if(title) setTemplateTitle((prev) => ({ ...prev, text: title }));
  }, [title]);

  const handleRenameTitleChange = ({ target: { value } }) => {
    setTemplateTitle(value);
  };

  const handleRenameDescriptionChange = ({ target: { value } }) =>
    setTemplateDescription(value);

  const handleRenameTitleSubmit = (e) => {
    e.preventDefault();
    if(templateTitle.text || templateTitle) {
      setTemplateTitle({ text: templateTitle.text || templateTitle, isText: true });
      setTemplateData((prev) => ({ ...prev, title: templateTitle.text || templateTitle }));
    }
  };

  const handleRenameDescriptionSubmit = (e) => {
    e.preventDefault();
    setTemplateDescription({ text: templateDescription, isText: true });
    setTemplateData((prev) => ({ ...prev, description: templateDescription }));
  };

  const handleDoubleClick = () => {
    if(templateTitle.text || templateTitle) 
      setTemplateTitle((prev) => ({ ...(prev.text ? prev : { text:prev }), isText: !prev.isText }));
  };

  const infoData = [
    {
      fieldName: 'Name',
      content: (
        <InputTextToggler
          initialValue={templateTitle}
          setInitialValue={setTemplateTitle}
          handleRenameItemChange={handleRenameTitleChange}
          handleRenameItemSubmit={handleRenameTitleSubmit}
          handleDoubleClick={handleDoubleClick}
        />
      ),
      isVisible: true,
    },
    {
      fieldName: 'Sender',
      content: <Person avatar={sender.avatar} name={sender.name} />,
      isVisible: true,
    },
    {
      fieldName: 'Recipient',
      content: <Person avatar={recipient.avatar} name={recipient.name} />,
      isVisible: !!recipient.name,
    },
    {
      fieldName: 'Status',
      content: (
        <Chip
          icon={<IndicatorIcon sx={{ color: 'dark.$40' }} />}
          label={
            ['public'].includes(status)
              ? 'Waiting for signature'
              : ['review'].includes(status)
                ? 'Waiting for approval'
                : 'Draft'
          }
          variant="xs"
          bg="darka6"
          sx={{
            mr: 1.5,
            pr: 2,
            py: 0.5,
            color: 'dark.$60',
            '> .MuiChip-icon': {
              m: 0,
              fontSize: 18,
              color: 'dark.$40',
            },
          }}
        />
      ),
      isVisible: true,
    },
    {
      fieldName: 'Template',
      content: name,
      isVisible: false,
    },
    {
      fieldName: 'Created at',
      content: templateCreationTime,
      isVisible: !!templateCreationTime,
    },
    {
      fieldName: 'Last activity',
      content: `${sender.name}, ${lastTimeChanged}`,
      isVisible: true,
    },
    {
      fieldName: 'Description',
      content: (
        <InputTextToggler
          initialValue={templateDescription}
          setInitialValue={setTemplateDescription}
          handleRenameItemChange={handleRenameDescriptionChange}
          handleRenameItemSubmit={handleRenameDescriptionSubmit}
          handleDoubleClick={handleDoubleClick}
        />
      ),
      isVisible: true,
    },
    {
      fieldName: 'Copy',
      content: (
        <Button
          // TODO server req to download pdf
          // onCLick={}
          startIcon={<ArrowRightIcon sx={{ transform: 'rotate(90deg)' }} />}
          variant="border"
          size="m"
          sx={{ mr: 2 }}
        >
          Download PDF
        </Button>
      ),
      isVisible:
        (preview.role && preview.role !== TemplateRolesEnum.Recipient.key)
        || (!preview.role && editorRole !== TemplateRolesEnum.Recipient.key),
    },
  ];

  return (
    <Box
      sx={{
        ml: 3,
        my: 1,
      }}
    >
      {infoData
        .filter(
          (x) =>
            ((editorRole === 'recipient'
              && ['Name', 'Sender', 'Created at', 'Last activity', 'Copy'].includes(
                x.fieldName
              ))
              || editorRole !== 'recipient')
            && x.isVisible
        )
        .map(({ fieldName, content }) => (
          <OptionBox key={fieldName}>
            <Typography
              display="flex"
              alignItems="center"
              color="dark.$80"
              variant="body13"
              lh="double"
            >
              {fieldName}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body14">{content}</Typography>
            </Box>
          </OptionBox>
        ))}
      <Divider sx={{ ml: -5, my: 3 }} />
    </Box>
  );
}

InfoRoute.propTypes = {
  preview: PT.shape({
    isActive: PT.bool,
    role: PT.string,
  }),
  templateData: PT.shape({
    name: PT.string,
    title: PT.string,
    sender: PT.shape({
      name: PT.string,
      avatar: PT.string,
    }),
    recipient: PT.shape({
      name: PT.string,
      avatar: PT.string,
    }),
    createdAt: PT.string,
    status: PT.string,
    description: PT.string,
    editorRole: PT.string,
  }).isRequired,
  lastTimeChanged: PT.oneOfType([PT.string, PT.number]).isRequired,
};

InfoRoute.defaultProps = {
  preview: {
    isActive: false,
    role: '',
  },
  sender: {
    name: '',
    avatar: '',
  },
  recipient: {
    name: '',
    avatar: '',
  },
};

export default InfoRoute;
