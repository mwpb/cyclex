import { Handler } from "@netlify/functions";
import { parse } from "querystring";
import { registerSchema } from "../data/Forms";
import faunadb from "faunadb";
import { faunaSecret } from "./utils/variables";
const handler: Handler = async (event, context) => {
  let details;
  try {
    details = registerSchema.check(parse(event.body ?? ""));
  } catch (err) {
    throw "Error parsing form";
  }

  if (details.password !== details.password_confirmation) {
    throw "Incorrect password confirmation";
  }

  let client = new faunadb.Client({
    secret: faunaSecret,
  });
  let q = faunadb.query;

  try {
    let o = await client.query(
      q.Create(q.Collection("users"), {
        data: {
          email: details.email,
        },
        credentials: {
          password: details.password,
        },
      })
    );
  } catch (err) {
    throw "User already exists";
  }

  return {
    statusCode: 303,
    headers: {
      Location: "/login",
    },
  };
};
export { handler };
