import { useEffect, useState } from "react";
import ProblemDetialsCard from "../../components/admin/problems/ProblemDetialsCard";
import * as Yup from "yup";
import ProblemCodeCard from "@/components/admin/problems/ProblemCodeCard";
import { TestCase } from "@/interfaces/TestCase";
import { IProblemDetails } from "@/interfaces/IProblemDetails";
import { LANGUAGE_ID, MAIN_SNIPPET } from "@/constants/language";
import AddProblemModal from "@/components/admin/modals/AddProblemModal";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ProblemDetails, addProblem } from "@/redux/actions/adminAction";
import { TypeDispatch } from "@/redux/store/store";
import { toast } from "react-toastify";
import AdminLoading from "@/components/admin/AdminLoading";
import { useNavigate } from "react-router-dom";
import { setResponse } from "@/redux/reducers/adminSlice";

interface IFinalCode {
  originalCode: string;
  driverCode: string;
  solutionTemplate: string;
}

function AddProblem() {
  const initialProblemState: IProblemDetails = {
    name: "",
    description: "",
    difficulty: "",
    categories: [""],
    level: 1,
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
  const dispatch: TypeDispatch = useDispatch();
  const { error, response } = useSelector((state: any) => state.admin);
  const [language, setLanguage] = useState("Javascript");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { testCaseInput: "", expectedOutput: "", idx: 1 },
  ]);
  const [code, setCode] = useState<IFinalCode>({
    originalCode: MAIN_SNIPPET[language],
    driverCode: MAIN_SNIPPET[language],
    solutionTemplate: "",
  });
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log("CODE : ", code);
  }, [code]);
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [modal]);

  useEffect(() => {
    if (error && error.status >= 500 && error.status < 600) {
      toast.error("Sometnhing went wrong on our side... Please try again !");
      console.error(error);
    }
  }, [error]);
  useEffect(() => {
    console.log("Response", response);
    if (response && response.status === 200) {
      toast.success("Problem added successfully", { position: "top-center" });
      dispatch(setResponse(null));
      navigate("/admin/problems");
    }
  }, [response]);

  const handleFormSubmission = (problemDetails: IProblemDetails) => {
    console.log(problemDetails);
    const addProblemSubmissionData: ProblemDetails = {
      problemName: problemDetails.name,
      description: problemDetails.description,
      driverCode: code.driverCode,
      level: problemDetails.level,
      testCases: testCases,
      solutionTemplate: code.solutionTemplate,
      categories: problemDetails.categories,
      languageId: LANGUAGE_ID[language],
      difficulty: problemDetails.difficulty,
    };
    if (addProblemSubmissionData.solutionTemplate.length < 5) {
      toast.error("Please add a valid solution template !!", {
        position: "top-center",
      });
      return;
    }
    dispatch(addProblem(addProblemSubmissionData));
  };

  return (
    <div className="page-padding">
      <AdminLoading />
      <h1 className="text-white font-bold text-4xl">Problems</h1>
      <h3 className="text mt-8 mb-2 font-semibold text-2xl text-primary">
        Add problem
      </h3>

      <div className="w-full pb-7">
        <Formik
          initialValues={initialProblemState}
          onSubmit={handleFormSubmission}
          validationSchema={problemDetailsValidationSchema}
        >
          <Form>
            <ProblemDetialsCard setLanguage={setLanguage} />
            <ProblemCodeCard
              setModal={setModal}
              setCode={setCode}
              language={language}
              testCases={testCases}
              setTestCases={setTestCases}
            />
            {modal && (
              <AddProblemModal
                language={language}
                setCode={setCode}
                code={code}
                setModal={setModal}
                handleFormSubmission={handleFormSubmission}
              />
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddProblem;
