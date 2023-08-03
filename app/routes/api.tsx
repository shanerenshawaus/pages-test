

import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";


export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
  SESSIONS_BINDING: KVNamespace;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM Customers LIMIT 5").all();
  return json(results);
};

export default function Api() {
  const results = useLoaderData<typeof loader>();

  return (
    <div>
            {results.map(result => (
                <div key={result.CustomerId}>
                    <p>{result.CompanyName}</p>
                    <p>{result.ContactName}</p>
                </div>
            ))}
        </div>
  )
};