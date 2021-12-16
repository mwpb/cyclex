import { Record, String, Static, Number, Optional, Boolean } from "runtypes";
import { cyclexDateSchema, epochToDate } from "./CyclexDate";

export let eventDataSchema = Record({
  updated_at: Number,
  created_at: Number,
  description: String,
  email: String,
  deleted: Optional(Boolean),
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
