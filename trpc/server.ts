import "server-only";

import { createCaller } from "@/server/root";
import { createTRPCContext } from "@/server/trpc";
import { headers } from "next/headers";
import { cache } from "react";

const createContext = cache(async () => {
  const heads = await headers();

  return createTRPCContext({
    headers: heads,
  });
});

export const api = async () => createCaller(await createContext());
