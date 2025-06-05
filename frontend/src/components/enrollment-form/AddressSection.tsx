import React from 'react';
import TextInput from '../TextInput';
import Spinner from '../Spinner';

interface AddressSectionProps {
  register: any;
  errors: any;
  loading: boolean;
  addressValid: boolean | null;
  onValidateAddress: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  register,
  errors,
  loading,
  addressValid,
  onValidateAddress,
}) => {
  return (
    <fieldset className="border-none space-y-6">
      <legend className="text-xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
        Address
      </legend>
      <TextInput
        label="Address"
        id="address"
        placeholder="e.g. 123 Main St"
        error={errors.address?.message}
        register={register('address')}
      />
      <TextInput
        label="City"
        id="city"
        placeholder="e.g. Bayonne"
        error={errors.city?.message}
        register={register('city')}
      />
      <TextInput
        label="State"
        id="state"
        placeholder="e.g. NJ"
        error={errors.state?.message}
        register={register('state')}
      />
      <TextInput
        label="ZIP Code"
        id="zip"
        placeholder="e.g. 07002"
        error={errors.zip?.message}
        register={register('zip')}
        maxLength={5}
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={onValidateAddress}
          disabled={loading}
          className="btn btn-outline btn-sm rounded-lg border-blue-400 text-blue-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300 transition-all"
        >
          {loading ? <Spinner /> : null}
          {loading ? 'Validating...' : 'Validate Address'}
        </button>
        {addressValid === true && (
          <span className="text-green-600 font-medium">Address is valid!</span>
        )}
        {addressValid === false && (
          <span className="text-red-600 font-medium">Invalid address.</span>
        )}
      </div>
    </fieldset>
  );
};

export default AddressSection; 