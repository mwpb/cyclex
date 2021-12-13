import { Client } from "faunadb";
import { EventData } from "../../data/Event";
import { createResult, RpcResponse } from "../../data/RpcData";
import { query as q } from "faunadb";

export let setEvents = async (
  client: Client,
  events: EventData[]
): Promise<RpcResponse> => {
  let successCount = 0;
  let unmodifiedCount = 0;
  for (let event of events) {
    let matcher = q.Match(q.Index("events_by_email_and_created_at"), [
      event.email,
      event.created_at,
    ]);
    let existing;
    try {
      existing = (await client.query(q.Get(matcher))) as any;
    } catch (err) {
      existing = null;
    }

    if (existing && existing.data.updated_at >= event.updated_at) {
      unmodifiedCount++;
      continue;
    }

    try {
      await client.query(
        q.If(
          q.Exists(matcher),
          q.Update(matcher, { data: event }),
          q.Create(q.Collection("eventData"), { data: event })
        )
      );
    } catch (err) {
      console.log(err);
      continue;
    }

    successCount++;
  }

  return createResult({
    message: "Set events",
    successCount: successCount,
    unmodifiedCount: unmodifiedCount,
    attemptCount: events.length,
  });
};
