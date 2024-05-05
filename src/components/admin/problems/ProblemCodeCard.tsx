import { Card } from "@material-tailwind/react";
import TestCases from "./TestCases";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TestCase } from "@/interfaces/TestCase";
import { TypeDispatch } from "@/redux/store/store";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setResult } from "@/redux/reducers/adminSlice";
import { setError, setMessage } from "@/redux/reducers/userSlice";
import { toast } from "react-toastify";
import { LANGUAGE_ID, MAIN_SNIPPET } from "@/constants/language";
import { verifyProblem } from "@/redux/actions/adminAction";
import ProblemConsole from "@/components/problem/ProblemConsole";
import { useFormikContext } from "formik";
interface Props {
  language: string;
  testCases: TestCase[];
  setTestCases: Dispatch<SetStateAction<TestCase[]>>;
  setCode: Dispatch<SetStateAction<IFinalCode>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  code?: IFinalCode;
}
interface IFinalCode {
  originalCode: string;
  driverCode: string;
  solutionTemplate: string;
}
function ProblemCodeCard({
  language,
  testCases,
  setTestCases,
  setCode,
  setModal,
  code,
}: Props) {
  const { error, result } = useSelector((state: any) => state.admin);
  const formik = useFormikContext();
  const initialOutputMessage = "Your output will be shown here..";
  const [outputMessage, setOutputMessage] = useState(initialOutputMessage);
  const [outError, setOutError] = useState(false);
  const [testCaseValidated, setTestCaseValidated] = useState(false);
  const [reportRender, setReportRender] = useState<JSX.Element | null>(null);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const monaco = useMonaco();
  const dispatch: TypeDispatch = useDispatch();
  const editorRef = useRef<any>(null);
  useEffect(() => {
    setTestCaseValidated(false);
    setReportRender(null);
    setOutputMessage(initialOutputMessage);
    dispatch(setResult(null));
  }, [language]);
  useEffect(() => {
    setReportRender(null);
    setOutputMessage(initialOutputMessage);
    if (result) {
      setVerificationLoading(false);
      console.log(result);
      const reportElement = <ProblemConsole result={result} />;
      setReportRender(reportElement);
      if (result.status === "ACCEPTED") {
        setOutputMessage("ACCEPTED");
        setTestCaseValidated(true);
      } else {
        setOutputMessage("TEST CASE AND EXPECTED OUTPUT REJECTED");
        setTestCaseValidated(false);
      }
    } else {
      setTestCaseValidated(false);
    }
  }, [result]);
  useEffect(() => {
    if (error) {
      setVerificationLoading(false);
      dispatch(setResult(null));
      if (error.status === "COMPILE_ERR" || error.status === "STD_ERR") {
        setOutError(true);
        setOutputMessage(error.message);
      } else {
        toast.error(error.message, { position: "top-center" });
        setOutError(false);
        setOutputMessage(": [");
      }
    }
    dispatch(setError(null));
    dispatch(setMessage(null));
  }, [error]);

  monaco?.editor.defineTheme("my-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#191919",
      "editorLineNumber.foreground": "#6f6f6f",
      "editorLineNumber.activeForeground": "#5bba0c",
    },
  });
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  async function runClickHandler() {
    setReportRender(null);
    setOutError(false);
    setOutputMessage(initialOutputMessage);
    if (
      testCases[testCases.length - 1]["expectedOutput"] === "" ||
      testCases[testCases.length - 1]["testCaseInput"] === ""
    ) {
      setOutError(true);
      setOutputMessage("Test cases can't be empty!!!");
      return;
    }
    const originalCode: string = editorRef.current?.getValue();
    const driverCode: string = originalCode;
    setCode((code) => ({ ...code, originalCode, driverCode }));
    console.log(testCases);
    const verificationSubmissionData = {
      sourceCode: btoa(originalCode),
      testCases,
      languageId: LANGUAGE_ID[language],
    };
    setVerificationLoading(true);
    dispatch(verifyProblem(verificationSubmissionData));
  }
  return (
    <Card
      className="p-5 w-full mt-10 bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
      placeholder=""
    >
      <h2 className="font-bold text-white text-xl ps-3 py-4">
        Problem execution code & test cases
      </h2>
      <TestCases testCases={testCases} setTestCases={setTestCases}></TestCases>
      <div>
        {language}
        <div className="flex">
          <Editor
            height="60vh"
            width={"50%"}
            language={language.toLowerCase()}
            theme="my-theme"
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 16,
              padding: { top: 25 },
              cursorStyle: "line",
              wordWrap: "on",
            }}
            value={code ? code.originalCode : MAIN_SNIPPET[language]}
            onMount={handleEditorDidMount}
          />
          <div
            className={`h-[60vh] p-10 w-[50%] bg-black ${
              outError ? "border-red-600 border" : "text-white"
            } text-white overflow-y-scroll`}
          >
            {!verificationLoading ? (
              <>
                <p
                  className={`${
                    outError
                      ? "text-red-600"
                      : testCaseValidated
                      ? "text-green-600"
                      : result
                      ? "text-red-600"
                      : "text-white"
                  } font-bold`}
                >
                  {outputMessage}
                </p>
                {reportRender}
              </>
            ) : (
              <div className="w-full h-full justify-center items-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[50%] h-12  flex gap-5 justify-end">
          <button
            type="button"
            disabled={verificationLoading}
            className={`${
              !verificationLoading
                ? testCaseValidated
                  ? "bg-transparent text-primary"
                  : "bg-primary"
                : "bg-transparent border-primary"
            } w-44 text-black font-bold rounded mt-4`}
            onClick={runClickHandler}
          >
            {verificationLoading && (
              <div className="w-4 h-4 animate-spin rounded-full border-4 border-primary border-t-4 border-t-transparent"></div>
            )}
            {!verificationLoading &&
              (testCaseValidated
                ? "Revalidate test cases"
                : "Validate test cases")}
          </button>
          {testCaseValidated && (
            <button
              type="button"
              onClick={async () => {
                const formErrors: any = await formik.validateForm();
                console.log(formErrors);
                const fields = Object.keys(formErrors);
                if (fields.length !== 0) {
                  fields.forEach((field) => {
                    toast.error(formErrors[field]);
                  });
                  return;
                }
                setModal(true);
              }}
              disabled={verificationLoading}
              className={`${
                !verificationLoading
                  ? "bg-primary"
                  : "bg-transparent border-primary"
              } w-36 text-black font-bold rounded mt-4`}
            >
              Add this problem
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProblemCodeCard;
