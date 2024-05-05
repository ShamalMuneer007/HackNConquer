import { LANGUAGE_ID } from "@/constants/language";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import { IProblemData } from "@/pages/admin/AdminProblems";
interface Props {
  problemInfo: IProblemData;
}
function Description({ problemInfo }: Props) {
  return (
    <>
      <div className="overflow-y-scroll text-white p-10">
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
            <span className="ps-2 font-bold">{problemInfo.problemLevel}</span>
          </div>
        </div>
        <div className="mt-10">{problemInfo.description}</div>
        <div className="mt-10">
          {problemInfo.examples &&
            problemInfo.examples.map((example, index) => (
              <div key={index}>
                <div className="p-4">
                  <p>Example {index + 1} :</p>
                  <div className="mt-2 flex flex-col">
                    <div className="w-full my-2">
                      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md">
                        <span className="font-semibold text-green-400">
                          Input:{" "}
                        </span>
                        {example.input}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md">
                        <span className="font-semibold text-blue-400">
                          Output:{" "}
                        </span>
                        {example.output}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className=" p-10 flex items-end text-white">
        Acceptance Rate : {problemInfo.acceptanceRate}%
      </div>
    </>
  );
}

export default Description;
