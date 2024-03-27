import React from "react";
import { Link } from "react-router-dom";

function ServerError() {
  return (
    <div className="page-padding">
      <div className="text-6xl h-[70vh] flex-col gap-10 flex justify-center items-center font-bold text-center text-primary">
        <div>
          {" "}
          Something went wrong <span className="text-white ps-10">: {"("}</span>
        </div>
        <Link
          to={"/"}
          className="text-primary border border-primary p-4 hover:bg-primary hover:text-black transition-colors text-xl"
        >
          HOME
        </Link>
      </div>
    </div>
  );
}

export default ServerError;
