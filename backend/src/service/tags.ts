import { database } from "../database";

export async function getTags() {
  return await database.postTag.groupBy({
    by: ["tag"],
    _count: true,
    where: {
      post: {
        published: true,
      },
    },
  });
}
