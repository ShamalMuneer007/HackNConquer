import { LANGUAGE_ID } from "@/constants/language";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import { IProblemData } from "@/pages/admin/AdminProblems";
import React, { useState } from "react";
import Description from "./Description";
import Submissions from "./Submissions";
interface Props {
  problemInfo: IProblemData;
}
function ProblemDetailWindow({ problemInfo }: Props) {
  const [window, setWindow] = useState(1);
  const changeWindow = (windowNumber: number) => {
    setWindow(windowNumber);
  };
  return (
    <div className="h-[90vh] relative w-full  bg-dark-200">
      {/* <div className="fixed inset-0 top-0  bg-gray-800 opacity-50"></div>    */}
      <div className="z-10 sticky top-0">
        <div className=" text-white w-full p-4">
          <div className="w-full flex gap-10 justify-center">
            <button
              className={`${
                window == 1 ? " text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(1)}
            >
              Description
            </button>
            <button
              className={`${
                window == 2 ? "text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(2)}
            >
              Submissions
            </button>
            <button
              className={`${
                window == 3 ? " text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(3)}
            >
              Solution
            </button>
          </div>
        </div>
      </div>
      <hr />
      {window == 1 && <Description problemInfo={problemInfo} />}
      {window == 2 && <Submissions problemInfo={problemInfo} />}
    </div>
  );
}

export default ProblemDetailWindow;
