import { FormikProps } from "formik";

export interface IFormInputProps {
  name: string;
  type: string;
  placeholder: string;
  formik: FormikProps<any>;
  className?: string;
}

export interface IRadioInputProps {
  name: string;
  label: string;
  index: number;
  selectedVariant: number;
  handleVariantSelect: (index: number) => void;
}

export interface IClassNameProps {
  className?: string;
}

export interface IButtonProps extends IClassNameProps {
  handleOnClick: () => void;
  buttonName: string;
}
