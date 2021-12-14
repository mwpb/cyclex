import { Record, Number, Static } from "runtypes";

export let cyclexDateSchema = Record({
  year: Number,
  month: Number,
  day: Number,
  hour: Number,
  minute: Number,
});

export type CyclexDate = Static<typeof cyclexDateSchema>;

export let dateToEpoch = (cyclexDate: CyclexDate): number => {
  let date: Date = new Date(
    cyclexDate.year,
    cyclexDate.month,
    cyclexDate.day,
    cyclexDate.hour,
    cyclexDate.minute,
    0,
    0
  );

  return date.getTime();
};

export let epochToDate = (millis: number): CyclexDate => {
  let date: Date = new Date(millis);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

export let formatCyclexDate = (d: CyclexDate): string => {
  return `${d.year}-${d.month}-${d.day} ${d.hour}:${d.minute}`;
};
