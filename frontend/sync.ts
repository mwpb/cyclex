import { Array } from "runtypes";
import { eventDataSchema } from "../data/Event";
import { rpc } from "./fetch/rpcUtils";
import { localDb } from "./state/dexie";

export let syncWithServer = async (email: string) => {
  if (!email) return;
  await localDb.events.where("email").notEqual(email).delete();

  await rpc(
    "setEvents",
    await localDb.events.where({ email: email }).toArray()
  );

  let response = await rpc("getEvents");
  if (response.error) {
    console.log(response.error);
    console.log("Error getting events from server.");
    return;
  }
  let receivedEvents = Array(eventDataSchema).check(response.result);
  await localDb.events.bulkPut(receivedEvents);
};
