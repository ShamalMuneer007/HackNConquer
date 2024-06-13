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
        <div className="md:mx-auto md:py-20 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="md:text-4xl text-3xl font-bold mb-4">
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
            <div className="md:flex items-center flex-col gap-10 w-full">
              <div className="md:flex w-full justify-start md:border-none border md:bg-transparent bg-dark-100/80 md:my-0 md:p-0 border-primary p-5 rounded-lg my-5 items-center">
                <div className="md:w-[50%] md:mb-5">
                  <h3 className="md:text-3xl text-2xl font-bold mb-4">
                    Sharpen Your Skills
                  </h3>
                  <p>
                    Enhance your programming abilities by solving a diverse
                    range of coding challenges. Our extensive collection of
                    practice problems covers various difficulty levels and
                    topics, helping you grow as a developer.
                  </p>
                </div>
              </div>
              <div className="md:flex w-full justify-end md:border-none border md:bg-transparent bg-dark-100/80 md:my-0 md:p-0 border-primary p-5 rounded-lg my-5 items-center">
                <div className="md:w-[50%] md:mb-5">
                  <h3 className="md:text-3xl text-2xl font-bold mb-4">
                    Join a Clan, Lead the Leaderboard
                  </h3>
                  <p>
                    Collaborate with like-minded programmers by joining a clan.
                    Work together to solve problems, earn points, and propel
                    your clan to the top of the leaderboard. Showcase your
                    skills and achieve recognition within the community.
                  </p>
                </div>
              </div>
              <div className="md:flex w-full justify-start md:border-none border md:bg-transparent bg-dark-100/80 md:my-0 md:p-0 border-primary p-5 rounded-lg my-5 items-center">
                <div className="md:w-[50%] mb-10 md:mb-5">
                  <h3 className="md:text-3xl text-2xl font-bold mb-4">
                    Challenge Your Friends
                  </h3>
                  <p>
                    Put your coding prowess to the test by competing against
                    your friends. Engage in friendly rivalries, solve problems
                    faster and more efficiently than your peers, and prove that
                    you are the ultimate coding champion among your circle.
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
