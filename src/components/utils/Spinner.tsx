import { FC } from "react";

interface SpinnerProps {
  isOpen: boolean;
  muteBackground?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ isOpen, muteBackground = false }) => {
  return (
    <>
      {isOpen && (
        <>
          {muteBackground && (
            <div className="w-full h-full bg-gray-500/75 fixed inset-0 opacity-70 transition-opacity duration-300 z-10" />
          )}
          <div className="absolute top-[50%] left-[50%] -ml-10 -mt-10">
            <span className="h-10 w-10 block rounded-full border-2 border-t-indigo-500 animate-spin z-20" />
          </div>
        </>
      )}
    </>
  );
};

export default Spinner;
