import { Card } from "@material-tailwind/react";
import MainCodeEditor from "./MainCodeEditor";
import TestCases from "./TestCases";
import { useState } from "react";
import { TestCase } from "@/interfaces/TestCase";

interface Props {
  language: string;
}
function ProblemCodeCard({ language }: Props) {
  const [testCases, setTestCases] = useState<TestCase<string>[]>([
    { input: "", output: "" },
  ]);
  return (
    <Card
      className="p-5 w-full mt-10 bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
      placeholder=""
    >
      <TestCases testCases={testCases} setTestCases={setTestCases}></TestCases>
      <MainCodeEditor
        testCases={testCases}
        language={language}
      ></MainCodeEditor>
    </Card>
  );
}

export default ProblemCodeCard;
