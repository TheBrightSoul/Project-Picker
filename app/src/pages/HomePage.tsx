import React from "react";
import PageWrapper from "../components/PageWrapper";

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold mb-4">👋 Welcome, TheBrightSoul!</h1>
      <p className="text-lg max-w-xl">Universe awaits your code... ✨</p>
    </PageWrapper>
    // <div className="p-10 text-center text-hacker-text-light dark:text-hacker-text-dark">
    //   <h1 className="text-4xl font-bold mb-4">👋 Welcome, TheBrightSoul!</h1>
    //   <p className="text-lg">
    //     Your hacker-themed project manager is ready to serve.
    //   </p>
    // </div>
  );
};

export default HomePage;
