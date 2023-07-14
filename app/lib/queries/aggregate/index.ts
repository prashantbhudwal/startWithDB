import prisma from "../../prisma";

export async function getLikeCountOfPublishedPosts() {
  const posts = await prisma.post.aggregate({
    where: {
      published: true,
    },
    _sum: {
      likeNum: true,
    },
  });
  return posts;
}

// Avg like count of the posts in the Big Data category
export async function getPosts() {
  return await prisma.post.aggregate({
    where: {
      categories: {
        some: {
          name: "Big Data",
        },
      },
    },
    _avg: {
      likeNum: true,
    },
    _sum: {
      likeNum: true,
    },
    _count: {
      published: true,
    },
  });
}
