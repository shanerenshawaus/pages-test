import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { getWorkersKVSessionStorage } from "~/services/session.server";


export async function getAuthentication(env: Env) {
  let authenticator = await new Authenticator<User>(await getWorkersKVSessionStorage(env));
  authenticator.use(
    new OAuth2Strategy(
      {
        authorizationURL: env.OAUTH_AUTH_URL,
        tokenURL: env.OAUTH_TOKEN_URL,
        clientID: env.OAUTH_CLIENT_ID,
        clientSecret: env.OAUTH_CLIENT_SECRET,
        callbackURL: env.OAUTH_CALLBACK_URL,
        useBasicAuthenticationHeader: false, // defaults to false
      },
      async ({
        accessToken,
        refreshToken,
        extraParams,
        profile,
        context,
        request,
      }) => {
        // here you can use the params above to get the user and return it
        // what you do inside this and how you find the user is up to you
        return await getUser(
          accessToken,
          refreshToken,
          extraParams,
          profile,
          context,
          request
        );
      }
    ),
    // this is optional, but if you setup more than one OAuth2 instance you will
    // need to set a custom name to each one
    "user-pass"
  );
  return authenticator

}
