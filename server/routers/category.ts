import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = input.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      await ctx.db.insert(categories).values({
        name: input.name,
        slug,
        description: input.description,
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.categories.findMany();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(categories).where(eq(categories.id, input.id));
    }),
});
