import { useEffect, useState } from "react";
import ProblemDetialsCard from "../../components/admin/problems/ProblemDetialsCard";
import ProblemCodeCard from "@/components/admin/problems/ProblemCodeCard";
import { TestCase } from "@/interfaces/TestCase";
import { IProblemDetails } from "@/interfaces/IProblemDetails";
import { MAIN_SNIPPET } from "@/constants/language";
import AddProblemModal from "@/components/admin/modals/AddProblemModal";
function AddProblem() {
  const initialProblemState = {
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

  return (
    <>
      {modal && (
        <AddProblemModal
          language={language}
          driverCode={driverCode}
          setModal={setModal}
        />
      )}
      <h1 className="text-white font-bold text-4xl">Problems</h1>
      <h3 className="text mt-8 mb-2 font-semibold text-2xl text-primary">
        Add problem
      </h3>

      <div className="w-full pb-7">
        <ProblemDetialsCard
          problemDetails={problemDetails}
          setProblemDetails={setProblemDetails}
          setLanguage={setLanguage}
        />
        <ProblemCodeCard
          setModal={setModal}
          setDriverCode={setDriverCode}
          language={language}
          testCases={testCases}
          setTestCases={setTestCases}
        />
      </div>
    </>
  );
}

export default AddProblem;
