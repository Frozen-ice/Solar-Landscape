import React from 'react';
import TextInput from '../TextInput';

interface PersonalInformationProps {
  register: any;
  errors: any;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ register, errors }) => {
  return (
    <fieldset className="border-none space-y-6">
      <legend className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
        Personal Information
      </legend>
      <TextInput
        label="First Name"
        id="firstName"
        placeholder="e.g. John"
        error={errors.firstName?.message}
        register={register('firstName')}
        autoFocus
      />
      <TextInput
        label="Last Name"
        id="lastName"
        placeholder="e.g. Doe"
        error={errors.lastName?.message}
        register={register('lastName')}
      />
    </fieldset>
  );
};

export default PersonalInformation; 