import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from "formik";
import React from "react";
import { toast } from "react-toastify";

export default function BasicFormikInput({
  name,
  icon,
  title,
  placeholder,
}: any) {
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
    <div className="flex flex-col">
      <label>{title}</label>
      <div className="flex align-middle">
        {icon && (
          <span
            className={`pt-3 absolute ps-3 ${hasError ? "text-red-600" : ""}`}
          >
            {icon}
          </span>
        )}
        <div className="flex flex-col items-center relative">
          <Field
            className={`${
              hasError ? " placeholder:text-red-600 border-red-600" : ""
            }  ${
              icon ? "px-10" : "px-3"
            } rounded-md placeholder:text-gray-600  h-10 border  w-[75%] border-gray-700 bg-slate-400 md:w-96`}
            name={name}
            placeholder={placeholder}
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
