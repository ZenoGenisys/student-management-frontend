import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.date().nullable().required('Date of Birth is required'),
  bloodGroup: Yup.string().required('Blood Group is required'),
  joiningDate: Yup.date().nullable().required('Joining Date is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  grade: Yup.string().required('Grade is required'),
  center: Yup.string().required('Center is required'),
  batch: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one day')
    .required('Batch is required'),
  schoolName: Yup.string().required('school name is required'),
  status: Yup.string().required('Status is required'),
  address: Yup.string().required('Address is required'),
  parentDetails: Yup.object({
    fatherName: Yup.string().required('Father Name is required'),
    motherName: Yup.string().required('Mother Name is required'),
    fatherPhoneNumber: Yup.string()
      .required('Father Phone Number is required')
      .matches(/^[0-9]{10}$/, 'Father Phone Number must be 10 digits'),
    motherPhoneNumber: Yup.string()
      .required('Mother Phone Number is required')
      .matches(/^[0-9]{10}$/, 'Mother Phone Number must be 10 digits'),
    fatherEmail: Yup.string().required('Father Email is required').email('Enter a valid email'),
    motherEmail: Yup.string().required('Mother Email is required').email('Enter a valid email'),
    fatherOccupation: Yup.string().required('Father Occupation is required'),
    motherOccupation: Yup.string().required('Mother Occupation is required'),
  }),
  levelDetails: Yup.array().of(
    Yup.object({
      level: Yup.number().required(),
      date: Yup.date().nullable().required('Date is required'),
      document: Yup.string().required('Document is required'),
      remarks: Yup.string().required('Remarks are required'),
    }),
  ),
});
