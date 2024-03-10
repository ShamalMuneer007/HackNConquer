import { Editor } from "@monaco-editor/react";
import React from "react";
interface Props {
  language: string;
  driverCode?: string;
  handleEditorDidMount: (editor: any) => void;
}
function DriverCodeEditor({
  language,
  driverCode,
  handleEditorDidMount,
}: Props) {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center h-full">
        <Editor
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
          value={driverCode}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}

export default DriverCodeEditor;
