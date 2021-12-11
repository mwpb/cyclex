import { Record, String, Static, Number } from "runtypes";
import moment from "moment";

export let eventSchema = Record({
  date: String,
  time: String,
  updated_at: Number,
  created_at: String,
  description: String,
});

export type EventData = Static<typeof eventSchema>;

export let newEvent = (): EventData => {
  let now = moment();
  return {
    date: now.format("YYYY-MM-DD"),
    time: now.format("HH:mm"),
    created_at: Date.now().toString(),
    updated_at: Date.now(),
    description: "Normal",
  };
};
