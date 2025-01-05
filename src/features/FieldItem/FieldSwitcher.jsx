import * as React from 'react';
import SelectField from './Fields/SelectField';
import InputField from './Fields/InputField';
import RadioField from './Fields/RadioField';
import CheckboxField from './Fields/CheckboxField';
import NumberField from './Fields/NumberField';
import PhoneField from './Fields/PhoneField';
import SalaryField from './Fields/SalaryField';
import NameField from './Fields/NameField';
import DateField from './Fields/DateField';
import TimeField from './Fields/TimeField';
import DateTimeField from './Fields/DateTimeField';
import SignatureField from './Fields/SignatureField';
import AttachmentField from './Fields/AttachmentField';

// 'input' type default case
export default function FieldSwitcher({
  isFieldDisabled,
  fillBy,
  type,
  style,
  initialValue,
  isDrawAllowed,
  isUploadAllowed,
  initialId,
  options,
  placeholder,
  isPhoneMaskChecked,
  attachmentAllowedFileFormats,
  attachmentButtonLabel,
  maxFileSize,
  fileQuantityLimitation,
  phoneAllowedCountries,
  phoneDefaultCountry,
  currency,
  multiline,
  charMin,
  charMax,
  rowMin,
  rowMax,
  containerId,
  cardId,
  templateData,
  currentInputLang,
  setDataSectionItems,
}) {
  // if 2d language presented, define it in order to duplicate some data
  const otherLang = currentInputLang === templateData.primaryLang ? templateData.secondaryLang : templateData.primaryLang;
  const disabled = isFieldDisabled(fillBy);

  // this callback is collecting values from every input and setting changing values accordingly for every field
  // and if 2d language is exists, required fields will be duplicated with same options, e.g. [checkbox, dropdown, etc]
  const handleSetValue = React.useCallback((value, optId, isChecked) => {
    setDataSectionItems((data) => ({
      ...data,
      [containerId]: {
        ...data[containerId],
        items: data[containerId].items.map((item) => (
          item.id === cardId ? {
            ...item,
            languages: {
              ...item.languages,
              [currentInputLang]: {
                ...item.languages[currentInputLang],
                ...(!['checkbox', 'select', 'radio'].includes(item.type) && { value }),
                ...(['checkbox'].includes(item.type) && {
                  options: item.languages[currentInputLang].options.map((opt) => opt.id === optId ? { ...opt, isChecked } : opt),
                  value: item.languages[currentInputLang].options.filter((opt) => value.includes(opt.id)).map((opt) => opt.title),
                }),
                ...(['select', 'radio'].includes(item.type) && {
                  selectedId: value,
                  value: item.languages[currentInputLang].options.find((x) => x.id === value)?.title,
                  options: item.languages[currentInputLang].options.map((opt) => opt.id === optId ? { ...opt, isChecked } : { ...opt, isChecked: false }),
                }),
              },
              ...(otherLang && { [otherLang]: {
                ...item.languages[otherLang],
                ...(['checkbox'].includes(item.type) && {
                  options: item.languages[otherLang].options.map((opt) => opt.id === optId ? { ...opt, isChecked } : opt),
                  value: item.languages[otherLang].options.filter((opt) => value.includes(opt.id)).map((opt) => opt.title),
                }),
                ...(['select', 'radio'].includes(item.type) && {
                  selectedId: value,
                  value: item.languages[otherLang].options.find((x) => x.id === value)?.title,
                  options: item.languages[currentInputLang].options.map((opt) => opt.id === optId ? { ...opt, isChecked } : { ...opt, isChecked: false }),
                }),
                ...(['date', 'datetime', 'time', 'salary'].includes(item.type) && { value }),
              } }),
            }
          } : item)),
      },
    }));
  }, [initialValue, options]);

  const memoizedInitialValue = React.useMemo(() => initialValue, [initialValue])

  const renderContent = React.useCallback(() => {
    switch (type) {
    case 'attachment':
      return (
        <AttachmentField
          disabled={disabled}
          initialValue={memoizedInitialValue}
          allowedFormats={attachmentAllowedFileFormats}
          handleSetValue={handleSetValue}
          fileSizeLimit={maxFileSize}
          fileQuantityLimit={fileQuantityLimitation}
          buttonLabel={attachmentButtonLabel}
        />
      );
    case 'signature':
      return (
        <SignatureField
          disabled={disabled}
          isDrawAllowed={isDrawAllowed}
          isUploadAllowed={isUploadAllowed}
          handleSetValue={handleSetValue}
        />
      );
    case 'date':
      return (
        <DateField
          disabled={disabled}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'time':
      return (
        <TimeField
          disabled={disabled}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'datetime':
      return (
        <DateTimeField
          disabled={disabled}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          disabled={disabled}
          list={options}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'radio':
      return (
        <RadioField
          disabled={disabled}
          list={options}
          initialId={initialId}
          handleSetValue={handleSetValue}
        />
      );
    case 'select':
      return (
        <SelectField
          disabled={disabled}
          list={options}
          initialId={initialId}
          handleSetValue={handleSetValue}
          placeholder={placeholder}
        />
      );
    case 'number':
      return (
        <NumberField
          disabled={disabled}
          placeholder={placeholder}
          charMin={charMin}
          charMax={charMax}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'salary':
      return (
        <SalaryField
          disabled={disabled}
          placeholder={placeholder}
          charMin={charMin}
          charMax={charMax}
          currency={currency}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'phone':
      return (
        <PhoneField
          disabled={disabled}
          placeholder={placeholder}
          isPhoneMaskChecked={isPhoneMaskChecked}
          phoneAllowedCountries={phoneAllowedCountries}
          phoneDefaultCountry={phoneDefaultCountry}
          charMin={charMin}
          charMax={charMax}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'name':
      return (
        <NameField
          disabled={disabled}
          placeholder={placeholder}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'inline':
      return (
        <InputField
          disabled={disabled}
          multiline
          type={type}
          style={style}
          charMin={undefined}
          charMax={undefined}
          rowMin={2}
          rowMax={undefined}
          placeholder={placeholder}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    case 'multiline':
      return (
        <InputField
          disabled={disabled}
          charMin={charMin}
          charMax={charMax}
          rowMin={rowMin}
          rowMax={rowMax}
          placeholder={placeholder}
          multiline={multiline || true}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    default:
      return (
        <InputField
          disabled={disabled}
          charMin={charMin}
          charMax={charMax}
          placeholder={placeholder}
          multiline={multiline}
          initialValue={initialValue}
          handleSetValue={handleSetValue}
        />
      );
    }
  }, [
    disabled,
    type,
    style,
    isDrawAllowed,
    isUploadAllowed,
    initialId,
    placeholder,
    isPhoneMaskChecked,
    attachmentAllowedFileFormats,
    attachmentButtonLabel,
    maxFileSize,
    fileQuantityLimitation,
    phoneAllowedCountries,
    phoneDefaultCountry,
    currency,
    multiline,
    charMin,
    charMax,
    rowMin,
    rowMax,
    handleSetValue,
  ]);
  return (
    <>
      {renderContent()}
    </>
  )
}
FieldSwitcher.displayName = "FieldSwitcher";
