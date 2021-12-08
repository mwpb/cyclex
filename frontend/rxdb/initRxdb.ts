import { addPouchPlugin, createRxDatabase, getRxStoragePouch } from "rxdb";
import { eventsRxJsonSchema } from "./eventsSchema";
import { DbCollections } from "./rxdbTypes";
import pidb from "pouchdb-adapter-idb";

addPouchPlugin(pidb);

export let localDb = await createRxDatabase<DbCollections>({
  name: "events",
  storage: getRxStoragePouch("idb"),
});

await localDb.addCollections({ events: { schema: eventsRxJsonSchema } });

/**
 * This dummy function makes sure the above is executed.
 */
export let initRxDb = () => {}