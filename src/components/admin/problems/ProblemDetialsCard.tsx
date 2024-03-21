import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";
import { LANGUAGES as languages } from "@/constants/language";
import { useEffect, useState } from "react";

import {
  Field,
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from "formik";
import { toast } from "react-toastify";
import instance from "@/config/axiosConfig";
import { PROBLEM_SERVICE_URL } from "@/constants/service_urls";
import { AxiosError, AxiosResponse } from "axios";
import { setLoader } from "@/redux/reducers/adminSlice";
import { useDispatch } from "react-redux";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import MultiSelectCheckBoxModal from "../MultiSelectCheckBoxModal";

interface Props {
  setLanguage: (value: string) => void;
}
function ProblemDetialsCard({ setLanguage }: Props) {
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<FormikValues> | any;
    touched: FormikTouched<FormikValues>;
  } = useFormikContext();
  const [categories, setCategories] = useState<string[] | null>();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {}, [selectedCategories]);
  useEffect(() => {
    toast.dismiss();
    const hasErrors =
      Object.keys(errors).length > 0 && Object.keys(touched).length > 0;

    if (hasErrors) {
      Object.entries(touched).forEach(([field, isTouched]) => {
        console.log("Field : ", field);
        if (isTouched && errors[field]) {
          const errorMessage = errors[field];
          if (typeof errorMessage === "string" && errorMessage !== "") {
            toast.warn(errorMessage, { autoClose: false });
          }
        }
      });
    }
  }, [errors, touched]);
  useEffect(() => {
    dispatch(setLoader(true));
    instance
      .get(PROBLEM_SERVICE_URL + "/get-all-category")
      .then((response: AxiosResponse) => {
        dispatch(setLoader(false));
        console.log(response);
        if (response.data.categories.content as string[]) {
          const categories = response.data.categories.content.map(
            (category: { categoryName: string }) => category.categoryName
          );
          console.log("categories : ", categories);
          setCategories(categories);
        }
      })
      .catch((error: AxiosError) => {
        dispatch(setLoader(false));
        console.error(error);
        toast.error("Something went wrong while fetching the categories..", {
          position: "top-center",
        });
      });
  }, []);
  const [categoryModal, setCategoryModal] = useState(false);
  return (
    <>
      {categoryModal && (
        <MultiSelectCheckBoxModal
          setModal={setCategoryModal}
          items={categories}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
          fieldName="categories"
        />
      )}
      <Card
        className="p-5 w-full bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
        placeholder=""
      >
        <div className="mb-5">
          <Typography variant="h4" color="white" className="" placeholder="">
            Problem Details
          </Typography>
        </div>
        <div className="p-5">
          <Field name="name">
            {({ field, form }: any) => (
              <div className="w-60">
                <Input
                  crossOrigin={null}
                  color="green"
                  spellCheck="true"
                  value={field.value}
                  onChange={(e) =>
                    form.setFieldValue(field.name, e.target.value)
                  }
                  label="Problem Name"
                  className="text-black font-bold border border-white"
                  style={{ color: "white", fontSize: "16px" }}
                />
              </div>
            )}
          </Field>
        </div>
        <div className="p-5">
          <Field name="description">
            {({ field, form }: any) => (
              <>
                <Textarea
                  color="green"
                  spellCheck="true"
                  value={field.value}
                  onChange={(e) =>
                    form.setFieldValue(field.name, e.target.value)
                  }
                  className="text-black font-bold border h-52 border-white"
                  label="Description"
                  style={{ color: "white", fontSize: "16px" }}
                />
              </>
            )}
          </Field>
        </div>
        <div className="w-full flex justify-around">
          <div className="p-5">
            <Typography
              variant="lead"
              color="white"
              className=""
              placeholder=""
            >
              Problem Difficulty
            </Typography>
            <Field name="difficulty">
              {({ field, form }: any) => (
                <>
                  <Select
                    onValueChange={(value) =>
                      form.setFieldValue(field.name, value)
                    }
                    value={field.value}
                  >
                    <SelectTrigger className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg  dark:bg-dark-300 dark:border-dark-300 dark:placeholder-gray-400 dark:text-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-none font-bold">
                      <SelectItem
                        value="EASY"
                        className="hover:bg-dark-100/60 text-green-600"
                      >
                        Easy
                      </SelectItem>
                      <SelectItem
                        value="MEDIUM"
                        className="hover:bg-dark-100/60 text-yellow-600"
                      >
                        Medium
                      </SelectItem>
                      <SelectItem
                        value="HARD"
                        className="hover:bg-dark-100/60 text-red-600"
                      >
                        Hard
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </Field>
          </div>
          <div className="p-5 flex items-center justify-center">
            <button
              type="button"
              className="p-2 bg-dark-300 text-white mt-7 py-2 rounded  w-52"
              onClick={() => {
                setCategoryModal(true);
              }}
            >
              Select Categories
            </button>
          </div>
          <div className="p-5">
            <Typography
              variant="lead"
              color="white"
              className=""
              placeholder=""
            >
              Language
            </Typography>
            <div className="bg-black">
              <Select onValueChange={(value) => setLanguage(value)}>
                <SelectTrigger className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg  dark:bg-dark-300 dark:border-dark-300 dark:placeholder-gray-400 dark:text-white">
                  <SelectValue placeholder={"Javascript"} />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-none">
                  {languages.map((language: string, index) => (
                    <SelectItem
                      key={index}
                      value={language}
                      className="hover:bg-dark-100/60"
                    >
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProblemDetialsCard;
