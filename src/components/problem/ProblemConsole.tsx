import React from "react";

function ProblemConsole({ result }: any) {
  return (
    <div className="text-white font-semibold text-lg">
      <p className="text-base py-4">
        Accepted : {result.acceptedCases.length} test cases
      </p>
      {result.acceptedCases.map((acceptedCase: any, index: number) => (
        <table key={index} className="w-full border border-green-600">
          <thead>
            <tr>
              <th>Test case</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                {`${
                  acceptedCase.input.split("\n")[0].includes(" ") ? "[ " : ""
                }` +
                  acceptedCase.input.split("\n")[0].replaceAll(" ", ", ") +
                  `${
                    acceptedCase.input.split("\n")[0].includes(" ") ? " ]" : ""
                  }`}
                {acceptedCase.input.split("\n")[1] &&
                  ` , ${
                    acceptedCase.input.split("\n")[1].includes(" ") ? "[ " : ""
                  }` +
                    acceptedCase.input.split("\n")[1].replaceAll(" ", ", ") +
                    `${
                      acceptedCase.input.split("\n")[1].includes(" ")
                        ? " ]"
                        : ""
                    }`}
              </td>
              <td>
                {`${acceptedCase.trim(" ").length == 0 && "null"}`}
                {`${acceptedCase.output.includes(" ") ? "[ " : ""}` +
                  acceptedCase.output.replaceAll(" ", ", ") +
                  `${acceptedCase.output.includes(" ") ? " ]" : ""}`}
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      <p className="text-base py-4">
        Rejected: {result.rejectedCases.length} test cases
      </p>
      {result.rejectedCases.map((rejectedCase: any, index: number) => (
        <table key={index} className="w-full border border-red-600">
          <thead>
            <tr>
              <th>Test case</th>
              <th>Output</th>
              <th>Expected Output</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            <tr>
              <td>{"[ " + rejectedCase.input.replaceAll(" ", ", ") + " ]"}</td>
              <td>{"[ " + rejectedCase.output.replaceAll(" ", ", ") + " ]"}</td>
              <td>
                {"[ " +
                  rejectedCase.expectedOutput.replaceAll(" ", ", ") +
                  " ]"}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default ProblemConsole;
