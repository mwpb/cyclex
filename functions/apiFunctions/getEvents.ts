import { Client, Get, query as q } from "faunadb";
import { Array } from "runtypes";
import { EventData, eventDataSchema } from "../../data/Event";
import { createResult, RpcResponse } from "../../data/RpcData";

export let getEvents = async (
  client: Client,
  email: string
): Promise<RpcResponse> => {
  let map = (await client.query(
    q.Map(
      q.Paginate(q.Match("events_by_email", email)),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  )) as any;

  let events = map.data.map((x: any) => x.data);
  let eventDataArray = Array(eventDataSchema).check(events);

  return createResult(eventDataArray);
};
