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
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

export let cyclexDateToDate = (d: CyclexDate): string => {
  let year = String(d.year).padStart(4, "0");
  let month = String(d.month).padStart(2, "0");
  let day = String(d.day).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export let cyclexDateToTime = (d: CyclexDate): string => {
  let hour = String(d.hour).padStart(2, "0");
  let minute = String(d.minute).padStart(2, "0");
  return `${hour}:${minute}`;
};

export let formatCyclexDate = (d: CyclexDate): string => {
  return `${cyclexDateToDate(d)} ${cyclexDateToTime(d)}`;
};
