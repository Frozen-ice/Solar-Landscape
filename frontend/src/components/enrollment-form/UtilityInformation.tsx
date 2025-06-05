import React from 'react';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';

interface UtilityInformationProps {
  register: any;
  errors: any;
  utilityOptions: string[];
  zip: string;
  utility: string;
}

const UtilityInformation: React.FC<UtilityInformationProps> = ({
  register,
  errors,
  utilityOptions,
  zip,
  utility,
}) => {
  return (
    <fieldset className="border-none space-y-6">
      <legend className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
        Utility Information
      </legend>
      <SelectInput
        label="Utility"
        id="utility"
        options={[
          { value: '', label: 'Select Utility' },
          ...utilityOptions.map((u) => ({ value: u, label: u })),
        ]}
        error={errors.utility?.message}
        register={register('utility')}
        disabled={!!zip && !!utility}
      />
      <TextInput
        label="Utility Account Number (UAN)"
        id="uan"
        placeholder={
          utility === 'PSEG'
            ? '10 digits'
            : utility === 'JCPL'
            ? '12 digits'
            : 'Enter UAN'
        }
        error={errors.uan?.message}
        register={register('uan')}
      />
      <SelectInput
        label="Assistance Program"
        id="assistanceProgram"
        options={[
          { value: '', label: 'None' },
          { value: 'Medicare', label: 'Medicare' },
          { value: 'SNAP', label: 'SNAP' },
        ]}
        error={errors.assistanceProgram?.message}
        register={register('assistanceProgram')}
      />
    </fieldset>
  );
};

export default UtilityInformation; 