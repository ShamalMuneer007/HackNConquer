interface TestCase<T> {
  input: T;
  output: T;
}
interface Props {
  testCases: TestCase<string>[];
  setTestCases: (testCases: TestCase<string>[]) => void;
}
export default function TestCases({ testCases, setTestCases }: Props) {
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedTestCases: any = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleAddRow = () => {
    if (testCases.length !== 30)
      setTestCases([...testCases, { input: "", output: "" }]);
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
              <tr key={index}>
                <td className="relative">
                  <span className="absolute -left-7">{index + 1}</span>
                  <input
                    type="text"
                    className="bg-dark-100 w-96 text-white p-2"
                    value={testCase.input}
                    onChange={(e) =>
                      handleInputChange(index, "input", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={testCase.output}
                    className="bg-dark-100 w-96 text-white p-2"
                    onChange={(e) =>
                      handleInputChange(index, "output", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="text-primary transition-colors m-3 p-1 w-32 rounded border-primary border hover:bg-primary hover:text-black"
          onClick={handleAddRow}
        >
          Add test case
        </button>
      </div>
    </>
  );
}
