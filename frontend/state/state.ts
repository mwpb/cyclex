import { BehaviorSubject } from "rxjs";
import { EventData, newEvent } from "../../data/Event";

export type PageData = "list" | "calendar" | "settings";

export let page$ = new BehaviorSubject<PageData>("list");

export let meanGap$ = new BehaviorSubject<number>(1000 * 60 * 60 * 24 * 28);

export let upsertEventData$ = new BehaviorSubject<EventData>(newEvent());
export let upsertEventIsNew$ = new BehaviorSubject<boolean>(true);
export let showUpsertEvent$ = new BehaviorSubject<boolean>(false);
export let submitUpsertForm$ = new BehaviorSubject<boolean>(false);

export let setUpsertEventData = (event: EventData, isNewEvent: boolean) => {
  upsertEventData$.next(event);
  upsertEventIsNew$.next(isNewEvent);
  showUpsertEvent$.next(true);
};

// export let refreshPrediction$ = new BehaviorSubject<boolean>(true);
