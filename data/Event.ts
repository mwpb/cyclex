import { Record, String, Static, Number } from "runtypes";
import moment from "moment";

export let eventDataSchema = Record({
  date: String,
  time: String,
  updated_at: Number,
  created_at: String,
  description: String,
  email: String,
});

export type EventData = Static<typeof eventDataSchema>;

export let newEvent = (email: string): EventData => {
  let now = moment();
  return {
    date: now.format("YYYY-MM-DD"),
    time: now.format("HH:mm"),
    created_at: Date.now().toString(),
    updated_at: Date.now(),
    description: "Normal",
    email: email,
  };
};
