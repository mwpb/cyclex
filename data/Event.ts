import { Record, String, Static, Number } from "runtypes";
import { cyclexDateSchema, epochToDate } from "./CyclexDate";

export let eventDataSchema = Record({
  updated_at: Number,
  created_at: Number,
  description: String,
  email: String,
}).And(cyclexDateSchema);

export type EventData = Static<typeof eventDataSchema>;

export let newEvent = (email: string): EventData => {
  return {
    ...epochToDate(Date.now()),
    created_at: Date.now(),
    updated_at: Date.now(),
    description: "Normal",
    email: email,
  };
};
