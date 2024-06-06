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
            <div className="flex items-center flex-col gap-10 w-full">
              <div className="flex w-full justify-start items-center">
                <div className="w-[50%]">
                  <h3 className="text-3xl font-bold mb-4">
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
              <div className="flex w-full justify-end items-center">
                <div className="w-[50%]">
                  <h3 className="text-3xl font-bold mb-4">
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
              <div className="flex w-full justify-start items-center">
                <div className="w-[50%]">
                  <h3 className="text-3xl font-bold mb-4">
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
