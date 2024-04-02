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
import { setResponse } from "@/redux/reducers/adminSlice";
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
      dispatch(setResponse(null));
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
