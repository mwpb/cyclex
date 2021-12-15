import Dexie from "dexie";
import { EventData } from "../../data/Event";
import { rpc } from "../fetch/rpcUtils";

export class LocalDb extends Dexie {
  events!: Dexie.Table<EventData, number>;

  constructor() {
    super("CyclexDb");

    this.version(1).stores({
      events: `created_at, date, email`,
    });
  }
}

export let localDb = new LocalDb();
