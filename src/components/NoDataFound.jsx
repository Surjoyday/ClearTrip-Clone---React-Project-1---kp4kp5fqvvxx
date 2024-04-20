import { IoWarningOutline } from "react-icons/io5";

export default function NoDataFound({ onReset }) {
  return (
    <div className="">
      <div className="flex flex-col gap-2 items-center">
        <IoWarningOutline size={150} className="text-stone-400" />

        <p className="text-2xl font-semibold">
          We couldn't find flights to match your filters
        </p>
        <p className="text-stone-500">
          Please reset your filters to see flights
        </p>
        <button
          onClick={onReset}
          className="font-bold text-white bg-[#3366CC] py-2 px-10 rounded-md"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
