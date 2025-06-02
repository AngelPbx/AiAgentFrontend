// src/components/commoncomponents/Loader.jsx
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-black/0.1">
      {/* Top Circular Loader */}
      <div className="absolute  animate-spin text-white">
        <LoaderCircle size={40} />
      </div>
    </div>
  );
};

export default Loading;
