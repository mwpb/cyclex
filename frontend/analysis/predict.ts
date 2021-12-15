import { CyclexDate, dateToEpoch, epochToDate } from "../../data/CyclexDate";
import { EventData } from "../../data/Event";
import { meanGap$ } from "../state/state";

export let predictNext = (events: EventData[]): CyclexDate => {
  let gaps: number[] = [];

  for (let i = 0; i < events.length - 1; i++) {
    let event1 = events[i];
    let event2 = events[i + 1];
    let ts1 = dateToEpoch(event1);
    let ts2 = dateToEpoch(event2);
    gaps.push(ts2 - ts1);
  }

  let sum = gaps.reduce((a, b) => a + b, 0);
  let mean = sum / gaps.length;

  if (mean === 0 || !Number.isFinite(mean)) {
    mean = 1000 * 60 * 60 * 24 * 28;
  }

  meanGap$.next(mean);

  let lastEvent = events[events.length - 1];
  let lastTs = Date.now();
  if (lastEvent) {
    lastTs = dateToEpoch(lastEvent);
  }

  console.log(lastTs);
  

  let predictedTs = lastTs + mean;
  
  return epochToDate(predictedTs);
};
