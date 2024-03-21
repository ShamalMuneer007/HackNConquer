import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface Props {
  items: any[] | null | undefined;
  setSelected: Function;
  setModal: (value: boolean) => any;
  selected: any[];
  fieldName: string;
}
function MultiSelectCheckBoxModal({
  items,
  setSelected,
  setModal,
  selected,
  fieldName,
}: Props) {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  useEffect(() => {
    setSelectedItems(selected);
  }, []);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const selectedItemsCopy = [...selectedItems];
    console.log("Original Array : ", selectedItems);
    console.log("Copy :", selectedItemsCopy);
    console.log(selectedItemsCopy.length);
    setFieldValue(fieldName, selectedItemsCopy);
  }, [fieldName, selectedItems, setFieldValue]);
  const handleCheckboxChange = (item: any) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i: any) => i !== item));
      setSelected((prevSelected: any) =>
        prevSelected.filter((category: any) => category !== item)
      );
    } else {
      if (selectedItems.length >= 4) {
        toast.warning("You can only pick maximum of four categories", {
          position: "top-center",
        });
        return;
      }
      setSelectedItems([...selectedItems, item]);
      setSelected((prevSelected: any) => [...prevSelected, item]);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="bg-dark-100  text-white rounded py-10 px-10 w-[50%]">
        <h2 className="font-bold text-2xl p-3">Select Categories</h2>
        <hr></hr>
        <div className="w-full flex justify-center mt-5">
          <div className="grid grid-cols-5 gap-4">
            {items &&
              items.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-start gap-2"
                >
                  <label
                    htmlFor={`checkbox-${item}`}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${item}`}
                      checked={selectedItems.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                      className="hidden"
                    />
                    <div className="relative flex items-center justify-center h-5 w-5  rounded ring-1 ring-primary">
                      {selectedItems.includes(item) && (
                        <div className="h-[75%] w-[70%] rounded bg-primary"></div>
                      )}
                    </div>
                    <span className="ml-2">{item}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full flex justify-end pe-10">
          <button
            type="button"
            className="rounded bg-transparent border px-5 py-2 mt-10 border-primary transition-colors hover:bg-primary hover:text-black"
            onClick={() => setModal(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiSelectCheckBoxModal;
