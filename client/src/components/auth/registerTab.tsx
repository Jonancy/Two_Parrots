import { useRegisterUserQuery } from "@/hooks/queries/auth/auth.query";
import { IUserRegisterDTO } from "@/interfaces/auth.interfaces";
import { userRegisterValidationSchema } from "@/schemas/auth.validationSchema";
import { useFormik } from "formik";
import TextInput from "../inputs/textInput";
import GoogleLogin from "../buttons/googleLogin";
import AuthButton from "../buttons/authButton";

export default function RegisterTab() {
  const { mutate } = useRegisterUserQuery();

  // const validationErrors = error?.response?.data?.errors;
  const formik = useFormik<IUserRegisterDTO>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userRegisterValidationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSettled: (success, error) => {
          if (success) {
            return formik.resetForm();
          }

          if (error) {
            if (error.response.data.errors) {
              error.response.data.errors.forEach((err) => {
                formik.setFieldError(err.field, err.message);
              });
            }
          }
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 mt-4 ">
      <TextInput
        name="name"
        type="text"
        formik={formik}
        key="name"
        placeholder="User Name"
      />
      <TextInput
        name="email"
        type="email"
        formik={formik}
        key="email"
        placeholder="Email"
      />
      <TextInput
        name="password"
        type="password"
        formik={formik}
        key="password"
        placeholder="Password"
      />
      <TextInput
        name="confirmPassword"
        type="password"
        formik={formik}
        key="confirmPassword"
        placeholder="Confirm Password"
      />
      <AuthButton />

      <div className="flex w-full justify-between items-center gap-2 ">
        <div className="border-b w-full border-black"></div>
        <div>
          <p className="text-sm">Or</p>
        </div>
        <div className="border-b w-full border-black"></div>
      </div>
      <div className="w-full">
        <GoogleLogin />
      </div>
    </form>
  );
}
