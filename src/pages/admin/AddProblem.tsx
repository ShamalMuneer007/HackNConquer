import { useEffect, useState } from "react";
import ProblemDetialsCard from "../../components/admin/problems/ProblemDetialsCard";
import * as Yup from "yup";
import ProblemCodeCard from "@/components/admin/problems/ProblemCodeCard";
import { TestCase } from "@/interfaces/TestCase";
import { IProblemDetails } from "@/interfaces/IProblemDetails";
import { MAIN_SNIPPET } from "@/constants/language";
import AddProblemModal from "@/components/admin/modals/AddProblemModal";
import { Form, Formik } from "formik";
function AddProblem() {
  const initialProblemState: IProblemDetails = {
    name: "",
    description: "",
    difficulty: "",
  };
  const [language, setLanguage] = useState("Javascript");
  const [problemDetails, setProblemDetails] =
    useState<IProblemDetails>(initialProblemState);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { testCaseInput: "", expectedOutput: "", idx: 1 },
  ]);
  const [driverCode, setDriverCode] = useState<string>(MAIN_SNIPPET[language]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [modal]);
  const problemDetailsValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Problem name is required!")
      .min(5, "Minimum 5 characters is required"),
    description: Yup.string()
      .required("Problem Description is required!")
      .min(10, "Atleast 10 characters is required for problem description"),
    difficulty: Yup.string().required("Please select a difficulty"),
  });
  const handleAddProblemSubmission = (value: IProblemDetails) => {
    setModal(true);
  };
  return (
    <>
      {modal && (
        <AddProblemModal
          language={language}
          setDriverCode={setDriverCode}
          driverCode={driverCode}
          setModal={setModal}
        />
      )}
      <h1 className="text-white font-bold text-4xl">Problems</h1>
      <h3 className="text mt-8 mb-2 font-semibold text-2xl text-primary">
        Add problem
      </h3>

      <div className="w-full pb-7">
        <Formik
          initialValues={initialProblemState}
          onSubmit={handleAddProblemSubmission}
          validationSchema={problemDetailsValidationSchema}
        >
          <Form>
            <ProblemDetialsCard
              problemDetails={problemDetails}
              setProblemDetails={setProblemDetails}
              setLanguage={setLanguage}
            />

            <ProblemCodeCard
              problemDetails={problemDetails}
              handleAddProblemSubmission={handleAddProblemSubmission}
              setDriverCode={setDriverCode}
              language={language}
              testCases={testCases}
              setTestCases={setTestCases}
            />
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default AddProblem;
