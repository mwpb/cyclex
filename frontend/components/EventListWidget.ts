import { newEvent } from "../../data/Event";
import { localDb } from "../state/initRxdb";
import { EventListItem } from "./EventListItem";
import { UpsertEventModal } from "./UpsertEventWidget";

export class EventListWidget {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");

    let listDiv = document.createElement("div");

    let newEventButton = document.createElement("button");
    newEventButton.innerText = "New event";

    // Structure
    element.appendChild(listDiv);
    element.appendChild(newEventButton);

    // Events
    newEventButton.onclick = () => {
      let event = newEvent("test_username", "test_uuid");
      let upsertEventWidget = new UpsertEventModal(event);
      document.body.appendChild(upsertEventWidget.getElement());
    };

    // Subscriptions
    localDb.events
      .find()
      .sort("date")
      .$.subscribe((events) => {
        listDiv.innerHTML = "";
        for (let event of events) {
          listDiv.appendChild(new EventListItem(event).getElement());
        }
      });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
