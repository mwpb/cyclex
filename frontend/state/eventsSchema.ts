import { RxJsonSchema } from "rxdb";
import { EventData } from "../../data/Event";

export let eventsRxJsonSchema: RxJsonSchema<EventData> = {
  title: "events schema",
  version: 0,
  primaryKey: "created_at",
  type: "object",
  properties: {
    created_at: {
      type: "string",
    },
    updated_at: {
      type: "number",
    },
    date: {
      type: "string",
    },
    time: {
      type: "string",
    },
    description: {
      type: "string",
      default: "Normal",
    },
    email: {
      type: "string",
    },
  },
  required: ["created_at", "updated_at", "date", "time", "email"],
  indexes: ["date"],
};
