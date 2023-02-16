import z from "zod";

export const notFoundResponse = z.object({
  message: z.string(),
});
