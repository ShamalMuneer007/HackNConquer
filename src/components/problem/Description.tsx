import { LANGUAGE_ID } from "@/constants/language";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import { IProblemData } from "@/pages/admin/AdminProblems";
import React from "react";
interface Props {
  problemInfo: IProblemData;
}
function Description({ problemInfo }: Props) {
  return (
    <div className="overflow-y-auto h-full text-white p-10">
      <div className="problem-heading font-semibold text-3xl">
        <span className="">{problemInfo.problemNo}.</span>{" "}
        <span className="">{problemInfo.problemName}</span>
      </div>
      <div className="w-full flex gap-5 my-5">
        <div className="">
          Difficulty :{" "}
          <span
            className={`font-bold w-auto p-2 rounded-3xl ${
              DIFFICULTY_TEXT_COLOR[problemInfo.difficulty]
            }`}
          >
            {problemInfo.difficulty}
          </span>
        </div>
        <div>|</div>
        <div>
          Language :{" "}
          <span className="ps-2 font-bold">
            {Object.keys(LANGUAGE_ID).find(
              (key) => LANGUAGE_ID[key] === problemInfo.languageId
            )}
          </span>
        </div>
        <div>|</div>
        <div>
          Level :{" "}
          <span className="ps-2 font-bold">{problemInfo.problemNo}</span>
        </div>
      </div>
      <div className="mt-10">{problemInfo.description}</div>
    </div>
  );
}

export default Description;
