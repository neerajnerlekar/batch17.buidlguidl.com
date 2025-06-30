"use client";

import { useState } from "react";
import Quiz from "../components/Web3SecurityQuiz/Quiz";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: checkedInCount, isLoading } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "checkedInCounter",
  });
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Batch 17</span>
          </h1>
          <p className="text-center text-lg">6.11.2025 ~ 6.28.2025</p>
          {/* <p>6.11.2025 ~ 6.28.2025</p> */}
          <p className="text-lg flex gap-2 justify-center">
            <span className="font-bold">Checked in builders count:</span>
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span className="inline-block animate-pulse">{checkedInCount}</span>
            )}
          </p>
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-1 items-center justify-center flex-col">
              {!showQuiz ? (
                <>
                  <h2 className="text-2xl font-bold text-center mb-6">Ready to Challenge a Security Quiz!</h2>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="btn btn-primary btn-lg shadow-lg text-lg px-8 py-3 rounded-full font-bold"
                  >
                    Start
                  </button>
                </>
              ) : (
                <Quiz />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
