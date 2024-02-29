import { executeCode } from "@/constants/API/judge0API";
import { LANGUAGE_ID, MAIN_SNIPPET } from "@/constants/language";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ReactNode, useRef, useState } from "react";
import { toast } from "react-toastify";
interface Props {
  setCode?: (value: any) => void;
  code?: string;
  language: string;
}
function SolutionCodeEditor({ language }: Props) {
  const [output, setOutput] = useState<ReactNode>(
    "Code output will be shown here!"
  );
  const monaco = useMonaco();
  monaco?.editor.defineTheme("my-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // { token: "global", foreground: "84d6f7", fontStyle: "bold" },
      // { token: "keyword", foreground: "00b4d8", fontStyle: "bold" },
      // { token: "comment", foreground: "666666" },
      // { token: "number", foreground: "e76f51" },
      // { token: "string", foreground: "f28482" },
    ],
    colors: {
      "editor.background": "#191919",
      "editorLineNumber.foreground": "#6f6f6f",
      "editorLineNumber.activeForeground": "#5bba0c",
    },
  });
  const [executionLoading, setExecutionLoading] = useState(false);
  const [outError, setOutError] = useState(false);
  const editorRef = useRef<any>(null);
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  async function verifyHandler() {
    setOutError(false);
    setExecutionLoading(true);
    try {
      const sourceCode: string = editorRef.current?.getValue();
      const result = await executeCode(LANGUAGE_ID[language], sourceCode);
      console.log(result);
      if (result.stdout && result.status_id === 3) {
        setOutput(atob(result.stdout));
      } else if (result.stderr) {
        setOutError(true);
        setOutput(atob(result.stderr));
      } else if (result.status_id === 6 && result.compile_output) {
        setOutError(true);
        setOutput(atob(result.compile_output));
      } else {
        setOutput(": [");
      }
    } catch (error: any) {
      setOutput(": [");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { position: "top-center" });
      } else {
        toast.error(error.message);
      }
      console.error(error);
    }
    setExecutionLoading(false);
  }
  return (
    <div>
      {language}
      <div className="flex">
        <Editor
          height="50vh"
          width={"50%"}
          language={language}
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
        />{" "}
        <div
          className={`h-[50vh] p-10 w-[50%] bg-black ${
            outError ? "border-red-600 border" : "text-white"
          } text-white`}
        >
          {!executionLoading ? (
            <p
              className={`${
                outError ? "text-red-600" : "text-white"
              } font-bold `}
            >
              {output}
            </p>
          ) : (
            <div className="w-full h-full justify-center items-center">
              <div className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[50%] h-12  flex justify-end">
        <button
          disabled={executionLoading}
          className={`${
            !executionLoading ? "bg-primary" : "bg-transparent border-primary"
          } w-20 text-black font-bold rounded mt-4`}
          onClick={verifyHandler}
        >
          {executionLoading ? (
            <div className="w-4 h-4 animate-spin rounded-full border-4 border-primary border-t-4 border-t-transparent"></div>
          ) : (
            "Run"
          )}
        </button>
      </div>
    </div>
  );
}

export default SolutionCodeEditor;
