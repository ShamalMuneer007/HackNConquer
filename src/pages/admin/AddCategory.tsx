import AdminLoading from "@/components/admin/AdminLoading";
import { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TypeDispatch } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "@/redux/actions/adminAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BasicFormikInput from "@/components/input/BasicFormikInput";
function AddCategory() {
  const navigate = useNavigate();
  const { error, response } = useSelector((state: any) => state.admin);
  useEffect(() => {
    if (error && error.status >= 500 && error.status < 600) {
      toast.error("Sometnhing went wrong on our side... Please try again !");
      console.error(error);
    }
  }, [error]);
  useEffect(() => {
    console.log("Response", response);
    if (response && response.status === 200) {
      toast.success("Category added successfully", { position: "top-center" });
      navigate("/admin/categories");
    }
  }, [response]);
  const initialCategoryState = {
    categoryName: "",
    categoryLevel: 1,
  };
  const categoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string()
      .required("Category name is required!")
      .min(5, "Minimum 5 characters is required"),
    categoryLevel: Yup.number().required("Category Level is required!"),
  });

  const dispatch: TypeDispatch = useDispatch();
  const handleFormSubmission = (categoryData: any) => {
    dispatch(addCategory(categoryData));
  };
  return (
    <div className="page-padding">
      <AdminLoading />
      <h1 className="text-white font-bold text-4xl">Category</h1>
      <h3 className="text mt-8 mb-2 font-semibold text-2xl text-primary">
        Add Category
      </h3>
      <Card
        className="p-5 w-full bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
        placeholder=""
      >
        <div className="mb-5">
          <Typography variant="h4" color="white" className="" placeholder="">
            Category Details
          </Typography>
        </div>
        <Formik
          initialValues={initialCategoryState}
          onSubmit={handleFormSubmission}
          validationSchema={categoryValidationSchema}
        >
          <Form>
            <div className="text-lg ps-5 pt-3 pb-5 font-semibold text-white ">
              Category Name :
            </div>
            <div className="w-[30%]">
              <BasicFormikInput
                name="categoryName"
                placeholder="Enter category name"
              />
            </div>
            <div className="text-lg p-5 font-semibold text-white ">
              Category Level :
            </div>
            <div className="ps-10">
              <Field name="categoryLevel">
                {({ field, form }: any) => (
                  <div className="flex">
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={field.value}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          if (newValue >= 1 && newValue <= 10) {
                            form.setFieldValue(field.name, newValue);
                          }
                        }}
                        className="text-white font-bold border border-white rounded-md py-2 px-4 w-20 text-center bg-dark-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        style={{ fontSize: "16px" }}
                        readOnly
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = Math.min(field.value + 1, 10);
                            form.setFieldValue(field.name, newValue);
                          }}
                          className="text-green-500 hover:text-green-700 focus:outline-none"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = Math.max(field.value - 1, 1);
                            form.setFieldValue(field.name, newValue);
                          }}
                          className="text-green-500 hover:text-green-700 focus:outline-none"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div className="p-5 pt-10 ps-10">
              <button
                type="submit"
                className="border-primary border transition-colors w-32 h-10 rounded-xl   text-primary hover:bg-primary hover:text-black"
              >
                Add Category
              </button>
            </div>
          </Form>
        </Formik>
      </Card>
    </div>
  );
}

export default AddCategory;
