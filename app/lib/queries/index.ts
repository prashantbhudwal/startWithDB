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

//Id not greater than 2 and the name starts with S/s
export async function getUsersStartingWithSOrWithIdGreaterThanTwo() {
  const users = await prisma.user.findMany({
    where: {
      id: {
        gt: 2,
      },
      OR: {
        name: {
          startsWith: "S",
          mode: "insensitive",
        },
      },
    },
  });
  const alternateImplementation = await prisma.user.findMany({
    where: {
      OR: [
        {
          id: {
            gt: 2,
          },
        },
        {
          name: {
            startsWith: "S",
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return users;
}

// All published posts with github and twitter in the title
export async function getPosts() {
  return await prisma.post.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: "github",
                mode: "insensitive",
              },
            },
            {
              title: {
                contains: "twitter",
                mode: "insensitive",
              },
            },
          ],
        },
        {
          published: true,
        },
      ],
    },
  });
}



export async function getUsers() {
  return await prisma.user.findMany();
}

// export async function getUsers() {
//   return await prisma.user.findMany();
// }

// export async function getPosts() {
//   return await prisma.posts.findMany();
// }
