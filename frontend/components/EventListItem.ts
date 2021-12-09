import { EventData } from "../../data/Event";
import { localDb } from "../rxdb/initRxdb";
import { UpsertEventWidget } from "./UpsertEventWidget";

export class EventListItem {
  private element: HTMLElement;

  constructor(event: EventData) {
    let element = document.createElement("div");
    element.style.display = "flex";
    element.style.justifyContent = "space-between";

    let summary = document.createElement("div");
    summary.innerText = `${event.date} ${event.time} (${event.description})`;

    let buttonsDiv = document.createElement("div");

    let editButton = document.createElement("button");
    editButton.innerText = "Edit event";

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete event";

    // Structure
    element.appendChild(summary);
    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(editButton);
    element.appendChild(buttonsDiv);

    // Events
    editButton.onclick = () => {
      let upsertEvent = new UpsertEventWidget(event);
      document.body.appendChild(upsertEvent.getElement());
    };

    deleteButton.onclick = async () => {
      let confirmed = window.confirm(
        `Are you sure you want to delete the event on ${event.date} ${event.time}?`
      );
      if (confirmed) {
        await localDb.events.findOne(event.created_at).remove();
      }
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
