import { Editor } from "@monaco-editor/react";

interface Props {
  language: string;
  handleEditorDidMount: (editor: any) => void;
  initialValue?: string;
  setCode?: any;
  secondStep?: boolean;
}

function DriverCodeEditor({
  language,
  handleEditorDidMount,
  initialValue,
  secondStep,
  setCode,
}: Props) {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center h-full">
        <Editor
          onChange={(e) => {
            setCode((code: any) => ({
              ...code,
              [secondStep ? "solutionTemplate" : "driverCode"]: e,
            }));
          }}
          height="70%"
          width={"90%"}
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
          value={initialValue}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}

export default DriverCodeEditor;
