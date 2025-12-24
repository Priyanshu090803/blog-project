
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { posts, postsToCategories, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { generateSlug } from "@/utils/slug";

export const postRouter = createTRPCRouter({

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        published: z.boolean().default(false),
        imageUrl: z.string().optional(),    
        categoryIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = generateSlug(input.title);

      const [post] = await ctx.db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug,
          published: input.published,
          imageUrl: input.imageUrl,
        })
        .returning();

      if (input.categoryIds?.length) {
        await ctx.db.insert(postsToCategories).values(
          input.categoryIds.map((categoryId) => ({
            postId: post.id,
            categoryId,
          }))
        );
      }

      return post;
    }),

  getAll: publicProcedure
    .input(z.object({ categoryId: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      // If filtering by category
      if (input?.categoryId) {
        return ctx.db
          .select({
            post: posts,
            category: categories,
          })
          .from(posts)
          .innerJoin(
            postsToCategories,
            eq(posts.id, postsToCategories.postId)
          )
          .innerJoin(
            categories,
            eq(categories.id, postsToCategories.categoryId)
          )
          .where(eq(categories.id, input.categoryId))
          .orderBy(desc(posts.createdAt));
      }

      // No filter → return all posts
      return ctx.db.query.posts.findMany({
        with: {
          postsToCategories: {
            with: {
              category: true,
            },
          },
        },
        orderBy: [desc(posts.createdAt)],
      });
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          postsToCategories: {
            with: {
              category: true,
            },
          },
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        content: z.string().min(1),
        published: z.boolean().optional(),
        imageUrl: z.string().optional(),
        categoryIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categoryIds, ...data } = input;

      // 1. Update post
      await ctx.db
        .update(posts)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id));

      // 2. Reset categories
      await ctx.db
        .delete(postsToCategories)
        .where(eq(postsToCategories.postId, id));

      if (categoryIds?.length) {
        await ctx.db.insert(postsToCategories).values(
          categoryIds.map((categoryId) => ({
            postId: id,
            categoryId,
          }))
        );
      }

      // 3. Return updated post
      return ctx.db.query.posts.findFirst({
        where: eq(posts.id, id),
        with: {
          postsToCategories: {
            with: {
              category: true,
            },
          },
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(postsToCategories)
        .where(eq(postsToCategories.postId, input.id));

      await ctx.db.delete(posts).where(eq(posts.id, input.id));

      return { success: true };
    }),
});
