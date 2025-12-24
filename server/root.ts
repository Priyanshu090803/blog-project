import { createTRPCRouter, createCallerFactory } from "./trpc";
import { postRouter } from "./routers/post";
import { categoryRouter } from "./routers/category";

export const appRouter = createTRPCRouter({
  post: postRouter,
  category: categoryRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
