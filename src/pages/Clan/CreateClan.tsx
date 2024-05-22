import Loading from "@/components/Loading";
import CreateClanForm from "@/components/clan/CreateClanForm";
import instance from "@/config/axiosConfig";
import { CLAN_SERVICE_URL, USER_SERVICE_URL } from "@/constants/service_urls";
import { setUser } from "@/redux/reducers/userSlice";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
function CreateClan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    description: "",
    image: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Problem name is required!")
      .min(5, "Minimum 5 characters is required"),
    description: Yup.string()
      .required("Problem Description is required!")
      .min(10, "Atleast 10 characters is required for problem description"),
    image: Yup.mixed()
      .test(
        "fileType",
        "Invalid file type",
        (value: any) =>
          value === null || (value && value.type.startsWith("image/"))
      )
      .test(
        "fileSize",
        "File size is too large",
        (value: any) => value === null || (value && value.size <= 1024 * 1024) // 1 MB limit
      )
      .required(),
  });
  const handleFormSubmission = async (clanCreateSubmissionValues: any) => {
    try {
      console.log("Sending post request to create clan !!!");
      console.log("Create clan data : ", clanCreateSubmissionValues);
      const formData = new FormData();
      formData.append("name", clanCreateSubmissionValues.name);
      formData.append("description", clanCreateSubmissionValues.description);
      formData.append("image", clanCreateSubmissionValues.image);
      setLoading(true);
      const response = await instance.post(
        `${CLAN_SERVICE_URL}/user/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Created clan successfully!!!");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
        navigate("/clan");
      }
    } catch (error: any) {
      if (!error.response || !error.response.data) {
        toast.error("Network error!");
        return;
      }
      toast.error("Something went wrong !!! ", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Loading loading={loading}>
        <>
          <p className="font-bold text-xl text-white">Creating clan..</p>
        </>
      </Loading>
      <div className="page-padding dark:text-white">
        <h2 className="font-bold text-3xl p-5 ps-0 pt-0">Create Clan</h2>
        <div className="p-3 mt-4 bg-dark-300 w-full rounded-lg relative">
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmission}
            validationSchema={validationSchema}
          >
            <CreateClanForm />
          </Formik>
        </div>
      </div>
    </>
  );
}

export default CreateClan;
