import { RxCollection } from "rxdb";
import { EventData } from "../../data/Event";

export type DbCollections = {
  events: RxCollection<EventData>;
};
