import { Event } from "@netlify/functions/dist/function/event";
import cookie from "cookie";
import { Client, query as q } from "faunadb";

export let authenticate = async (
  client: Client,
  event: Event
): Promise<string | null> => {
  let headers = event.headers;
  let cookieHeader = headers.cookie;
  if (!cookieHeader) return null;
  let cookies = cookie.parse(cookieHeader);

  let oat = cookies.cyclexOat;
  let requestEmail = cookies.cyclexEmail;
  try {
    let o = (await client.query(q.KeyFromSecret(cookies.cyclexOat))) as any;
    let user = (await client.query(q.Get(o.instance))) as any;
    let oatEmail = user.data.email;

    if (oatEmail !== requestEmail) return null;
    return oatEmail;
  } catch (err) {
    console.log(err);
    return null;
  }
};
