import type { BlogPost } from "../client/src/types";

const common = {
  id: 1,
  title: "Article",
  excerpt: "Article excerpt",
  date: "2026-01-01",
  coverImage: "/cover.png",
  category: "Leadership",
  readTime: "5 min read",
};

const localPost = {
  ...common,
  content: "<p>Readable article body</p>",
} satisfies BlogPost;

const externalPost = {
  ...common,
  externalUrl: "https://publisher.example/article",
} satisfies BlogPost;

// @ts-expect-error External articles must not duplicate their body locally.
const duplicatedExternalPost: BlogPost = {
  ...common,
  externalUrl: "https://publisher.example/article",
  content: "<p>Duplicate article body</p>",
};

// @ts-expect-error Local articles must contain a readable body.
const emptyLocalPost: BlogPost = {
  ...common,
};

void [
  localPost,
  externalPost,
  duplicatedExternalPost,
  emptyLocalPost,
];