import * as React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { CSS } from '@dnd-kit/utilities';
import { DndIcon } from '../../icons';
import Popper from './Popper';
import FieldSwitcher from './FieldSwitcher';
import RTL from '../RTL';

const Field = styled(Box)(
  ({
    theme,
    type,
    isActive,
    isVisible,
    transform,
    transition,
    isDragging,
    isSorting,
    templateData,
  }) => ({
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? `2px dashed ${theme.palette.secondary.$80}` : undefined,
    display: isVisible ? 'flex' : 'none',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    outline:
      templateData.secondaryLang
      && isActive
      && !['inline'].includes(type)
      && !isDragging
      && `2px solid ${theme.palette.secondary.$80}`,
    borderRadius: 12,
    flexDirection: templateData.layout === 'column' && 'column',
    ...(isSorting && {
      '&.dnd-field-item': {
        height: 112,
        overflow: 'hidden',
      },
    }),
    '> .MuiBox-root': {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
      flexDirection: !['inline'].includes(type) && 'column',
      outline:
        !templateData.secondaryLang
        && isActive
        && !['inline'].includes(type)
        && !isDragging
        && `2px solid ${theme.palette.secondary.$80}`,
      padding: !['inline'].includes(type)
        ? theme.spacing(4, 3, 4, 2)
        : theme.spacing(0, 3, 0, 2),
      borderRadius: 12,
      '& .MuiFormControl-root': {
        flex: !['salary', 'phone', 'select'].includes(type) && 1,
        marginLeft: templateData.secondaryLang
          ? theme.spacing(1)
          : theme.spacing(6.5),
        '&:focus': {
          backgroundColor: ['inline'].includes(type) && theme.palette.dark.$a4,
        },
      },
      '& .MuiFormGroup-root': {
        '& .MuiButtonBase-root': {
          padding: theme.spacing(2),
          marginLeft: 0,
        },
        flexDirection: 'column',
        '& .MuiFormControlLabel-root': {
          marginLeft: theme.spacing(3),
        },
      },
      '& .MuiIconButton-root': {
        cursor: isDragging ? 'grabbing' : 'grab',
      },
    },
  })
);

const FieldItem = React.forwardRef(
  (
    {
      isFieldDisabled,
      preview,
      setDataSectionItems,
      fieldsItems,
      templateData,
      dataSectionItems,
      containerId,
      setActiveId,
      fillBy,
      isActive,
      listeners,
      languages,
      style,
      isDragging,
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [popperAnchorEl, setPopperAnchorEl] = React.useState(null);

    const handleCardClick = React.useCallback((e) => {
      e.stopPropagation();
      setActiveId((ids) => ({ ...ids, cardId: id, sectionId: containerId }));
      setPopperAnchorEl(e.currentTarget);
    }, []);

    return (
      <>
        <Field
          {...props}
          isDragging={isDragging}
          ref={ref}
          type={type}
          isActive={isActive}
          templateData={templateData}
          className="dnd-field-item"
          onClick={handleCardClick}
        >
          {!isDragging ? (
            <>
              <RTL>
                <Box dir={templateData.primaryLang === 'ar' ? 'rtl' : 'ltr'}>
                  <Box sx={{ mb: !['inline'].includes(type) && 4 }}>
                    <IconButton {...listeners}>
                      <DndIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    {!['inline'].includes(type) && (
                      <Typography variant="body14">
                        {languages[templateData.primaryLang].title}
                      </Typography>
                    )}
                  </Box>
                  <Box display="flex" flex="1">
                    <FieldSwitcher
                      {...props}
                      type={type}
                      style={style}
                      isFieldDisabled={isFieldDisabled}
                      fillBy={fillBy}
                      placeholder={languages[templateData.primaryLang].placeholder}
                      options={languages[templateData.primaryLang].options}
                      initialValue={languages[templateData.primaryLang].value}
                      initialId={languages[templateData.primaryLang].selectedId}
                      attachmentButtonLabel={
                        languages[templateData.primaryLang].buttonLabel
                      }
                      cardId={id}
                      containerId={containerId}
                      templateData={templateData}
                      setDataSectionItems={setDataSectionItems}
                      currentInputLang={templateData.primaryLang}
                    />
                  </Box>
                </Box>
              </RTL>
              {templateData.secondaryLang
                && !['inline', 'attachment', 'signature'].includes(type) && (
                <>
                  <Divider orientation="vertical" flexItem mx={{ mx: 4 }} />
                  <RTL>
                    <Box dir={templateData.secondaryLang === 'ar' ? 'rtl' : 'ltr'}>
                      <Box
                        display="flex"
                        sx={{ mb: !['inline'].includes(type) && 4 }}
                      >
                        {!['inline'].includes(type) && (
                          <Typography variant="body14" sx={{ height: 26 }}>
                            {languages[templateData.secondaryLang].title}
                          </Typography>
                        )}
                      </Box>
                      <Box display="flex" flex="1">
                        <FieldSwitcher
                          {...props}
                          type={type}
                          style={style}
                          isFieldDisabled={isFieldDisabled}
                          fillBy={fillBy}
                          placeholder={languages[templateData.secondaryLang].placeholder}
                          options={languages[templateData.secondaryLang].options}
                          initialValue={languages[templateData.secondaryLang].value}
                          initialId={languages[templateData.secondaryLang].selectedId}
                          attachmentButtonLabel={languages[templateData.secondaryLang].buttonLabel}
                          cardId={id}
                          containerId={containerId}
                          templateData={templateData}
                          setDataSectionItems={setDataSectionItems}
                          currentInputLang={templateData.secondaryLang}
                        />
                      </Box>
                    </Box>
                  </RTL>
                </>
              )}
            </>
          ) : (
            <Box dispaly="flex">
              <Typography
                variant="body14"
                weight="bold"
                color="secondary.main"
                sx={{ ml: 6 }}
              >
                {languages[templateData.primaryLang].title}
              </Typography>
            </Box>
          )}
        </Field>
        <Popper
          keepMounted
          cardId={id}
          containerId={containerId}
          type={type}
          styleType={style ?? ''}
          fieldsItems={fieldsItems}
          templateData={templateData}
          fillBy={fillBy}
          setDataSectionItems={setDataSectionItems}
          dataSectionItems={dataSectionItems}
          open={isActive}
          anchorEl={popperAnchorEl}
        />
      </>
    );
  }
);

FieldItem.displayName = 'FieldItem';

export default FieldItem;
