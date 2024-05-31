"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prismaClient_1 = require("./prismaClient");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, title, randomNumber, content, published, description, readTime, mainTag, bgColor, randomTags, imgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 20)) return [3 /*break*/, 5];
                    title = "Blog Post ".concat(i + 1);
                    randomNumber = getRandomNumber(100, 500);
                    content = makeLorem(randomNumber);
                    published = i % 2 === 0;
                    description = content.slice(0, 100);
                    readTime = calculateReadingTime(content);
                    mainTag = tagNames[Math.floor(Math.random() * tagNames.length)];
                    bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
                    randomTags = tagNames
                        .sort(function () { return 0.5 - Math.random(); })
                        .slice(0, Math.floor(Math.random() * tagNames.length) + 1);
                    imgs = imgUrls.slice(Math.floor(Math.random() * Math.floor(imgUrls.length / 3)), Math.floor(Math.random() * Math.floor(imgUrls.length)) + 1);
                    return [4 /*yield*/, prismaClient_1.prisma.blogPost.create({
                            data: {
                                title: title,
                                content: content,
                                published: published,
                                description: description,
                                readTime: readTime,
                                mainTag: mainTag,
                                bgColor: bgColor,
                                imgs: imgs,
                                tags: {
                                    connectOrCreate: randomTags.map(function (name) { return ({
                                        where: { name: name },
                                        create: { name: name },
                                    }); }),
                                },
                            },
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, delay(1)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    console.log("Database has been seeded.");
                    return [2 /*return*/];
            }
        });
    });
}
//*****Util*****//
var makeLorem = function (size) {
    if (size === void 0) { size = 500; }
    var words = [
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
    var txt = "";
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return txt;
};
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var tagNames = [
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
var imgUrls = [
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
var bgColors = [
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
var calculateReadingTime = function (text) {
    // Average reading speed
    var wordsPerMinute = 225;
    // Split text by whitespace to get word count
    var words = text.split(/\s+/).length;
    // Calculate reading time
    var readingTimeMinutes = words / wordsPerMinute;
    return readingTimeMinutes;
};
main()
    .catch(function (ev) {
    console.error(ev);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
