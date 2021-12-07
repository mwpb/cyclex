import { Array, Record, Static, String } from "runtypes";
import { eventSchema } from "../../data/Event";

let clientDataSchema = Record({
  email: String,
  events: Array(eventSchema),
});

type ClientData = Static<typeof clientDataSchema>;

export let data: ClientData | null = null;

export let restoreClientData = () => {
  let json = localStorage.getItem("cyclexData");
  if (json === null) {
    console.log("Local data not found.");
    return;
  }

  try {
    data = clientDataSchema.check(json);
  } catch (e) {
    console.log("Failed to parse local client data.");
    console.log(e);
  }
};
