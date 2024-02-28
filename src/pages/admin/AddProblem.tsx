import { Card, Textarea, Typography } from "@material-tailwind/react";
import ProblemDetialsCard from "../../components/admin/problems/ProblemDetialsCard";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MainCodeEditor from "@/components/admin/problems/MainCodeEditor";
function AddProblem() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);
  return (
    <>
      <h1 className="text-white font-bold text-4xl">Problems</h1>
      <h3 className="text mt-8 mb-2 font-semibold text-2xl text-primary">
        Add problem
      </h3>

      <div className="w-full pb-7">
        <ProblemDetialsCard setLanguage={setLanguage} />
      </div>
    </>
  );
}

export default AddProblem;
