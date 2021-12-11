import { newEvent } from "../../data/Event";
import { upsertEventModal } from "../app";
import { page$, setUpsertEventData } from "../state/state";

export class TabBar {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");
    element.style.display = "flex";
    element.style.justifyContent = "space-evenly";
    element.style.alignItems = "center";
    element.style.height = "10vh";
    element.style.borderTop = "1px solid silver";

    let listButton = document.createElement("a");
    listButton.innerText = "List";
    let calendarButton = document.createElement("a");
    calendarButton.innerText = "Calendar";
    let settingsButton = document.createElement("a");
    settingsButton.innerText = "Settings";
    let newEventButton = document.createElement("a");
    newEventButton.innerText = "New event";

    // Structure
    element.appendChild(listButton);
    element.appendChild(calendarButton);
    element.appendChild(settingsButton);
    element.appendChild(newEventButton);

    // Events
    listButton.onclick = () => page$.next("list");
    calendarButton.onclick = () => page$.next("calendar");
    settingsButton.onclick = () => page$.next("settings");
    newEventButton.onclick = () => {
      setUpsertEventData(newEvent(), true);
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
