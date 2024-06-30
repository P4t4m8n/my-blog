import { prisma } from "./prismaClient";

async function main() {
  for (let i = 0; i < 20; i++) {
    const title = `Blog Post ${i + 1}`;
    const randomNumber = getRandomNumber(100, 500);
    const content = makeLorem(randomNumber);
    const published = i % 2 === 0;
    const description = content.slice(0, 100);
    const readTime = calculateReadingTime(content);
    const mainTag = tagNames[Math.floor(Math.random() * tagNames.length)];

    const randomTags = tagNames
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * tagNames.length) + 1);
    // const imgs = imgUrls.slice(
    //   Math.floor(Math.random() * Math.floor(imgUrls.length / 3)),
    //   Math.floor(Math.random() * Math.floor(imgUrls.length )) + 1
    // );
    

    const imgs = [imgUrls[i]];

    await prisma.blogPost.create({
      data: {
        title,
        content,
        published,
        description,
        readTime,
        mainTag,
        imgs,
        tags: {
          connectOrCreate: randomTags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });

    await delay(1);
  }

  console.log("Database has been seeded.");
}

//*****Util*****//
const makeLorem = (size = 500): string => {
  let words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  let txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tagNames = [
  "Technology",
  "Science",
  "Health",
  "Travel",
  "Education",
  "Lifestyle",
  "Food",
  "Fashion",
  "Business",
  "Finance",
  "Sports",
  "Entertainment",
  "Music",
  "Movies",
  "Books",
  "Art",
  "History",
  "Politics",
  "Environment",
  "DIY",
];

const imgUrls = [
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212024/samples/animals/btkahhiupv5app52h4aj.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704211852/samples/animals/c9vtiii2lxrd7ztrl2ty.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704090946/samples/animals/cat.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704090978/samples/animals/cld-sample-3.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704090974/samples/animals/dessert-on-a-plate.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212178/samples/animals/dlr4ys61pexygqrpzpgb.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212252/samples/animals/hgodv3ciihcwjsnfqjsv.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212096/samples/animals/hnayvlp7totmpnkgoowe.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1705531134/samples/animals/hxuhgoswvmpstkr1sbki.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212049/samples/animals/jmdcu0ntjdzjhkejpmjl.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212212/samples/animals/jwkhj5hdi4vzuohamk63.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704090958/samples/animals/kitten-playing.gif",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212223/samples/animals/kzjfcjjomrlpxulw4ljl.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212123/samples/animals/mzt9zq75mgpb87prfzrh.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212134/samples/animals/oaxmxok23evkl2bl39bh.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212163/samples/animals/omlftfdkfd60axwmlfez.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212147/samples/animals/r6jzjdmrkkxzvcfwwxj7.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704090947/samples/animals/reindeer.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212263/samples/animals/sydgtdgw8k3mb0xsldbe.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704211782/samples/animals/tdc3oucjigsixvymoegw.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704090952/samples/animals/three-dogs.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212086/samples/animals/tvxvcgumcvoinmnezxrz.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212189/samples/animals/typgshv91cfgatgmtykg.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212076/samples/animals/uzpd9ipqdiwl8clhql5r.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212240/samples/animals/vymiagkxpshivzzexvhy.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704212112/samples/animals/xwqtxe9emexrqehtueof.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1704211888/samples/animals/zcjfxp0ys5np2nl0istc.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1705531035/samples/animals/zjidpjlh0ibxzq3sqac4.jpg",
];

const bgColors = [
  "#FFD700",
  "#FF69B4",
  "#FF6347",
  "#FF4500",
  "#FF1493",
  "#FF00FF",
  "#FF00FF",
  "#FF0000",
  "#FDF5E6",
  "#F9ED69",
  "#F08A5D",
];

const calculateReadingTime = (text: string): number => {
  // Average reading speed
  const wordsPerMinute = 225;
  // Split text by whitespace to get word count
  const words = text.split(/\s+/).length;
  // Calculate reading time
  const readingTimeMinutes = words / wordsPerMinute;

  return readingTimeMinutes;
};

main()
  .catch((ev) => {
    console.error(ev);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
