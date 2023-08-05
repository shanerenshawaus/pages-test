import { LoaderFunction, createCookie, createCookieSessionStorage, createWorkersKVSessionStorage, json,AppLoadContext } from "@remix-run/cloudflare";

import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

export async function getWorkersKVSessionStorage(env) {
  return createWorkersKVSessionStorage({
    // The KV Namespace where you want to store sessions
    // This maps to the binding name set in wranlger.toml.
    kv: env.SESSIONS_BINDING,
    cookie: sessionCookie,
  });
}