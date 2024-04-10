import Logo from "@/components/Logo/Logo";
import Particle from "@/components/particle/Particle";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <Particle />
      <div className="page-padding relative dark:text-white">
        {/* Hero Section */}
        <div className="container mx-auto py-20 px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl  font-bold mb-4">
              Welcome to Hack<span className="text-primary">N</span>Conquer
            </h1>
            <p className="text-lg mb-8">
              Practice your coding skills and compete with programmers from
              around the world.
            </p>
            <Link to={"/login"}>
              <button className="bg-transparent transition-colors hover:bg-primary hover:text-black font-semibold border-primary border text-primary px-4 py-2 rounded-md">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="container">
          <div className="">
            <div className="flex items-center flex-col  gap-10 w-full">
              <div className="flex w-full justify-end items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Practice Problems</h3>
                  <p>
                    Practice a wide range of programming problems and improve
                    your skills.
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-start items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Practice Problems</h3>
                  <p>
                    Practice a wide range of programming problems and improve
                    your skills.
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-end items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Practice Problems</h3>
                  <p>
                    Practice a wide range of programming problems and improve
                    your skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
