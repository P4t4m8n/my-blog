export default function BlogDetailsSkeleton() {
  return (
    <section className="flex flex-col gap-12 bg-customDark rounded-lg px-16 p-4 text-customLight font-bitter animate-pulse">
      <header className="ml-detailsHeaderLeft">
        <div className="flex items-center gap-4">
          <div className="bg-customTeal rounded-full w-12 h-12"></div>
          <div className="bg-gray-700 h-10 w-2/3 rounded"></div>
        </div>
        <div className="mt-5 flex items-center">
          <div className="bg-gray-700 w-32 h-32 rounded-3xl mr-16"></div>
          <div className="bg-gray-700 h-16 w-1/2 rounded"></div>
        </div>
      </header>
      <div className="flex gap-4">
        <div className="min-w-[20%]">
          <div className="bg-customCardBgMaroon px-12 py-4 rounded-lg font-light mb-4">
            <div className="bg-gray-700 h-6  rounded mb-2"></div>
            <div className="space-y-2">
              <div className="bg-gray-700 h-4  rounded"></div>
              <div className="bg-gray-700 h-4  rounded"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="bg-gray-700 h-4  rounded"></div>
              <div className="bg-gray-700 h-4  rounded"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="bg-gray-700 h-4  rounded"></div>
              <div className="bg-gray-700 h-4  rounded"></div>
            </div>
          </div>
          <div className="bg-customCardBgPurple px-12 py-4 rounded-lg font-light">
            <div className="bg-gray-700 h-6  rounded mb-2"></div>
            <div className="space-y-2">
              <div className="bg-gray-700 h-4 w-full rounded"></div>
              <div className="bg-gray-700 h-4 w-full rounded"></div>
              <div className="bg-gray-700 h-4 w-full rounded"></div>
              <div className="bg-gray-700 h-4 w-full rounded"></div>
            </div>
          </div>
        </div>
        <main className="flex-1">
          <div className="bg-gray-700 h-96 rounded mb-4"></div>
          <div>
            <div className="bg-gray-700 h-6 w-1/4 rounded mb-4"></div>
            <ul className="flex gap-4 flex-wrap">
              <li className="bg-customGray h-8 w-20 rounded-lg"></li>
              <li className="bg-customGray h-8 w-20 rounded-lg"></li>
              <li className="bg-customGray h-8 w-20 rounded-lg"></li>
              <li className="bg-customGray h-8 w-20 rounded-lg"></li>
            </ul>
          </div>
          <div className="bg-gray-700 h-10 w-1/3 rounded my-8"></div>
        </main>
      </div>
    </section>
  );
}
