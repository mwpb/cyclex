import { BehaviorSubject } from "rxjs";

export type PageData = "list" | "calendar" | "settings";

export let page$ = new BehaviorSubject<PageData>("list");
