import { newEvent } from "../../data/Event";
import { page$ } from "../state/state";
import { UpsertEventModal } from "./UpsertEventWidget";

export class TabBar {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");
    element.style.display = "flex";
    element.style.justifyContent = "space-evenly";
    element.style.height = "10vh";

    let listButton = document.createElement("button");
    listButton.innerText = "List";
    let calendarButton = document.createElement("button");
    calendarButton.innerText = "Calendar";
    let settingsButton = document.createElement("button");
    settingsButton.innerText = "Settings";
    let newEventButton = document.createElement("button");
    newEventButton.innerText = "New event";

    // Structure
    element.appendChild(listButton);
    element.appendChild(calendarButton);
    element.appendChild(settingsButton);
    element.appendChild(newEventButton);

    // Events
    listButton.onclick = () => {
      page$.next("list");
    };
    calendarButton.onclick = () => {
      page$.next("calendar");
    };
    settingsButton.onclick = () => {
      page$.next("settings");
    };

    newEventButton.onclick = () => {
      let event = newEvent("test_username", "test_uuid");
      let upsertEventWidget = new UpsertEventModal(event);
      document.body.appendChild(upsertEventWidget.getElement());
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
