export default function BlogHomeSkeleton() {
  const skeletonCount = 8;
  return (
    <ul className="flex flex-wrap overflow-auto text-customDark gap-4 font-bitter hide-scrollbar ">
      {Array.from({ length: skeletonCount }, (_, index) => (
        <li
          key={index}
          className="rounded-2xl flex flex-col  justify-end  animate-pulse pt-[15%] bg-slate-700 max-h-[23rem]  basis-[20rem]  relative   flex-1 p-4 pb-8 "
        >
          <div className=" bg-white w-[100%] min-h-fit p-4 pb-8 rounded-t-lg rounded-br-lg  ">
            <div className=" bg-slate-500 mb-4 w-[40%] min-h-8 rounded-lg"></div>
            <div className=" bg-slate-500   min-h-8 rounded-lg"></div>
          </div>
          <div className="  bg-white w-[90%] min-h-12 flex  justify-between px-4 pb-8 rounded-b-lg  ">
            <div className=" bg-slate-500 w-[30%]  min-h-8 rounded-lg"></div>
            <div className=" bg-slate-500 w-[40%]  min-h-8 rounded-lg"></div>
            <div className=" bg-slate-500 w-[20%]  min-h-8 rounded-lg"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
