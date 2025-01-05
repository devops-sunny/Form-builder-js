import * as React from 'react';
import { styled, Grid, Box, Typography, Divider } from '@mui/material';
import formatDate from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import FieldSwitcher from '../FieldItem/FieldSwitcher';
import SubModelSection from '../Section/SubModelSection';
import SectionsWrapper from '../Section/SectionsWrapper';
import RTL from '../RTL';

const Section = styled(Box)(({ theme, templateData }) => ({
  backgroundColor: theme.palette.light.main,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 986,
  margin: '10px auto',
  boxShadow: '0px 2px 13px rgba(0, 0, 0, 0.02)',
  borderRadius: 8,
  '> .MuiBox-root': {
    display: 'flex',
    flex: 1,
    flexDirection: templateData.layout,
  },
}));

const Field = styled(Box)(({ theme, isVisible, preview, fillBy }) => ({
  display: isVisible ? 'flex' : 'none',
  flexDirection: 'column',
  flex: 1,
  padding: theme.spacing(4, 5.5),
  borderRadius: 8,
  '.MuiBox-root': {
    '> div': {
      flex: 1,
    },
  },
  '> span': {
    display: 'inline-block',
  },
  '& .MuiRadio-root': {
    padding: 0,
  },
  '& .MuiFormGroup-root': {
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2, 0, 2, 3),
      // TODO fix preview checkbox styles
      //'& span:nth-of-type(1)': {
      //border: `1px solid ${theme.palette.secondary.$80}`,
      //background: theme.palette.primary.$a4,
      //},
    },
  },
  '> .MuiTypography-root': {
    marginBottom: theme.spacing(3),
  },

  ...([preview.role].includes(fillBy) && {
    ' .MuiFormControl-root': {
      '&:not(:hover)': {
        background: theme.palette.primary.$a4,
      },
      '&:not(:active, :focus)': {
        outline: `1px solid ${theme.palette.secondary.$80}`,
      },
    },
  }),
}));

export default function Previewer({
  isFieldDisabled,
  dataSectionItems,
  setDataSectionItems,
  templateData,
  preview,
}) {
  // TODO divide into smaller components
  return (
    <Grid container item xs>
      <SectionsWrapper
        xs
        item
        sx={{
          backgroundColor: (theme) => theme.palette.light.$1,
          justifyContent: 'center',
          pb: 11,
        }}
      >
        {!Object.values(dataSectionItems).length ? (
          <Typography variant="body14" sx={{ alignSelf: 'center' }}>
            Add sections to preview them
          </Typography>
        ) : (
          Object.entries(dataSectionItems).map(([k, section]) => (
            <Section key={k} templateData={templateData}>
              {dataSectionItems[k].isTitleVisibleOnTheFinalDocument && (
                <>
                  <Typography variant="h6" sx={{ p: 4 }}>
                    {dataSectionItems[k].title}
                  </Typography>
                  <Divider />
                </>
              )}
              {section.subModel ? (
                <Box display="flex">
                  <SubModelSection currentSection={dataSectionItems[k]} />
                </Box>
              ) : (
                section.items.map(
                  ({ id, fillBy, isVisible, languages, style, type, ...props }) => (
                    <Box key={id}>
                      <RTL>
                        <Field
                          preview={preview}
                          isVisible={isVisible}
                          fillBy={fillBy}
                          dir={templateData.primaryLang === 'ar' ? 'rtl' : 'ltr'}
                        >
                          {!['inline'].includes(type) && (
                            <Typography
                              sx={{ display: 'block', mb: !['inline'].includes(type) && 4 }}
                              variant="body14"
                              weight="medium"
                              color="dark.main"
                            >
                              {languages[templateData.primaryLang].title}
                            </Typography>
                          )}
                          <Box display="flex">
                            {(preview.isActive
                              && ['recipient'].includes(preview.role)
                              && ['sender'].includes(fillBy))
                            || (['recipient'].includes(templateData.editorRole)
                              && ['sender'].includes(fillBy)) ? (
                                languages[templateData.primaryLang].value
                              && languages[templateData.primaryLang].value.length
                                !== 0 ? (
                                    <Typography
                                      sx={{
                                        ...(['inline'].includes(type) && {
                                          fontFamily: style.fontFamily,
                                          fontSize: `${style.fontSize}px`,
                                          fontStyle:
                                        style.textDecoration.includes('italic')
                                        && 'italic',
                                          fontWeight:
                                        style.textDecoration.includes('bold') && 700,
                                          textDecoration:
                                        style.textDecoration.includes('underline')
                                        && 'underline',
                                          textAlign: style.textAlign,
                                        }),
                                      }}
                                    >
                                      {![
                                        'name',
                                        'time',
                                        'date',
                                        'datetime',
                                        'checkbox',
                                      ].includes(type)
                                    && languages[templateData.primaryLang].value}
                                      {['date'].includes(type)
                                    && formatDate(
                                      fromUnixTime(
                                        languages[templateData.primaryLang].value
                                          / 1000
                                      ),
                                      'PP'
                                    )}
                                      {['time'].includes(type)
                                    && formatDate(
                                      fromUnixTime(
                                        languages[templateData.primaryLang].value
                                          / 1000
                                      ),
                                      'pp'
                                    )}
                                      {['datetime'].includes(type)
                                    && formatDate(
                                      new Date(
                                        languages[templateData.primaryLang].value
                                      ),
                                      'PPpp'
                                    )}
                                      {['name', 'checkbox'].includes(type) && (
                                        <Box dispaly="flex">
                                          <div className="d-flex flex-wrap">
                                            {languages[
                                              templateData.primaryLang
                                            ].value.map((x) => (
                                              <Box
                                                key={`${k}-${x}`}
                                                dispaly="flex"
                                                sx={
                                                  ['checkbox'].includes(type) && {
                                                    flexDirection: 'column',
                                                  }
                                                }
                                              >
                                                {x}
                                              </Box>
                                            ))}
                                          </div>
                                        </Box>
                                      )}
                                    </Typography>
                                  ) : (
                                    <Typography
                                      variant="body14rich"
                                      sx={{ color: (theme) => theme.palette.dark.$40 }}
                                    >
                                  No data...
                                    </Typography>
                                  )
                              ) : (
                                <FieldSwitcher
                                  {...props}
                                  type={type}
                                  style={style}
                                  isFieldDisabled={isFieldDisabled}
                                  fillBy={fillBy}
                                  placeholder={
                                    languages[templateData.primaryLang].placeholder
                                  }
                                  options={languages[templateData.primaryLang].options}
                                  initialValue={
                                    languages[templateData.primaryLang].value
                                  }
                                  initialId={
                                    languages[templateData.primaryLang].selectedId
                                  }
                                  attachmentButtonLabel={
                                    languages[templateData.primaryLang].buttonLabel
                                  }
                                  cardId={id}
                                  containerId={k}
                                  templateData={templateData}
                                  setDataSectionItems={setDataSectionItems}
                                  currentInputLang={templateData.primaryLang}
                                />
                              )}
                          </Box>
                        </Field>
                      </RTL>
                      {templateData.secondaryLang
                        && !['inline', 'attachment', 'signature'].includes(type) && (
                        <>
                          <Divider
                            orientation="vertical"
                            flexItem
                            mx={{ mx: 4 }}
                          />
                          <RTL>
                            <Field
                              preview={preview}
                              isVisible={isVisible}
                              fillBy={fillBy}
                              dir={
                                templateData.secondaryLang === 'ar' ? 'rtl' : 'ltr'
                              }
                            >
                              {!['inline'].includes(type) && (
                                <Typography
                                  variant="body14"
                                  weight="medium"
                                  color="dark.main"
                                >
                                  {languages[templateData.secondaryLang].title}
                                </Typography>
                              )}
                              <Box display="flex">
                                {(preview.isActive
                                    && ['recipient'].includes(preview.role)
                                    && ['sender'].includes(fillBy))
                                  || (['recipient'].includes(templateData.editorRole)
                                    && ['sender'].includes(fillBy)) ? (
                                    <Box>
                                      {languages[templateData.secondaryLang].value
                                      && languages[templateData.secondaryLang].value
                                        .length !== 0 ? (
                                          <Typography
                                            sx={{
                                              ...(['inline'].includes(type) && {
                                                fontFamily: style.fontFamily,
                                                fontSize: `${style.fontSize}px`,
                                                fontStyle:
                                                style.textDecoration.includes(
                                                  'italic'
                                                ) && 'italic',
                                                fontWeight:
                                                style.textDecoration.includes(
                                                  'bold'
                                                ) && 700,
                                                textDecoration:
                                                style.textDecoration.includes(
                                                  'underline'
                                                ) && 'underline',
                                                textAlign: style.textAlign,
                                              }),
                                            }}
                                          >
                                            {![
                                              'name',
                                              'time',
                                              'date',
                                              'datetime',
                                              'checkbox',
                                            ].includes(type)
                                            && languages[templateData.secondaryLang]
                                              .value}
                                            {['date'].includes(type)
                                            && formatDate(
                                              fromUnixTime(
                                                languages[templateData.primaryLang]
                                                  .value / 1000
                                              ),
                                              'PP'
                                            )}
                                            {['time'].includes(type)
                                            && formatDate(
                                              fromUnixTime(
                                                languages[templateData.primaryLang]
                                                  .value / 1000
                                              ),
                                              'pp'
                                            )}
                                            {['datetime'].includes(type)
                                            && formatDate(
                                              new Date(
                                                languages[
                                                  templateData.primaryLang
                                                ].value
                                              ),
                                              'PPpp'
                                            )}
                                            {['name', 'checkbox'].includes(type) && (
                                              <Box dispaly="flex">
                                                {languages[
                                                  templateData.secondaryLang
                                                ].value.map((x) => (
                                                  <Box
                                                    key={`${k}-${x}`}
                                                    dispaly="flex"
                                                    sx={
                                                      ['checkbox'].includes(type) && {
                                                        flexDirection: 'column',
                                                      }
                                                    }
                                                  >
                                                    {x}
                                                  </Box>
                                                ))}
                                              </Box>
                                            )}
                                          </Typography>
                                        ) : (
                                          <Typography
                                            variant="body14rich"
                                            sx={{
                                              color: (theme) => theme.palette.dark.$40,
                                            }}
                                          >
                                          No data...
                                          </Typography>
                                        )}
                                    </Box>
                                  ) : (
                                    <FieldSwitcher
                                      {...props}
                                      type={type}
                                      style={style}
                                      isFieldDisabled={isFieldDisabled}
                                      fillBy={fillBy}
                                      placeholder={
                                        languages[templateData.secondaryLang]
                                          .placeholder
                                      }
                                      options={
                                        languages[templateData.secondaryLang].options
                                      }
                                      initialValue={
                                        languages[templateData.secondaryLang].value
                                      }
                                      initialId={
                                        languages[templateData.secondaryLang]
                                          .selectedId
                                      }
                                      attachmentButtonLabel={
                                        languages[templateData.secondaryLang]
                                          .buttonLabel
                                      }
                                      cardId={id}
                                      containerId={k}
                                      templateData={templateData}
                                      setDataSectionItems={setDataSectionItems}
                                      currentInputLang={templateData.secondaryLang}
                                    />
                                  )}
                              </Box>
                            </Field>
                          </RTL>
                        </>
                      )}
                    </Box>
                  )
                )
              )}
            </Section>
          ))
        )}
      </SectionsWrapper>
    </Grid>
  );
}
