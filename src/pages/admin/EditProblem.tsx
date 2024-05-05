import instance from "@/config/axiosConfig";
import {
  PROBLEM_ADMIN_SERVICE_URL,
  TEST_SERVICE_URL,
  PROBLEM_SERVICE_URL,
} from "@/constants/service_urls";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProblemData } from "./AdminProblems";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ProblemDetialsCard from "@/components/admin/problems/ProblemDetialsCard";
import { TestCase } from "@/interfaces/TestCase";
import ProblemCodeCard from "@/components/admin/problems/ProblemCodeCard";
import AddProblemModal from "@/components/admin/modals/AddProblemModal";
import { IProblemDetails } from "@/interfaces/IProblemDetails";
import { LANGUAGE_ID } from "@/constants/language";
import Loading from "@/components/Loading";
import ExampleTestCases from "@/components/admin/problems/ExampleTestCases";
import { TestExample } from "./AddProblem";
interface IFinalCode {
  originalCode: string;
  driverCode: string;
  solutionTemplate: string;
}
function EditProblem() {
  const { problemId } = useParams();
  const [problemData, setProblemData] = useState<IProblemData>();
  const [language, setLanguage] = useState<string>("Javascript");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [examples, setExamples] = useState<TestExample[]>([
    { input: "", output: "" },
    { input: "", output: "" },
    { input: "", output: "" },
  ]);
  const [initialValues, setInitialValues] = useState<IProblemDetails>({
    name: "",
    description: "",
    difficulty: "",
    categories: [],
    level: 1,
    examples: [],
  });
  const [code, setCode] = useState<IFinalCode>({
    originalCode: "",
    driverCode: "",
    solutionTemplate: "",
  });
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (problemData) {
      setInitialValues({
        name: problemData.problemName,
        description: problemData.description,
        difficulty: problemData.difficulty,
        categories: problemData.categories,
        level: 1,
        examples: [],
      });
      setCode({
        originalCode: problemData?.driverCode + problemData?.solutionTemplate,
        driverCode: problemData?.driverCode,
        solutionTemplate: problemData?.solutionTemplate,
      });
      const language = Object.keys(LANGUAGE_ID).find(
        (key) => LANGUAGE_ID[key] === problemData.languageId
      );
      console.log("Language : ", language);
      language && setLanguage(language);
    }
  }, [problemData]);
  const fetchProblemData = async () => {
    try {
      const response = await instance.get(
        `${PROBLEM_SERVICE_URL}/get-problem/${problemId}`
      );
      console.log(response);
      if (response.status === 200) {
        setProblemData(response.data);
        setExamples(response.data.examples);
      }
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
      if (response.status === 200) {
        setTestCases(response.data);
      }
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
  const handleFormSubmit = async (editedProblemInfo: IProblemDetails) => {
    console.log(editedProblemInfo);
    setLoading(true);
    const submissionData = {
      ...editedProblemInfo,
      testCases,
      solutionTemplate: code.solutionTemplate,
      driverCode: code.driverCode,
    };
    try {
      console.log("PROBLEM EDIT SUBMISSION DATA : ", submissionData);
      const response = await instance.patch(
        `${PROBLEM_ADMIN_SERVICE_URL}/edit-problem/${problemId}`,
        submissionData
      );
      if (response.status === 200) {
        toast.success("Problem data edited successfully!!");
        navigate(`/admin/problems`);
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
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
    <>
      <Loading loading={loading} />
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
                  <>
                    <ProblemDetialsCard
                      problemCategories={problemData.categories}
                      setLanguage={setLanguage}
                      language={language}
                    />
                  </>
                ) : (
                  <div className="skeleton-loader h-20">
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                  </div>
                )}
                {examples && (
                  <ExampleTestCases
                    setExamples={setExamples}
                    examples={examples}
                  />
                )}
                {testCases.length > 0 ? (
                  <ProblemCodeCard
                    setModal={setModal}
                    setCode={setCode}
                    language={language}
                    testCases={testCases}
                    setTestCases={setTestCases}
                    code={code}
                  />
                ) : (
                  <div className="skeleton-loader h-20">
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                  </div>
                )}
                {modal && (
                  <AddProblemModal
                    language={language}
                    setCode={setCode}
                    code={code}
                    setModal={setModal}
                    handleFormSubmission={handleFormSubmit}
                  />
                )}
              </Form>
            </Formik>
          </>
        )}
      </div>
    </>
  );
}

export default EditProblem;
