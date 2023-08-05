

import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";


export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
  SESSIONS_BINDING: KVNamespace;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  // let { results } = await env.DB.prepare("SELECT * FROM Customers LIMIT 5").all();
  return json(env);
};

export default function Api() {
  const results = useLoaderData<typeof loader>();
  console.log(results)
  return (
    <div>
        </div>
  )
};