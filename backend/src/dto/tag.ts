import { z } from "zod";

export const tagsResponse = z.array(
  z.object({
    tag: z.string(),
    count: z.number(),
  })
);
