import { TestCase } from "@/interfaces/TestCase";
import { FaTrash } from "react-icons/fa6";

interface Props {
  testCases: TestCase[];
  setTestCases: (testCases: TestCase[]) => void;
}
export default function TestCases({ testCases, setTestCases }: Props) {
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedTestCases: any = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleAddRow = () => {
    if (testCases.length !== 30)
      setTestCases([
        ...testCases,
        {
          testCaseInput: "",
          expectedOutput: "",
          idx: testCases[testCases.length - 1].idx + 1,
        },
      ]);
  };
  const handleRemoveButton = (idx: number) => {
    setTestCases(testCases.filter((testCase) => testCase.idx !== idx));
  };

  return (
    <>
      <div className="flex justify-center">
        <table className="">
          <thead className="">
            <tr className="text-white">
              <th>Test Case Input</th>
              <th>Expected Output</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => (
              <tr key={testCase.idx}>
                <td className="relative">
                  <span className="absolute -left-7">{index + 1}</span>
                  <textarea
                    disabled={testCases.length - 1 !== index}
                    className="bg-dark-100 w-96 text-white p-2"
                    value={testCase.testCaseInput}
                    onChange={(e) =>
                      handleInputChange(index, "testCaseInput", e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    disabled={testCases.length - 1 !== index}
                    value={testCase.expectedOutput}
                    className="bg-dark-100 w-96 text-white p-2"
                    onChange={(e) =>
                      handleInputChange(index, "expectedOutput", e.target.value)
                    }
                  />
                </td>
                {testCases.length > 1 && (
                  <td>
                    <button
                      type="button"
                      className="bg-transparent ps-4 hover:text-red-700 transition-colors text-white p-2"
                      onClick={() => handleRemoveButton(testCase.idx)}
                    >
                      <span className="text-md">
                        <FaTrash />
                      </span>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {testCases[testCases.length - 1]["testCaseInput"] != "" &&
          testCases[testCases.length - 1]["expectedOutput"] != "" && (
            <button
              className="text-primary transition-colors m-3 p-1 w-32 rounded border-primary border hover:bg-primary hover:text-black"
              onClick={handleAddRow}
            >
              Add test case
            </button>
          )}
      </div>
    </>
  );
}
