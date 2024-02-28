import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import MainCodeEditor from "./MainCodeEditor";
interface props {
  language: string;
}
function ProblemCodeCard({ language }: props) {
  return (
    <Card
      className="h-[70vh] p-5 w-full mt-10 bg-dark-200 py-4 shadow-xl shadow-blue-gray-900/5"
      placeholder=""
    >
      <div className="mb-5">
        <Typography variant="h4" color="white" className="" placeholder="">
          Code
        </Typography>
      </div>
      <MainCodeEditor language={language}></MainCodeEditor>
    </Card>
  );
}

export default ProblemCodeCard;
