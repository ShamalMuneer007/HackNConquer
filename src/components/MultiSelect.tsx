import React, { useState } from "react";
interface Props {
  options: any;
  onChange: Function;
}
const MultiSelect = ({ options, onChange }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: any) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o: any) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    onChange(selectedOptions);
  };

  const handleOutsideClick = (e: any) => {
    if (e.target.closest(".multi-select") === null) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="multi-select relative w-64">
      <div
        className="select-box bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.map((option: any) => option).join(", ")
            : "Select options"}
        </span>
        <svg
          className={`ml-auto transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {isOpen && (
        <div className="options-box bg-white border border-gray-300 rounded-md absolute top-full left-0 right-0 z-10 mt-2 overflow-auto max-h-60">
          {options.map((option: any) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOptions.includes(option) ? "bg-gray-200" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
