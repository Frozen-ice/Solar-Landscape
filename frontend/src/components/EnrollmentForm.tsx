import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import PersonalInformation from './enrollment-form/PersonalInformation';
import AddressSection from './enrollment-form/AddressSection';
import UtilityInformation from './enrollment-form/UtilityInformation';
import { enrollmentSchema } from '../validation/enrollmentSchema';
import { enrollmentService } from '../services/enrollmentService';
import { normalizeUtility } from '../utils/utilityHelpers';
import type { SubmitResult, EnrollmentFormData } from '../types/enrollment';

const EnrollmentForm = () => {
  const [addressValid, setAddressValid] = useState<null | boolean>(null);
  const [utilityOptions] = useState(['PSEG', 'JCPL', 'ACE']);
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(enrollmentSchema),
    mode: 'onChange',
  });

  const zip = watch('zip');
  const utility = watch('utility');

  React.useEffect(() => {
    if (zip && zip.length === 5) {
      enrollmentService.getUtilityByZip(zip)
        .then(res => {
          if (res.utility) {
            const normalizedUtility = normalizeUtility(res.utility);
            if (normalizedUtility === 'PSEG' || normalizedUtility === 'JCPL' || normalizedUtility === 'ACE') {
              setValue('utility', normalizedUtility);
            }
          }
        })
        .catch(() => {});
    }
  }, [zip, setValue]);

  React.useEffect(() => {
    setAddressValid(null);
  }, [watch('address'), watch('city'), watch('state'), watch('zip')]);

  const validateAddress = async (data: {
    address: string;
    city: string;
    state: string;
    zip: string;
  }) => {
    setLoading(true);
    setAddressValid(null);
    try {
      const res = await enrollmentService.validateAddress(data);
      setAddressValid(res.valid);
      if (res.valid) {
        toast.success('Address is valid!');
      } else {
        if (res.reason === 'Address components do not match') {
          const details = res.details;
          const mismatches = [];
          if (!details.cityMatch) mismatches.push('city');
          if (!details.stateMatch) mismatches.push('state');
          if (!details.zipMatch) mismatches.push('ZIP code');
          toast.error(`Invalid address: ${mismatches.join(', ')} do not match`);
        } else {
          toast.error('Invalid address: ' + (res.reason || 'Address not found'));
        }
      }
    } catch {
      setAddressValid(null);
      toast.error('Address validation failed.');
    }
    setLoading(false);
  };

  const handleAddressValidation = () => {
    const addressData = {
      address: watch('address'),
      city: watch('city'),
      state: watch('state'),
      zip: watch('zip')
    };
    validateAddress(addressData);
  };

  const onSubmit = async (data: EnrollmentFormData) => {
    // If address has not been validated, validate it first
    if (addressValid === null) {
      setLoading(true);
      const addressData = {
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip
      };
      const res = await enrollmentService.validateAddress(addressData);
      setAddressValid(res.valid);
      setLoading(false);
      if (!res.valid) {
        toast.error('Please provide a valid address before submitting.');
        return;
      }
    }
    if (addressValid === false) {
      toast.error('Please provide a valid address before submitting.');
      return;
    }
    setLoading(true);
    setSubmitResult(null);
    try {
      const res = await enrollmentService.submitEnrollment(data);
      setSubmitResult({ success: true, id: res.id });
      toast.success(`Enrollment successful! ID: ${res.id}`);
    } catch (err) {
      let errorMsg = 'Unknown error';
      if (err instanceof Error) {
        errorMsg = err.message;
      }
      setSubmitResult({ success: false, error: errorMsg });
      toast.error(`Error: ${errorMsg}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-8 px-2">
      <form className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl border border-blue-100 space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-tight drop-shadow">
          Subscriber Enrollment
        </h2>

        <PersonalInformation register={register} errors={errors} />
        <AddressSection
          register={register}
          errors={errors}
          loading={loading}
          addressValid={addressValid}
          onValidateAddress={handleAddressValidation}
        />
        <UtilityInformation
          register={register}
          errors={errors}
          utilityOptions={utilityOptions}
          zip={zip}
          utility={utility}
        />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:scale-95 text-white text-lg font-bold shadow-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={addressValid === false || loading}
        >
          {loading ? <Spinner /> : null}
          {loading ? 'Submitting...' : 'Submit Enrollment'}
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;