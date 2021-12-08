import { newEvent } from "../../data/Event";
import { localDb } from "../rxdb/initRxdb";
import { UpsertEventWidget } from "./UpsertEventWidget";

export class ListEventWidget {
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
      let upsertEventWidget = new UpsertEventWidget(event);
      document.body.appendChild(upsertEventWidget.getElement());
    };

    // Subscriptions
    localDb.events
      .find()
      .sort("date")
      .$.subscribe((events) => {
        listDiv.innerText = JSON.stringify(events);
      });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
