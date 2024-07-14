import { FormikProps } from "formik";

export interface IFormInputProps {
  name: string;
  type: string;
  placeholder: string;
  formik: FormikProps<any>;
}

export interface IRadioInputProps {
  name: string;
  label: string;
  index: number;
  selectedVariant: number;
  handleVariantSelect: (index: number) => void;
}
