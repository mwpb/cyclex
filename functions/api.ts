import { Handler } from "@netlify/functions";
import { Client } from "faunadb";
import { Array } from "runtypes";
import { eventDataSchema } from "../data/Event";
import {
  apiRepsonse,
  createError,
  rpcRequestSchema,
  RpcResponse,
  serverError,
} from "../data/RpcData";
import { getEvents } from "./apiFunctions/getEvents";
import { setEvents } from "./apiFunctions/setEvents";
import { authenticate } from "./utils/authenticate";
import { faunaSecret } from "./utils/variables";

const handler: Handler = async (event, context) => {
  let client = new Client({
    secret: faunaSecret,
  });

  let email = await authenticate(client, event);
  if (!email) return apiRepsonse(serverError("Invalid credentials"));

  let rpcRequest;
  try {
    rpcRequest = rpcRequestSchema.check(JSON.parse(event.body ?? "null"));
  } catch (err) {
    console.log(err);
    return apiRepsonse(createError(-32600, "Invalid Request"));
  }

  let rpcResponse: RpcResponse;
  if (rpcRequest.method === "setEvents") {
    try {
      let events = Array(eventDataSchema).check(rpcRequest.params);
      rpcResponse = await setEvents(client, email, events);
    } catch (err) {
      console.log(err);
      return apiRepsonse(createError(-32602, "Invalid params"));
    }
  } else if (rpcRequest.method === "getEvents") {
    rpcResponse = await getEvents(client, email);
  } else {
    return apiRepsonse(createError(-32601, "Method not found"));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(rpcResponse),
  };
};
export { handler };
