import { Card } from "@material-tailwind/react";
import MainCodeEditor from "./MainCodeEditor";
import TestCases from "./TestCases";
import { Dispatch, SetStateAction } from "react";
import { TestCase } from "@/interfaces/TestCase";
interface Props {
  language: string;
  testCases: TestCase[];
  setTestCases: Dispatch<SetStateAction<TestCase[]>>;
  setDriverCode: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
}

function ProblemCodeCard({
  language,
  testCases,
  setTestCases,
  setDriverCode,
  setModal,
}: Props) {
  return (
    <Card
      className="p-5 w-full mt-10 bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
      placeholder=""
    >
      <h2 className="font-bold text-white text-xl ps-3 py-4">
        Problem execution code & test cases
      </h2>
      <TestCases testCases={testCases} setTestCases={setTestCases}></TestCases>
      <MainCodeEditor
        setModal={setModal}
        setDriverCode={setDriverCode}
        testCases={testCases}
        language={language}
      ></MainCodeEditor>
    </Card>
  );
}

export default ProblemCodeCard;
