import { Input, Textarea } from "@material-tailwind/react";
import {
  Form,
  Field,
  FieldInputProps,
  FormikErrors,
  FormikValues,
  useFormikContext,
  FormikTouched,
} from "formik";
import { useState, useEffect } from "react";
import { FcAddImage } from "react-icons/fc";
import { toast } from "react-toastify";

function CreateClanForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleImageFileInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    form: any,
    field: FieldInputProps<any>
  ) => {
    const file = event.currentTarget.files?.[0];
    const maxSizeInBytes = 1024 * 1024;
    console.log("File size : ", file?.size);
    if (file && file.size > maxSizeInBytes) {
      toast.error("File size exceeds the limit of 1 MB");
      event.currentTarget.value = "";
      return;
    }

    form.setFieldValue(field.name, file || null);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<FormikValues> | any;
    touched: FormikTouched<FormikValues>;
  } = useFormikContext();
  useEffect(() => {
    const showError = (fieldName: string, delay = 0) => {
      if (errors[fieldName] && touched[fieldName]) {
        setTimeout(() => {
          toast.warn(errors[fieldName], {
            autoClose: false,
            closeButton: false,
          });
        }, delay);
      }
    };

    showError("name");
    showError("description", 400);
    showError("image", 400);

    return () => {
      toast.dismiss();
    };
  }, [errors, touched]);
  return (
    <Form>
      <h4 className="text-xl p-2 font-semibold">Clan name</h4>
      <Field name="name">
        {({ field, form }: any) => (
          <div className="w-60 ps-0 py-2 ms-4">
            <Input
              crossOrigin={null}
              color="green"
              spellCheck="true"
              value={field.value}
              onChange={(e) => form.setFieldValue(field.name, e.target.value)}
              label="Clan Name"
              className="text-black font-bold border border-white"
              style={{ color: "white", fontSize: "16px" }}
            />
          </div>
        )}
      </Field>
      <h4 className="text-xl p-2 font-semibold mt-5">Clan description</h4>

      <Field name="description">
        {({ field, form }: any) => (
          <div className="ps-0 py-2 mx-4">
            <Textarea
              color="green"
              spellCheck="true"
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                form.setFieldValue(field.name, e.target.value)
              }
              className="text-black font-bold border h-52 border-white"
              label="Description"
              style={{ color: "white", fontSize: "16px" }}
            />
          </div>
        )}
      </Field>

      <h4 className="text-xl p-2 font-semibold mt-5">Clan Logo</h4>
      <Field name="image">
        {({ field, form }: any) => (
          <div className="w-60 ps-0 py-2 ms-4">
            <label
              htmlFor="image"
              className="text-white hover:text-primary transition-colors hover:border-primary cursor-pointer font-bold border w-36 h-36 text-5xl rounded-xl justify-center border-white flex items-center"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-[90%] h-[90%] rounded-xl"
                />
              ) : (
                <FcAddImage />
              )}
            </label>
            <input
              id="image"
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                handleImageFileInput(event, form, field);
              }}
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
            />
          </div>
        )}
      </Field>
      <button
        type="submit"
        className="absolute bottom-4 right-8 border border-primary p-2 font-bold text-primary rounded hover:bg-primary hover:text-white transition-colors"
      >
        Create
      </button>
    </Form>
  );
}

export default CreateClanForm;
