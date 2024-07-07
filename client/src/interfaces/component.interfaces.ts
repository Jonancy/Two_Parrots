import { FormikProps } from "formik";

export interface IFormInputProps {
  name: string;
  type: string;
  placeholder: string;
  formik: FormikProps<any>;
}
