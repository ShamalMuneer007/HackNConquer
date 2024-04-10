import { LANGUAGE_ID } from "@/constants/language";
import { IProblemData } from "@/pages/admin/AdminProblems";
import { Editor, useMonaco } from "@monaco-editor/react";
import { Code2Icon } from "lucide-react";
import React, { SetStateAction, useRef } from "react";
import { Triangle } from "react-loader-spinner";
interface Props {
  problemInfo: IProblemData;
  handleCodeSubmission: () => void;
  setSolutionCode: SetStateAction<any>;
}
function SolutionWindow({
  problemInfo,
  handleCodeSubmission,
  setSolutionCode,
}: Props) {
  const editorRef = useRef();
  const convertToReactNode = (component: JSX.Element): React.ReactNode => {
    return component;
  };
  const monaco = useMonaco();
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
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };
  const CustomLoadingComponent: React.FC = () => (
    <div className="h-full w-full absolute bg-[#191919] flex justify-center items-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );

  return (
    <div className="w-full relative  h-full">
      <div className="w-full rounded-t-lg flex p-2 px-5 relative z-30 bg-dark-200">
        <span className="text-primary">
          <Code2Icon />
        </span>
        <span className="text-white ps-2"> Code</span>
      </div>
      <Editor
        height="100%"
        width="100%"
        language={
          problemInfo
            ? Object.keys(LANGUAGE_ID)
                .find((key) => LANGUAGE_ID[key] === problemInfo.languageId)
                ?.toLowerCase()
            : ""
        }
        theme="my-theme"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          padding: { top: 25 },
          cursorStyle: "line",
          wordWrap: "on",
        }}
        onChange={(value) => setSolutionCode(value)}
        value={problemInfo ? problemInfo.solutionTemplate : ""}
        onMount={handleEditorDidMount}
        loading={convertToReactNode(<CustomLoadingComponent />)}
      />
      <div className="bg-[#191919] absolute z-10 bottom-0 w-full px-10 py-3 flex justify-end">
        <button
          onClick={handleCodeSubmission}
          className=" hover:bg-primary text-sm hover:text-black border transition-colors bg-transparent border-primary text-primary font-bold rounded-lg px-5 p-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SolutionWindow;
