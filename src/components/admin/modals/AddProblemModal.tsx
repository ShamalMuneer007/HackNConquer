import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DriverCodeEditor from "../problems/DriverCodeEditor";
import { IProblemDetails } from "@/interfaces/IProblemDetails";
interface IFinalCode {
  originalCode: string;
  driverCode: string;
  solutionTemplate: string;
}
interface AddProblemModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  setCode: Dispatch<SetStateAction<IFinalCode>>;
  handleFormSubmission: (value: IProblemDetails) => void;
  code: IFinalCode;
  language: string;
}
function AddProblemModal({
  setModal,
  setCode,
  code,
  language,
}: AddProblemModalProps) {
  const [secondStep, setSecondStep] = useState(false);
  const editorRef = useRef<any>(null);
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  useEffect(() => {
    console.log(code);
  }, [code]);
  const nextButtonHandler = () => {
    setSecondStep(true);
    setCode((prevCode) => ({
      ...prevCode,
      driverCode: editorRef.current?.getValue(),
    }));
  };
  return (
    <div className="bg-black/20 h-screen w-screen backdrop-blur-sm shadow-md fixed z-30 inset-0 overflow-hidden">
      <div className="flex h-full w-full justify-center items-center">
        <div className="h-[90%] w-[60%] bg-dark-100 relative rounded text-white overflow-y-hidden">
          <div className=" p-6">
            {!secondStep ? (
              <>
                <h2 className="font-bold text-2xl">Driver Code</h2>
                <p className="font-semibold text-lg px-8 pt-5">
                  <img
                    className="inline mx-3"
                    width="33"
                    height="33"
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
                    width="32"
                    height="32"
                    src="https://img.icons8.com/emoji/48/warning-emoji.png"
                    alt="warning-emoji"
                  />
                  Create a solution template function for the user to code in it{" "}
                </p>
              </>
            )}
          </div>
          {!secondStep ? (
            <DriverCodeEditor
              setCode={setCode}
              secondStep={secondStep}
              handleEditorDidMount={handleEditorDidMount}
              language={language}
              initialValue={code.driverCode}
            />
          ) : (
            <DriverCodeEditor
              setCode={setCode}
              secondStep={secondStep}
              handleEditorDidMount={handleEditorDidMount}
              language={language}
              initialValue={code.solutionTemplate}
            />
          )}
          <div className="flex justify-end sticky gap-6 bottom-0 bg-dark-200 h-20 items-center pe-6">
            {!secondStep ? (
              <div
                className="border-primary border cursor-pointer flex justify-center items-center transition-colors w-20 h-10 rounded-xl   text-primary hover:bg-primary hover:text-black"
                onClick={() => {
                  nextButtonHandler();
                }}
              >
                Next
              </div>
            ) : (
              <button
                type="submit"
                className="border-primary border transition-colors w-32 h-10 rounded-xl   text-primary hover:bg-primary hover:text-black"
              >
                Add Problem
              </button>
            )}
            {/*  */}
            {!secondStep ? (
              <button
                type="button"
                className="text-red-600 px-3 w-20 h-10  rounded-xl py-2 border-red-600 border hover:bg-red-600 transition-colors hover:text-white"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className="text-yellow-600 px-3 w-20 h-10  rounded-xl py-2 border-yellow-600 border hover:bg-yellow-600 transition-colors hover:text-black"
                onClick={() => {
                  setSecondStep(false);
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProblemModal;
