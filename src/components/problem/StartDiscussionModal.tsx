import instance from "@/config/axiosConfig";
import { DISCUSSION_SERVICE_URL } from "@/constants/service_urls";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { IDiscussionData } from "@/interfaces/IDiscussionData";
import { IDiscussionSubmissionData } from "@/interfaces/IDiscussionSubmissionData";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
interface Props {
  problemId: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
function StartDiscussionModal({ problemId, setShowModal }: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const initialValues: IDiscussionSubmissionData = {
    title: "",
    content: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    content: Yup.string().required("Content is required!"),
  });
  const handleSubmitDiscussion = async (
    discussionData: IDiscussionSubmissionData,
    { resetForm }: FormikHelpers<IDiscussionSubmissionData>
  ) => {
    setLoading(true);
    const controller = new AbortController();
    setAbortController(controller);
    console.log(discussionData);
    try {
      const submissionData = {
        ...discussionData,
        problemId,
        username: user?.username,
      };
      const response: AxiosResponse = await instance.post(
        `${DISCUSSION_SERVICE_URL}/user/submit-discussion`,
        submissionData,
        { signal: controller.signal }
      );
      if (response.status === 200) {
        setShowModal(false);
        toast.success("A discussion has been started");
        resetForm();
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error(error.response.data.error);
        } else if (
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on our side..");
        }
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCancelClick = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setShowModal(false);
  };
  return (
    <div className="bg-black/20 h-screen w-screen backdrop-blur-sm shadow-md fixed z-30 inset-0 overflow-hidden flex justify-center items-center">
      <div className="bg-dark-200 w-[50%] p-4 rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitDiscussion}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="title" className="block font-bold mb-2">
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    className={`w-full bg-gray-700 focus:border-primary focus:border-2 text-white rounded-md py-2 px-4 focus:outline-none ${
                      errors.title && touched.title
                        ? "border-red-700 border-2"
                        : ""
                    }`}
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 mt-1">{errors.title}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block font-bold mb-2">
                    Content
                  </label>
                  <Field
                    id="content"
                    name="content"
                    as="textarea"
                    rows="4"
                    className={`w-full bg-gray-700 text-white  focus:border-primary focus:border-2 rounded-md py-2 px-4 focus:outline-none ${
                      errors.content && touched.content
                        ? "border-red-500 border-2"
                        : ""
                    }`}
                  />
                  {errors.content && touched.content && (
                    <div className="text-red-500 mt-1">{errors.content}</div>
                  )}
                </div>
                <div className="flex gap-5 w-full justify-end pe-2">
                  <button
                    type="submit"
                    className={`border border-primary ${
                      !loading
                        ? "text-primary hover:text-black"
                        : "text-primary"
                    } ${
                      !loading && "hover:bg-primary"
                    }  transition-colors font-bold py-2 px-4 rounded w-20`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center">
                        <p className="animate-spin text-center w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></p>
                      </div>
                    ) : (
                      <span>Post</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default StartDiscussionModal;
