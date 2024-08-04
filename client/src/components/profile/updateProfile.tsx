import { Switch } from "@radix-ui/react-switch";
import { Button } from "../ui/button";
import TextInput from "../inputs/textInput";
import { useFormik } from "formik";
import { IUserState } from "@/interfaces/user.interfaces";
import * as Yup from "yup";
import { IPasswordChangeDTO, IUpdateUserDetailsDTO } from "@/dtos/user.dto";
import {
  useUpdateUserGeneralDetailsQuery,
  useUpdateUserPasswordQuery,
} from "@/hooks/queries/user/user.query";

const passwordValidationSchema = (password: boolean) =>
  Yup.object().shape({
    currentPassword: password
      ? Yup.string().required("Current password is required")
      : Yup.string(),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

export default function UpdateProfile({
  name,
  email,
  phoneNumber,
  userId,
  location,
  password,
}: Readonly<IUserState & { password: boolean }>) {
  const generalDetailsQuery = useUpdateUserGeneralDetailsQuery();

  const passwordDetailsQuery = useUpdateUserPasswordQuery();

  const formik = useFormik<IUpdateUserDetailsDTO>({
    initialValues: {
      name: name,
      email: email,
      location: location,
      phoneNumber: phoneNumber,
    },
    onSubmit: (values) => {
      if (userId)
        generalDetailsQuery.mutate({
          user: { ...values, phoneNumber: values.phoneNumber?.toString() },
          userId,
        });
    },
  });

  const passwordFormik = useFormik<IPasswordChangeDTO>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema(password),
    onSubmit: (values) => {
      console.log(values);

      if (userId)
        passwordDetailsQuery.mutate({
          user: values,
          userId,
        });
    },
  });

  console.log(userId);
  console.log(passwordFormik.errors);

  const isPasswordFormValidAndTouched =
    passwordFormik.isValid &&
    (passwordFormik.touched.currentPassword ||
      passwordFormik.touched.newPassword ||
      passwordFormik.touched.confirmPassword);

  return (
    <div className="grid gap-6">
      <div>
        <div>
          <h1 className="font-bold">Account Settings</h1>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className="mt-2">
            <h1 className="font-semibold">Personal Information</h1>
            <TextInput
              name="name"
              placeholder="Name"
              type="text"
              formik={formik}
            />
            <TextInput
              name="phoneNumber"
              placeholder="Phone Number"
              type="number"
              formik={formik}
            />
            <TextInput
              name="email"
              placeholder="Email"
              type="email"
              className="cursor-not-allowed"
              formik={formik}
              isDisabled={true}
            />
            <TextInput
              name="location"
              placeholder="Location "
              type="text"
              formik={formik}
            />
            <Button type="submit" disabled={!formik.dirty}>
              Save Changes
            </Button>
          </form>
          <form onSubmit={passwordFormik.handleSubmit} className="mt-2">
            <h1 className="font-semibold">Password</h1>
            <p className="text-xs font-semibold text-gray-400">
              Note if you have signed up using oauth like google you can add new
              password for your account and can login through it!
            </p>
            {password && (
              <TextInput
                name="currentPassword"
                placeholder="Current Password"
                type="password"
                formik={passwordFormik}
              />
            )}
            <TextInput
              name="newPassword"
              placeholder="New Password"
              type="password"
              formik={passwordFormik}
            />
            <TextInput
              name="confirmPassword"
              placeholder="confirmPassword"
              type="password"
              formik={passwordFormik}
            />
            <Button type="submit" disabled={!isPasswordFormValidAndTouched}>
              Save Changes
            </Button>
          </form>
        </div>
      </div>
      <div>
        <div>
          <h1>Notification Settings</h1>
        </div>
        <div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Order Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about your orders
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Product Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Receive personalized product recommendations
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Marketing Announcements</h4>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new products and sales
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
