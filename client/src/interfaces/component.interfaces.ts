import { FormikProps } from "formik";

export interface IFormInputProps {
  name: string;
  type: string;
  placeholder: string;
  formik: FormikProps<any>;
  className?: string;
  isDisabled?: boolean;
}

export interface IRadioInputProps {
  name: string;
  label: string;
  selectedValue: string;
  handleSelect: (value: string) => void;
}

export interface IClassNameProps {
  className?: string;
}

export interface IButtonProps extends IClassNameProps {
  handleOnClick: () => void;
  buttonName: string;
}

export interface ICheckBoxInputProps {
  name: string;
  className?: string;
  selectedValue: string;
  handleSelect: (value: string) => void;
}
