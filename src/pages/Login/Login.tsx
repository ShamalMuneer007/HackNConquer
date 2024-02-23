import Particle from "../../components/particle/Particle";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { userLogin } from "../../redux/actions/userActions";
import IUserInformation from "../../interfaces/IUserInformation";
import { TypeDispatch } from "../../redux/store/store";
import BasicFormikInput from "../../components/input/BasicFormikInput";
import { GoogleLogin } from "@react-oauth/google";

import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  const dispatch: TypeDispatch = useDispatch();
  function handleLoginSubmit(userCredentials: IUserInformation) {
    console.log(userCredentials);
    dispatch(userLogin(userCredentials));
  }
  return (
    <>
      <div className="h-[99vh] md:px-24 px-2">
        <Particle />

        <div className="text-white font-bold absolute pt-10 md:left-[5%] left-[10%] md:text-3xl text-4xl">
          <Logo />
        </div>
        <div className="flex h-full items-center lg:justify-start justify-center gap-32">
          <div className="backdrop-blur-sm ms-20 bg-opacity-15 bg-slate-400 rounded-xl lg:h-[74%] h-[74%] lg:w-[40%] w-[70%]">
            <div className="flex flex-col">
              <div className="lg:ps-20 pt-24 mb-14 ">
                <h2 className="text-white font-bold text-4xl text-center lg:text-left">
                  Sign in
                </h2>
              </div>
              <div className="items-center h-full">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleLoginSubmit}
                >
                  <Form className="w-full flex flex-col items-center gap-5 justify-center">
                    <BasicFormikInput name="username" placeholder="Username" />
                    <BasicFormikInput name="password" placeholder="Password" />
                    <div></div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="bg-transparent text-primary border-primary border hover:bg-primary hover:text-black transition-colors w-28 h-9 text-lg font-bold rounded-lg tracking-wide"
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </Formik>
                <p className="text-white w-full text-center pt-9">OR</p>
                <div className="flex justify-center w-full mt-5">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                  />
                </div>
                <div className="text-white text-md pt-5 lg:hidden relative flex  justify-center">
                  <div className="">
                    Don't have an account?{" "}
                    <span className="text-primary font-semibold">
                      <Link to={"/signup"}>Register</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex hidden flex-col md:h-[74%] md:w-[40%] w-52">
            <div className="relative lg:flex md:h-[74%] md:w-full flex justify-center items-center">
              <div className="text-white font-bold text-4xl ">
                <Typewriter
                  words={["Eat", "Sleep", "Code", "Repeat!"]}
                  loop={100}
                  cursor
                  cursorStyle="|"
                  cursorColor="#5BBA0C"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                ></Typewriter>
              </div>
            </div>
            <div className="text-white text-xl relative flex  justify-center">
              <div className="">
                Don't have an account?{" "}
                <span className="text-primary font-semibold">
                  <Link to={"/signup"}>Register</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
