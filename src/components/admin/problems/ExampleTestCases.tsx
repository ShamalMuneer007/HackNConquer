import { TestExample } from "@/pages/admin/AddProblem";
import { Card, Input, Typography } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  examples: TestExample[];
  setExamples: Dispatch<SetStateAction<TestExample[]>>;
}
function ExampleTestCases({ examples, setExamples }: Props) {
  return (
    <Card
      className="p-5 w-full mt-10 bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
      placeholder=""
    >
      {" "}
      <div className="mb-5">
        <Typography variant="h4" color="white" className="" placeholder="">
          Example Test Cases
        </Typography>
      </div>
      <div className="text-white">
        {examples.map((example, index) => (
          <div key={index}>
            <p className="text-xl px-5">Example {index + 1}:</p>
            <div className="p-5 flex gap-20">
              <Input
                crossOrigin={null}
                color="green"
                spellCheck="true"
                value={example.input}
                onChange={(e) =>
                  setExamples(
                    examples.map((val, i) =>
                      i === index ? { ...val, input: e.target.value } : val
                    )
                  )
                }
                label="Input"
                className="text-black font-bold border border-white mr-5"
                style={{ color: "white", fontSize: "16px" }}
              />
              <Input
                crossOrigin={null}
                color="green"
                spellCheck="true"
                value={example.output}
                onChange={(e) =>
                  setExamples(
                    examples.map((val, i) =>
                      i === index ? { ...val, output: e.target.value } : val
                    )
                  )
                }
                label="Output"
                className="text-black font-bold border border-white"
                style={{ color: "white", fontSize: "16px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ExampleTestCases;
