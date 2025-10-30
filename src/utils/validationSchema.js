import * as Yup from 'yup';

export const petValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name too short')
    .required("Pet's name is required"),
  breed: Yup.string()
    .trim()
    .min(2, 'Breed too short')
    .required('Breed is required'),
  age: Yup.string()
    .matches(/^[0-9]+$/, 'Age must be a number')
    .nullable()
    .optional(),
});
