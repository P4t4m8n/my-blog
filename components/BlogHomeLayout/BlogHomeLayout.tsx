import { prisma } from "@/prisma/prismaClient";
import Image from "next/image";
export default async function BlogHomeLayout() {
  const blogs = await prisma.blogPost.findMany({
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 10,
  });
  prisma.$disconnect();
  try {
    const blogs = await prisma.blogPost.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    });
  } catch (error) {}

  const latest = blogs[0];
  const rest = blogs.slice(1);

  return (
    <section className="hide-scrollbar">
      <ul className="flex flex-wrap overflow-auto text-customDark gap-4 font-bitter hide-scrollbar ">
        <li className="shadow-md overflow-hidden basis-[40rem] min-h-[25rem] rounded-2xl relative flex-2 p-4 zoom-hover-container">
          <Image
            className="rounded-2xl"
            src={latest.imgs[0]}
            alt={latest.title}
            fill={true}
          />
          <div className="p-2 absolute bottom-4 left-2">
            <div className="bg-white relative card-curve-before p-4 w-fit rounded-t-2xl">
              <h3 className="bg-black w-fit p-1 px-2 rounded-3xl text-white text-center">
                LATEST
              </h3>
            </div>
            <div className="grid gap-1 bg-white w-fit p-2 rounded-e-2xl">
              <h2 className="font-bold text-2xl z-10">{latest.title}</h2>
              <p className="font-semibold">{latest.description}</p>
            </div>
            <div className="bg-white w-fit font-medium card-curve-after relative p-4 flex items-center gap-4 rounded-b-2xl">
              <h4 className="bg-gray-300 rounded-2xl min-w-fit px-4 py-1">
                {latest.tags[0].name}
              </h4>
              <h4>{latest.createdAt.toDateString()}</h4>
              <h4>-</h4>
              <h4 className="z-10">{latest.readTime + " min read"}</h4>
            </div>
          </div>
        </li>

        {rest.map((blog) => (
          <li
            className="rounded-2xl  basis-[20rem] relative max-h-[20rem] min-h-[25rem] flex-1 p-4 zoom-hover-container"
            key={blog.id}
          >
            <Image
              className="rounded-2xl shadow-md hover:bac"
              src={blog.imgs[0]}
              alt={blog.title}
              fill={true}
            />
            <div className="  p-2 absolute bottom-4 left-2 ">
              <div className=" grid gap-1   bg-white w-fit p-2 rounded-e-2xl rounded-t-2xl">
                <h3 className="font-bold text-2xl  ">{blog.title}</h3>
                <p className=" font-semibold z-10  ">{blog.description}</p>
              </div>
              <div className="bg-white w-[90%] font-medium card-curve-after relative p-4 flex items-center gap-4 rounded-b-2xl">
                <h4 className="  bg-gray-300 rounded-2xl min-w-fit px-4 py-1">
                  {blog.tags[0].name}
                </h4>
                <h4>{blog.createdAt.toDateString()}</h4>
                <h4>{blog.readTime + " min read"} </h4>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
