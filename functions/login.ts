import { Handler } from "@netlify/functions";
import { parse } from "querystring";
import { loginSchema } from "../data/Forms";
import faunadb from "faunadb";
import { faunaSecret } from "./utils/variables";
import cookie from "cookie";

const handler: Handler = async (event, context) => {
  let details;
  try {
    details = loginSchema.check(parse(event.body ?? ""));
  } catch (err) {
    throw "Error parsing form";
  }

  let client = new faunadb.Client({
    secret: faunaSecret,
  });
  let q = faunadb.query;

  let isProd = process.env.NODE_ENV === "production";

  let oatCookie;
  try {
    let o: any = await client.query(
      q.Login(q.Match("users_by_email", details.email), {
        password: details.password,
      })
    );

    oatCookie = cookie.serialize("cyclexOat", o.secret, {
      secure: isProd,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
  } catch (err) {
    console.log(err);

    throw "Incorrect username password combination";
  }

  let emailCookie = cookie.serialize("cyclexEmail", details.email, {
    secure: isProd,
    httpOnly: false,
    sameSite: true,
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
