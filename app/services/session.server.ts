import { createCookie, createWorkersKVSessionStorage } from "@remix-run/cloudflare";

import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});


export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  SESSIONS_BINDING: KVNamespace;
}


// export the whole sessionStorage object
// export let sessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: "_session", // use any name you want here
//     sameSite: "lax", // this helps with CSRF
//     path: "/", // remember to add this so the cookie will work in all routes
//     httpOnly: true, // for security reasons, make this cookie http only
//     secrets: ["s3cr3t"], // replace this with an actual secret
//   },
// });

const env = useContext()
export let sessionStorage =createWorkersKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: env.SESSIONS_BINDING,
    cookie: sessionCookie,
  });
