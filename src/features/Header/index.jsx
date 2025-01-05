import * as React from 'react';
import {useNavigate} from 'react-router-dom';
//import { GlobalHistory, showError, showSuccess } from '../../../../helpers';
import axios from 'axios';
import {
  Grid,
  Stack,
  Chip,
  Select,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
  MenuItem,
  Switch,
} from '@mui/material';
import {
  CrossIcon,
  MoreIcon,
  ArrowRightIcon,
  CornerDownIcon,
  IndicatorIcon,
} from '../../icons';
import Popover from '../../components/Popover';
import Modal from '../../components/Modal';
import ActionModalBody from './ActionModal';
import CreatorSaveTemplateMenu from './CreatorSaveTemplateMenu';
// import {toSnakeCase} from '../../utils/helpers/toSnakeCase';

//import urls from '../../../../api/urls';
//import { generateHeaders } from '../../../../api/headers';
// import { SignForm, SendEmailWithOffer, UpdateOffer } from 'services';
// import { OffersStatusesEnum } from 'enums/Shared/OffersStatuses.Enum';
// import { useSelector } from 'react-redux';

// FIX why using 2 differnt modals at the same component?
// TODO prefer using the Modal with design that form-builder follows could be fount in '../../compnonents/Modal';
//import { DialogComponent } from 'components';

export default function Header({
  preview,
  setPreview,
  templateData,
  dataSectionItems,
  lastTimeChanged,
  offerData,
}) {
  const history = useNavigate();
  const [isOpen, setOpen] = React.useState(false);
  const modalRevokeBodyText = `If you unpublish the form, this will mean that the recipient will no longer be able to see the form via the link you sent. To make the form available for recipient again, you will have to publish it on again.
Are you sure you want to unpublish the form?`;
  const modalWithdrawBodyText = `If you unpublish the form, the members will no longer be able to see the form you requested to approve. To make the form available for members, you will have to sent it once again.
Are you sure you want to withdraw the form from review?`;
  // const candidateUserReducer = useSelector((state) => state?.candidateUserReducer);

  const handleWithdraw = () => {
    // TODO widthdraw modal action
  };
  const handleRevoke = () => {
    // TODO revoke modal action
  };

  const sendData = () => {
    const template = { ...templateData, sections: dataSectionItems };

    console.log(template)
    // if (!templateData.uuid)
    //   axios.post(
    //     urls.formBuilder.CREATE_TEMPLATE,
    //     {
    //       ...toSnakeCase(template),
    //       type_uuid: templateData.typeUUID,
    //     },
    //     { headers: generateHeaders() }
    //   );
    // else
    //   axios.put(
    //     urls.formBuilder.UPDATE_TEMPLATE,
    //     {
    //       ...toSnakeCase(template),
    //       uuid: templateData.uuid,
    //     },
    //     { headers: generateHeaders() }
    //   );

    // history.push('/recruiter/offers');
  };

  // const SendEmailWithOfferHandler = React.useCallback(
  //   async (form_uuid) => {
  //     const response = await SendEmailWithOffer({
  //       form_uuid,
  //     });
  //     if (response && (response.status === 201 || response.status === 200)) {
  //       console.warn('An email with offer is sent to candidate successfully');
  //       history.push(
  //         `/recruiter/job/manage/pipeline/${offerData.jobUuid}?candidate_uuid=${offerData.candidateUuid}&source=1`
  //       );
  //     } else console.warn('Shared:failed-to-get-saved-data', response);
  //   },
  //   [offerData]
  // );

  // const sendOffer = React.useCallback(async () => {
  //   const template = { ...templateData, sections: dataSectionItems };
  //   const response = await UpdateOffer({
  //     uuid: offerData.uuid,
  //     form_data: toSnakeCase(template),
  //     status: OffersStatusesEnum.WaitingToBeSigned.key,
  //   });
  //   if (response && (response.status === 201 || response.status === 200)) {
  //     console.warn(`offer-updated-successfully`);
  //     if (response.data.results.status === OffersStatusesEnum.WaitingToBeSigned.key)
  //       SendEmailWithOfferHandler(offerData.uuid);
  //   } else console.warn('Shared:failed-to-get-saved-data', response);
  // }, [dataSectionItems, offerData, templateData]);

  // const sendOffer = () => {
  //   // TODO figure out status to be more sophisticated
  //   const template = { ...templateData, sections: dataSectionItems };
  //   axios.put(
  //     urls.offer.UPDATE_OFFER,
  //     {
  //       form_data: toSnakeCase(template),
  //       uuid: offerData.uuid,
  //       status: 4,
  //     },
  //     { headers: generateHeaders() }
  //   );

  //   history.push(
  //     `/recruiter/job/manage/pipeline/${offerData.jobUuid}?candidate_uuid=${offerData.candidateUuid}&source=1`
  //   );
  // };

  // const signOffer = () => {
  //   const template = { ...templateData, sections: dataSectionItems };
  //   //TODO figure out headers later on
  //   axios.put(
  //     urls.offer.UPDATE_OFFER,
  //     {
  //       form_data: toSnakeCase(template),
  //       uuid: offerData.uuid,
  //       status: 5,
  //     },
  //     { headers: {} }
  //   );
  // };

  const handleClose = () => {
    if (!templateData.source) history.push('/recruiter/offers');

    if (templateData.source === '1')
      history.push(
        `/recruiter/job/manage/pipeline/${offerData.jobUuid}?candidate_uuid=${offerData.candidateUuid}&source=1`
      );
  };

  const handlePreviewChange = () => {
    setPreview((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
    if (!preview.isActive) history.push('/form-builder/info');
    // TODO figure out why goBack is not working
    //history.goBack();
    else history.push('/form-builder/edit');
  };

  const handleRoleChange = ({ target: { value } }) =>
    setPreview((prev) => ({ ...prev, role: value }));

  // const signFormHandler = React.useCallback(async () => {
  //   const form = { ...offerData, sections: dataSectionItems };
  //   const response = await SignForm({
  //     body: {
  //       form_data: {
  //         ...toSnakeCase(form),
  //       },
  //       form_uuid: offerData.uuid,
  //     },
  //     token: candidateUserReducer?.token,
  //     company_uuid: candidateUserReducer?.company?.uuid,
  //     account_uuid: candidateUserReducer?.account?.uuid,
  //   });
  //   if (response.status === 200 && response.data.results.saved === true)
  //     setOpen(true);
  //   else console.warn('failed-to-get-saved-data', response);
  // }, [candidateUserReducer, dataSectionItems, offerData]);

  return (
    <Grid
      container
      sx={{
        padding: (theme) => theme.spacing(4.5, 5, 4.5, 8),
        boxShadow: '0px -1px 0px 0px #F4F4F4 inset',
        background: (theme) => theme.palette.light.main,
        height: 92,
      }}
    >
      <Grid item container xs direction="column" alignItems="flex-start">
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <Typography variant="h3" lh="rich">
            {templateData.title}
          </Typography>
          {!preview.isActive && (
            <>
              <Chip
                icon={<IndicatorIcon sx={{ color: 'dark.$40' }} />}
                label={
                  ['public'].includes(templateData.status)
                    ? 'Waiting for signature'
                    : ['review'].includes(templateData.status)
                      ? 'Waiting for approval'
                      : 'Draft'
                }
                variant="xs"
                bg="darka6"
                sx={{
                  mr: 1.5,
                  ml: 2.5,
                  pr: 2,
                  pl: 0.5,
                  py: 0.5,
                  color: 'dark.$60',
                  '> .MuiChip-icon': {
                    m: 0,
                    fontSize: 18,
                    color: 'dark.$40',
                  },
                }}
              />
              <IconButton aria-label="more options">
                <MoreIcon />
              </IconButton>
            </>
          )}
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          {!preview.isActive && (
            <Chip
              label="Non-residents"
              radius="sharp"
              variant="s"
              bg="darka6"
              sx={{ py: 0 }}
            />
          )}
          {!preview.isActive && (
            <Typography
              sx={{ fontSize: 11, height: 21, ml: 2.5 }}
              lh="double"
              variant="caption"
              color="dark.$40"
            >
              {`Changed ${lastTimeChanged} ago`}
            </Typography>
          )}
          {preview.isActive && (
            <Typography sx={{ height: 21 }} variant="caption" color="dark.$40">
              Preview mode
            </Typography>
          )}
        </Stack>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {['creator', 'sender'].includes(templateData.editorRole)
          && (['review'].includes(templateData.status) ? (
            <Modal
              width={480}
              title="Withdraw to make changes?"
              component={
                <ActionModalBody
                  bodyText={modalWithdrawBodyText}
                  btnText="withdraw"
                  handleAction={handleWithdraw}
                />
              }
            >
              <Button variant="border" size="m">
                Withdraw to edit
              </Button>
            </Modal>
          ) : ['public'].includes(templateData.status) ? (
            <Modal
              width={480}
              title="Revoke public access?"
              component={
                <ActionModalBody
                  bodyText={modalRevokeBodyText}
                  btnText="Revoke"
                  handleAction={handleRevoke}
                />
              }
            >
              <Button variant="border" size="m">
                Revoke public access
              </Button>
            </Modal>
          ) : (
            <>
              <Switch onChange={handlePreviewChange} />
              <Typography
                sx={{
                  margin: (theme) => theme.spacing(0, 5, 0, 2),
                  userSelect: 'none',
                }}
              >
                Preview mode
              </Typography>
              <Select
                id="popper-select-role-preview"
                value={preview.role}
                variant="standard"
                disableUnderline
                sx={{
                  border: (theme) => `1px solid ${theme.palette.dark.$8}`,
                  p: 0.5,
                  ml: -1.5,
                  mr: 2,
                  '.MuiSelect-select': {
                    display: 'flex',
                  },
                }}
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
              {['creator'].includes(templateData.editorRole) && !preview.isActive && (
                <ButtonGroup
                  variant="contained"
                  sx={{
                    '> .MuiButton-root:nth-of-type(1)': {
                      borderColor: (theme) => theme.palette.light.$1,
                    },
                  }}
                >
                  <Button onClick={sendData} variant="primary" size="m">
                    Save & continue
                  </Button>
                  <Popover>
                    <Button
                      variant="primary"
                      size="m"
                      sx={{ borderLeft: 'light.main' }}
                    >
                      <CornerDownIcon color="light.main" />
                    </Button>
                    <CreatorSaveTemplateMenu />
                  </Popover>
                </ButtonGroup>
              )}
              {['sender'].includes(templateData.editorRole) && (
                <Button
                  /* onClick={sendOffer} */
                  variant="primary"
                  size="m"
                  endIcon={<ArrowRightIcon />}
                >
                  {preview.isActive ? 'Use this template' : 'Continue'}
                </Button>
              )}
            </>
          ))}
        {['recipient'].includes(templateData.editorRole) ? (
          <Button
            // TODO eixit or smth
            // onClick={signFormHandler}
            variant="primary"
            size="m"
          >
            Done
          </Button>
        ) : (
          <IconButton
            onClick={handleClose}
            aria-label="close"
            sx={{ padding: '2px', ml: (theme) => theme.spacing(8) }}
          >
            <CrossIcon />
          </IconButton>
        )}
      </Stack>
      {/* <DialogComponent */}
      {/*   maxWidth="md" */}
      {/*   dialogContent={ */}
      {/*     <div className="d-flex-center mt-4"> */}
      {/*       <div className="d-flex-column p-4"> */}
      {/*         <div className="fw-bold fz-30px pb-3">Thank you!</div> */}
      {/*         <div className="pb-3"> */}
      {/*           Your offer has been signed. We will get in touch with you as soon as */}
      {/*           receive email notification. Download a copy of the form you signed */}
      {/*           below. */}
      {/*         </div> */}
      {/*         <Button */}
      {/*           // TODO server req to download pdf */}
      {/*           // onCLick={} */}
      {/*           startIcon={<ArrowRightIcon sx={{ transform: 'rotate(90deg)' }} />} */}
      {/*           variant="border" */}
      {/*           size="m" */}
      {/*           sx={{ mr: 2 }} */}
      {/*         > */}
      {/*           Download PDF */}
      {/*         </Button> */}
      {/*         <dov className="c-green-primary d-flex-h-center mt-4">{`(  You may close this tab at any time  )`}</dov> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   } */}
      {/*   isOpen={isOpen} */}
      {/* /> */}
    </Grid>
  );
}
