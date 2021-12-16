import { Handler } from "@netlify/functions";
import cookie from "cookie";
import faunadb, { query as q } from "faunadb";
import { faunaSecret } from "./utils/variables";

const handler: Handler = async (event, context) => {
  let headers = event.headers;
  let cookieHeader = headers.cookie;
  if (!cookieHeader)
    return {
      statusCode: 303,
      headers: {
        Location: "/",
      },
    };
  let cookies = cookie.parse(cookieHeader);

  let oat = cookies.cyclexOat;

  let client = new faunadb.Client({
    secret: faunaSecret,
  });

  try {
    client.query(
      q.Delete(q.Select(["ref"], q.Get(q.Match("sessions_by_token", oat))))
    );
  } catch (err) {
    console.log("Error logging out.");
    console.log(err);
  }

  let oatCookie = cookie.serialize("cyclexOat", "", {
    maxAge: 0,
    path: "/",
  });
  let emailCookie = cookie.serialize("cyclexEmail", "", {
    maxAge: 0,
    path: "/",
  });

  return {
    statusCode: 303,
    multiValueHeaders: {
      "Set-Cookie": [oatCookie, emailCookie],
    },
    headers: {
      Location: "/",
    },
  };
};
export { handler };
