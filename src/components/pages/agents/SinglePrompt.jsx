import React from "react";

const SinglePrompt = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Single Prompt Flow</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Create New Flow
        </button>
      </div>

      <div className="grid gap-4">
        {/* Sample Flow Cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold">Flow {i}</h3>
            <p className="text-sm text-muted-foreground">
              This is a sample single prompt flow description.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="text-sm text-primary hover:underline">
                Edit
              </button>
              <button className="text-sm text-destructive hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePrompt;
