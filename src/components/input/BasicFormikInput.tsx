import {
  Field,
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from "formik";
import React, { ReactNode } from "react";
import { toast } from "react-toastify";
interface Props {
  name: string;
  icon?: ReactNode;
  title?: string;
  placeholder?: string;
}
export default function BasicFormikInput({
  name,
  icon,
  title,
  placeholder,
}: Props) {
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<FormikValues> | any;
    touched: FormikTouched<FormikValues>;
  } = useFormikContext();
  const hasError = errors[name] && touched[name];
  React.useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        toast.warn(errors[name], { autoClose: false, closeButton: false });
      }, 400);
    }
    return () => {
      toast.dismiss();
    };
  }, [errors, touched]);
  return (
    <div className="flex flex-col w-full">
      <label>{title}</label>
      <div className="flex align-middle">
        {icon && (
          <span
            className={`pt-3 absolute ps-3 ${hasError ? "text-red-600" : ""}`}
          >
            {icon}
          </span>
        )}
        <div className="flex flex-col items-center relative w-full">
          <Field
            className={`${
              hasError ? "  border-red-600 shadow-sm shadow-red-600" : ""
            }  ${
              icon ? "px-10" : "px-3"
            } rounded-md placeholder:text-gray-600  h-10 border text-white  w-[75%] border-gray-700 bg-slate-400 md:w-[65%] bg-black/20`}
            name={name}
            placeholder={placeholder}
            type={name.toLowerCase().includes("password") ? "password" : "text"}
          />
          {/* <div className="w-96 absolute">
            <ErrorMessage
              className="text-sm text-red-500 font-semibold"
              name={name}
              component="p"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
