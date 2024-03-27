import React from "react";
import { Rings } from "react-loader-spinner";
interface Props {
  loading: boolean;
}
function Loading({ loading }: Props) {
  return (
    <div>
      {loading && (
        <div className="fixed w-screen h-screen z-50 bg-black/20 backdrop-blur-md flex justify-center items-center">
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
}

export default Loading;
