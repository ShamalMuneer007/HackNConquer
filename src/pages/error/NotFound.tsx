import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-padding">
      <div className="text-9xl h-[70vh] flex-col gap-10 flex justify-center items-center font-bold text-center text-primary">
        <div>404</div>
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

export default NotFound;
