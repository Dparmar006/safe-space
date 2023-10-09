import React from "react";

const Loading = () => {
  return (
    <section role="loading">
      <div className="h-2"></div>
      <div className="skeleton h-12 rounded-md"></div>
      <div className="h-2"></div>
      <div className="skeleton h-16 rounded-md"></div>
      <div className="h-2"></div>
      <div className="skeleton h-28 rounded-md"></div>
      <div className="divider"></div>
      {Array.from({ length: 5 }).map((_) => (
        <div className="skeleton h-36 rounded-md mb-2 border-b"></div>
      ))}
    </section>
  );
};

export default Loading;
