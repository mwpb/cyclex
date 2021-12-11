import moment from "moment";
import { EventData } from "../../data/Event";
import { localDb } from "../state/initRxdb";

export let predictNext = (events: EventData[]): [string, string] => {
  let gaps: number[] = [];
  let format = "YYYY-MM-DDTHH:mm";

  for (let i = 0; i < events.length - 1; i++) {
    let event1 = events[i];
    let event2 = events[i + 1];
    let ts1 = moment(`${event1.date}T${event1.time}`, format).valueOf();
    let ts2 = moment(`${event2.date}T${event2.time}`, format).valueOf();
    gaps.push(ts2 - ts1);
  }

  let sum = gaps.reduce((a, b) => a + b, 0);
  let mean = sum / gaps.length;

  if (mean === 0 || !Number.isFinite(mean)) {
    mean = 1000 * 60 * 60 * 24 * 28;
  }

  let lastEvent = events[events.length - 1];
  let lastTs = moment().valueOf();
  if (lastEvent) {
    lastTs = moment(`${lastEvent.date}T${lastEvent.time}`, format).valueOf();
  }

  let predictedTs = lastTs + mean;
  let predictedMoment = moment(predictedTs);

  console.log(gaps);

  return [
    predictedMoment.format("YYYY-MM-DD"),
    predictedMoment.format("HH:mm"),
  ];
};
