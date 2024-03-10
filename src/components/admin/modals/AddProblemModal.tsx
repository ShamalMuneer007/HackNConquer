import { Editor } from "@monaco-editor/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import DriverCodeEditor from "../problems/DriverCodeEditor";

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
  setDriverCode: Dispatch<SetStateAction<string>>;
  driverCode: string;
  language: string;
}
function AddProblemModal({
  setModal,
  driverCode,
  setDriverCode,
  language,
}: AddProblemModalProps) {
  const [secondStep, setSecondStep] = useState(false);
  const editorRef = useRef<any>(null);
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };
  const nextButtonHandler = () => {
    setDriverCode(editorRef.current?.getValue());
    setSecondStep(true);
  };
  return (
    <div className="bg-black/20 h-screen w-screen backdrop-blur-sm shadow-md fixed z-50 inset-0 overflow-hidden">
      <div className="flex h-full w-full justify-center items-center">
        <div className="h-[90%] w-[60%] bg-dark-100 relative rounded text-white overflow-y-hidden">
          <div className=" p-6">
            {!secondStep ? (
              <>
                <h2 className="font-bold text-2xl">Driver Code</h2>
                <p className="font-semibold text-lg px-8 pt-5">
                  <img
                    className="inline mx-5"
                    width="34"
                    height="34"
                    src="https://img.icons8.com/emoji/48/warning-emoji.png"
                    alt="warning-emoji"
                  />
                  Remove the solution function / class of the problem in the
                  code before proceeding{" "}
                </p>
              </>
            ) : (
              <>
                <h2 className="font-bold text-2xl">Solution Template</h2>
                <p className="font-semibold text-lg px-8 pt-5">
                  <img
                    className="inline mx-5"
                    width="34"
                    height="34"
                    src="https://img.icons8.com/emoji/48/warning-emoji.png"
                    alt="warning-emoji"
                  />
                  Create a solution template function for the user to code in it{" "}
                </p>
              </>
            )}
          </div>
          {secondStep ? (
            <DriverCodeEditor
              handleEditorDidMount={handleEditorDidMount}
              language={language}
              driverCode={driverCode}
            />
          ) : (
            <DriverCodeEditor
              driverCode={driverCode}
              handleEditorDidMount={handleEditorDidMount}
              language={language}
            />
          )}
          <div className="flex justify-end sticky gap-6 bottom-0 bg-dark-200 h-20 items-center pe-6">
            {!secondStep ? (
              <button
                className="border-primary border transition-colors w-20 h-10 rounded-xl   text-primary hover:bg-primary hover:text-black"
                onClick={() => {
                  nextButtonHandler();
                }}
              >
                Next
              </button>
            ) : (
              <button className="border-primary border transition-colors w-32 h-10 rounded-xl   text-primary hover:bg-primary hover:text-black">
                Add Problem
              </button>
            )}
            <button
              className="text-red-600 px-3 w-20 h-10  rounded-xl py-2 border-red-600 border hover:bg-red-600 transition-colors hover:text-white"
              onClick={() => {
                setSecondStep(false);
                setModal(false);
              }}
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
