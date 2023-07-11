import prisma from "@/app/lib/prisma";

// GET users whose name starts with "J" and have at least one post with a like.
export async function getUsersWithLikedPostsStartingWithJ() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      role: true,
    },
    where: {
      name: {
        startsWith: "J",
      },
      AND: {
        posts: {
          some: {
            likeNum: {
              gt: 0,
            },
          },
        },
      },
    },
  });
  return users;
}
//GET all users whose IDs are not in the range of 1 to 2
export async function getUsersNotInRange() {
    const users = await prisma.user.findMany({
        where: {
            id: {
                notIn: [1, 2],
            },
        },
    });
    return users;
}

export async function getUsers() {
  
}