import { LANGUAGE_ID, MAIN_SNIPPET } from "@/constants/language";
import { TestCase } from "@/interfaces/TestCase";
import { verifyProblem } from "@/redux/actions/adminAction";
import { setError } from "@/redux/reducers/adminSlice";
import { setMessage } from "@/redux/reducers/userSlice";
import { TypeDispatch } from "@/redux/store/store";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface Props {
  setCode?: (value: any) => void;
  code?: string;
  language: string;
  testCases: TestCase[];
  setDriverCode: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
}
function MainCodeEditor({
  testCases,
  language,
  setDriverCode,
  setModal,
}: Props) {
  const { loading, error, result } = useSelector((state: any) => state.admin);
  const initialOutputMessage = "Your output will be shown here..";
  const [outputMessage, setOutputMessage] = useState(initialOutputMessage);
  const [outError, setOutError] = useState(false);
  const [testCaseValidated, setTestCaseValidated] = useState(false);
  const [reportRender, setReportRender] = useState<JSX.Element | null>(null);

  const monaco = useMonaco();
  const dispatch: TypeDispatch = useDispatch();
  const editorRef = useRef<any>(null);
  useEffect(() => {
    setReportRender(null);
    setOutputMessage(initialOutputMessage);
    if (result) {
      console.log(result);
      const reportElement = (
        <div className="text-white font-semibold text-lg">
          <p className="text-base py-4">
            Accepted : {result.acceptedCases.length} test cases
          </p>
          {result.acceptedCases.map((acceptedCase: any, index: number) => (
            <table key={index} className="w-full border border-green-600">
              <thead>
                <tr>
                  <th>Test case</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>
                    {`${acceptedCase.input.includes(" ") ? "[ " : ""}` +
                      acceptedCase.input.replaceAll(" ", ", ") +
                      `${acceptedCase.input.includes(" ") ? " ]" : ""}`}
                  </td>
                  <td>
                    {`${acceptedCase.output.includes(" ") ? "[ " : ""}` +
                      acceptedCase.output.replaceAll(" ", ", ") +
                      `${acceptedCase.output.includes(" ") ? " ]" : ""}`}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}

          <p className="text-base py-4">
            Rejected: {result.rejectedCases.length} test cases
          </p>
          {result.rejectedCases.map((rejectedCase: any, index: number) => (
            <table key={index} className="w-full border border-red-600">
              <thead>
                <tr>
                  <th>Test case</th>
                  <th>Output</th>
                  <th>Expected Output</th>
                </tr>
              </thead>
              <tbody className="text-center text-sm">
                <tr>
                  <td>
                    {"[ " + rejectedCase.input.replaceAll(" ", ", ") + " ]"}
                  </td>
                  <td>
                    {"[ " + rejectedCase.output.replaceAll(" ", ", ") + " ]"}
                  </td>
                  <td>
                    {"[ " +
                      rejectedCase.expectedOutput.replaceAll(" ", ", ") +
                      " ]"}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      );
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
    const driverCode: string = editorRef.current?.getValue();
    setDriverCode(driverCode);
    console.log(testCases);
    const verificationSubmissionData = {
      sourceCode: btoa(driverCode),
      testCases,
      languageId: LANGUAGE_ID[language],
    };
    dispatch(verifyProblem(verificationSubmissionData));
  }
  return (
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
          value={MAIN_SNIPPET[language]}
          onMount={handleEditorDidMount}
        />
        <div
          className={`h-[60vh] p-10 w-[50%] bg-black ${
            outError ? "border-red-600 border" : "text-white"
          } text-white overflow-y-scroll`}
        >
          {!loading ? (
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
          disabled={loading}
          className={`${
            !loading
              ? testCaseValidated
                ? "bg-transparent text-primary"
                : "bg-primary"
              : "bg-transparent border-primary"
          } w-44 text-black font-bold rounded mt-4`}
          onClick={runClickHandler}
        >
          {loading && (
            <div className="w-4 h-4 animate-spin rounded-full border-4 border-primary border-t-4 border-t-transparent"></div>
          )}
          {!loading &&
            (testCaseValidated
              ? "Revalidate test cases"
              : "Validate test cases")}
        </button>
        {testCaseValidated && (
          <button
            disabled={loading}
            className={`${
              !loading ? "bg-primary" : "bg-transparent border-primary"
            } w-36 text-black font-bold rounded mt-4`}
            onClick={() => {
              console.log("Open modal");
              setModal(true);
            }}
            // onClick={addProblemHandler}
          >
            Add this problem
          </button>
        )}
      </div>
    </div>
  );
}

export default MainCodeEditor;
