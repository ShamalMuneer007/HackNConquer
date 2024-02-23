import { TypeDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/actions/userActions";
import Particle from "../../components/particle/Particle";
import Logo from "../../components/Logo/Logo";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import BasicFormikInput from "../../components/input/BasicFormikInput";
import { GoogleLogin } from "@react-oauth/google";
import { Typewriter } from "react-simple-typewriter";
import IUserInformation from "../../interfaces/IUserInformation";

function Signup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch: TypeDispatch = useDispatch();
  function handleLoginSubmit(userCredentials: IUserInformation) {
    console.log(userCredentials);
    dispatch(userRegister(userCredentials));
  }
  return (
    <>
      <div className="h-[99vh] md:px-24 px-2">
        <Particle />

        <div className="text-white font-bold absolute pt-10 md:left-[5%] left-[10%] md:text-3xl text-4xl">
          <Logo />
        </div>
        <div className="flex h-full items-center lg:justify-start justify-center gap-32">
          <div className="backdrop-blur-sm ms-20 mt-14 bg-opacity-15 bg-slate-400 rounded-xl h-[85%] lg:h-[80%] lg:w-[40%] w-[70%]">
            <div className="flex flex-col">
              <div className="lg:ps-20 pt-20 mb-14 ">
                <h2 className="text-white font-bold text-4xl text-center lg:text-left">
                  Sign up
                </h2>
              </div>
              <div className="items-center h-full">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleLoginSubmit}
                >
                  <Form className="w-full flex flex-col items-center gap-5 justify-center">
                    <BasicFormikInput name="username" placeholder="Username" />
                    <BasicFormikInput name="email" placeholder="Email" />
                    <BasicFormikInput name="password" placeholder="Password" />
                    <BasicFormikInput
                      name="confirmPassword"
                      placeholder="Retype your password"
                    />
                    <div></div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="bg-transparent text-primary border-primary border hover:bg-primary hover:text-black transition-colors w-28 h-9 text-lg font-bold rounded-lg tracking-wide"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                </Formik>
                <p className="text-white w-full text-center pt-4 lg:pt-9">OR</p>
                <div className="flex justify-center w-full mt-5">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                    text="continue_with"
                  />
                </div>
                <div className="text-white text-md pt-5 lg:hidden relative flex  justify-center">
                  <div className="">
                    Already have an account?{" "}
                    <span className="text-primary font-semibold">
                      <Link to={"/login"}>Login</Link>
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
                Already have an account?{" "}
                <span className="text-primary font-semibold">
                  <Link to={"/login"}>Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
