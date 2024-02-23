import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from "formik";

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
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
  } = useFormikContext();
  const hasError = errors[name] && touched[name];
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
        <div className="flex flex-col items-center">
          <Field
            className={`${
              hasError ? "border-2 border-red-700 " : "border border-gray-700"
            }  ${
              icon ? "px-10" : "px-3"
            } rounded-md h-10 placeholder:text-gray-600 w-[75%] bg-slate-400 md:w-96`}
            name={name}
            placeholder={placeholder}
          />
          <div className="w-96">
            <ErrorMessage
              className="text-sm mt-2 text-red-500 font-semibold"
              name={name}
              component="p"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
