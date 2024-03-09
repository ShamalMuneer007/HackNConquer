import { Editor } from "@monaco-editor/react";
import React, { Dispatch, SetStateAction, useRef } from "react";

function AiOutlineCloseCircle(props: any) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
      <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    </svg>
  );
}
interface AddProblemModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  driverCode: string;
  language: string;
}
function AddProblemModal({
  setModal,
  driverCode,
  language,
}: AddProblemModalProps) {
  const editorRef = useRef<any>(null);
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  return (
    <div className="bg-black/20 h-screen w-screen backdrop-blur-sm shadow-md fixed z-50 inset-0 overflow-hidden">
      <div className="flex h-full w-full justify-center items-center">
        <div className="h-[90%] w-[60%] bg-dark-100 relative rounded text-white overflow-x-scroll">
          <div className="flex justify-center items-center h-full">
            <Editor
              height="60vh"
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
          <div className="flex justify-end sticky gap-6 bottom-0 bg-dark-200 h-20 items-center pe-6">
            <button className="border-primary border w-20 h-10 rounded-xl   text-primary hover:bg-primary hover:text-black">
              Next
            </button>
            <button
              className="text-red-600 px-3 w-20 h-10  rounded-xl py-2 border-red-600 border hover:bg-red-600 transition-colors hover:text-white"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProblemModal;
