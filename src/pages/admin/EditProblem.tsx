import instance from "@/config/axiosConfig";
import {
  PROBLEM_SERVICE_URL,
  TEST_SERVICE_URL,
} from "@/constants/service_urls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProblemCategory, IProblemData } from "./AdminProblems";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ProblemDetialsCard from "@/components/admin/problems/ProblemDetialsCard";
import TestCases from "@/components/admin/problems/TestCases";
import { TestCase } from "@/interfaces/TestCase";
import { Card, Typography } from "@material-tailwind/react";
interface IProblemInfo {
  name: string;
  description: string;
  difficulty: string;
  categories: IProblemCategory[] | string[];
  level: number;
}
function EditProblem() {
  const { problemId } = useParams();
  const [problemData, setProblemData] = useState<IProblemData>();
  const [language, setLanguage] = useState("Javascript");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [initialValues, setInitialValues] = useState<IProblemInfo>({
    name: "",
    description: "",
    difficulty: "",
    categories: [],
    level: 1,
  });
  useEffect(() => {
    if (problemData) {
      setInitialValues({
        name: problemData.problemName,
        description: problemData.description,
        difficulty: problemData.difficulty,
        categories: problemData.categories,
        level: 1,
      });
    }
  }, [problemData]);
  const fetchProblemData = async () => {
    try {
      const response = await instance.get(
        `${PROBLEM_SERVICE_URL}/get-problem/${problemId}`
      );
      console.log(response);
      if (response.status === 200) setProblemData(response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  const fetchProblemTestCases = async () => {
    try {
      const response = await instance.get(
        `${TEST_SERVICE_URL}/get-problem-testcases/${problemId}`
      );
      console.log("TEST CASES :", response);
      if (response.status === 200) setTestCases(response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    fetchProblemData();
    fetchProblemTestCases();
  }, []);
  const handleFormSubmit = async (editedProblemInfo: IProblemInfo) => {
    console.log(editedProblemInfo);
    const submissionData = {
      ...editedProblemInfo,
      testCases,
    };
    try {
      const response = await instance.patch(
        `${PROBLEM_SERVICE_URL}/edit-problem/${problemId}`,
        submissionData
      );
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  const problemDetailsValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Problem name is required!")
      .min(5, "Minimum 5 characters is required"),
    description: Yup.string()
      .required("Problem Description is required!")
      .min(10, "Atleast 10 characters is required for problem description"),
    difficulty: Yup.string().required("Please select a difficulty"),
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "At least one category must be selected"),
  });
  return (
    <div className="page-padding">
      {problemData && (
        <>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={problemDetailsValidationSchema}
            enableReinitialize
          >
            <Form>
              {problemData ? (
                <ProblemDetialsCard
                  problemCategories={problemData.categories}
                  setLanguage={setLanguage}
                />
              ) : (
                <div className="skeleton-loader h-20">
                  <div className="skeleton-item"></div>
                  <div className="skeleton-item"></div>
                  <div className="skeleton-item"></div>
                </div>
              )}
              <Card
                className="p-5 w-full mt-10 bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
                placeholder=""
              >
                <div className="mb-5">
                  <Typography
                    variant="h4"
                    color="white"
                    className=""
                    placeholder=""
                  >
                    Problem Test Cases
                  </Typography>
                </div>
                {testCases.length > 0 ? (
                  <TestCases
                    testCases={testCases}
                    setTestCases={setTestCases}
                  ></TestCases>
                ) : (
                  <div className="skeleton-loader h-20">
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                  </div>
                )}
              </Card>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
}

export default EditProblem;
