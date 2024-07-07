import TextInput from "@/components/inputs/textInput";
import { ILoginDTO } from "@/interfaces/auth.interfaces";
import { useLoginUserQuery } from "@/queries/auth/userLogin.query";
import { userLoginValidationSchema } from "@/schemas/auth.validationSchema";
import { useFormik } from "formik";

export default function LoginPage() {
  const login = useLoginUserQuery();
  const validationErrors = login?.error?.response?.data?.errors;
  const formik = useFormik<ILoginDTO>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginValidationSchema,
    onSubmit: (values) => {
      login.mutate(values, {
        onSuccess: () => {
          formik.resetForm();
        },
        onError: (error: any) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            error.response.data.errors.forEach((err: any) => {
              formik.setFieldError(err.field, err.message);
            });
          }
        },
      });
    },
  });

  console.log(validationErrors);
  console.log(login.data);

  return (
    <div className="w-full h-screen bg-blue-700 flex flex-col justify-center items-center">
      <div className="bg-white rounded-md p-4">
        <p className="text-center font-semibold text-2xl">Login</p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 mt-4 "
        >
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
          <button
            className="bg-blue-700 p-2 rounded-md text-white mt-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
