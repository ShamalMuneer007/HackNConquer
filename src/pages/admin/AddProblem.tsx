import { useState } from "react";
import ProblemDetialsCard from "../../components/admin/problems/ProblemDetialsCard";
import ProblemCodeCard from "@/components/admin/problems/ProblemCodeCard";
function AddProblem() {
  const [language, setLanguage] = useState("Javascript");
  return (
    <>
      <h1 className="text-white font-bold text-4xl">Problems</h1>
      <h3 className="text mt-8 mb-2 font-semibold text-2xl text-primary">
        Add problem
      </h3>

      <div className="w-full pb-7">
        <ProblemDetialsCard setLanguage={setLanguage} />
        <ProblemCodeCard language={language} />
      </div>
    </>
  );
}

export default AddProblem;
