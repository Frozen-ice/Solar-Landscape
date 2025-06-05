import * as yup from 'yup';

export const enrollmentSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string()
    .required('Zip code is required')
    .matches(/^\d{5}?$/, 'Zip code must be in format 12345'),
  utility: yup.string()
    .oneOf(['PSEG', 'JCPL', 'ACE'])
    .required('Utility is required'),
  uan: yup.string().when('utility', {
    is: 'PSEG',
    then: () => yup.string()
      .matches(/^[0-9]{10}$/, 'PSEG UAN must be 10 digits')
      .required('UAN is required for PSEG'),
    otherwise: () => yup.string().when('utility', {
      is: 'JCPL',
      then: () => yup.string()
        .matches(/^[0-9]{12}$/, 'JCPL UAN must be 12 digits')
        .required('UAN is required for JCPL'),
      otherwise: () => yup.string()
    })
  }),
  assistanceProgram: yup.string()
    .oneOf(['Medicare', 'SNAP', ''], 'Invalid assistance program')
}); 