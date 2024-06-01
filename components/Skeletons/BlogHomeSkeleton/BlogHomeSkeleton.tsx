export default function BlogHomeSkeleton() {
  const skeletonCount = 8;
  return (
    <ul className="flex flex-wrap overflow-auto text-customDark gap-4 font-bitter hide-scrollbar ">
      {Array.from({ length: skeletonCount }, (_, index) => (
        <li
          key={index}
          className="rounded-2xl animate-pulse pt-[15%]   bg-slate-700  basis-[20rem] relative max-h-[20rem] min-h-[25rem] flex-1 p-4 zoom-hover-container"
        >
          <div className="relative     block ">
            <div className="rounded-2xl  bg-gray-300 shadow-md h-64"></div>
            <div className="p-2 absolute bottom-4 left-2 w-full">
              <div className="bg-white p-4 w-fit rounded-t-2xl">
                <div className="bg-gray-300 w-20 h-6 rounded-3xl"></div>
              </div>
              <div className="grid gap-1 w-[90%] bg-white  p-2 rounded-e-2xl ">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-white w-[80%] font-medium p-4 flex items-center gap-4 rounded-b-2xl">
                <div className="bg-gray-300 rounded-2xl min-w-fit px-4 py-1 h-6"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
