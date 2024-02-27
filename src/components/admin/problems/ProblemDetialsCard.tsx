import { Card, Textarea, Typography } from "@material-tailwind/react";
function ProblemDetialsCard() {
  return (
    <>
      <Card
        className="h-[70vh] p-5 w-full bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
        placeholder=""
      >
        <div className="mb-5">
          <Typography variant="h4" color="white" className="" placeholder="">
            Problem Details
          </Typography>
        </div>
        <div className="p-5">
          <Typography variant="lead" color="white" className="" placeholder="">
            Problem Name
          </Typography>
          <input className="bg-transparent focus:outline-none  focus:border-none border-white border focus:outline-green-800 h-5 w-60 rounded text-lg text-white p-5 font-bold"></input>
        </div>
        <div className="p-5">
          <Typography variant="lead" color="white" className="" placeholder="">
            Problem Description
          </Typography>
          <Textarea
            color="green"
            spellCheck="true"
            className=" text-black font-bold border border-white"
            label="Description"
            style={{ color: "white", fontSize: "18px" }}
          />
        </div>
        <div className="w-full flex justify-around">
          <div className="p-5">
            <Typography
              variant="lead"
              color="white"
              className=""
              placeholder=""
            >
              Problem Difficulty
            </Typography>
            <select className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 dark:bg-dark-300 dark:border-dark-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary">
              <option selected disabled>
                Choose Difficulty
              </option>
              <option
                value="easy"
                className="text-green-600 font-bold text-lg "
              >
                Easy
              </option>
              <option
                value="medium"
                className="text-yellow-600 font-bold text-lg"
              >
                Medium
              </option>
              <option value="hard" className="text-red-600 font-bold text-lg">
                Hard
              </option>
            </select>
          </div>
          <div className="p-5">
            <Typography
              variant="lead"
              color="white"
              className=""
              placeholder=""
            >
              Language
            </Typography>
            <select className="bg-gray-50 w-52 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 dark:bg-dark-300 dark:border-dark-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary">
              <option selected disabled>
                Choose Language
              </option>
              <option value="js" className="font-bold text-lg ">
                JavaScript
              </option>
              <option value="java" className="font-bold text-lg ">
                Java
              </option>
              <option value="golang " className="font-bold text-lg ">
                Golang
              </option>
            </select>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProblemDetialsCard;
