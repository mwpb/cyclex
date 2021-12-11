import { EventData } from "../../data/Event";
import { upsertEventModal } from "../app";
import { localDb } from "../state/initRxdb";
import { setUpsertEventData } from "../state/state";

export class EventListItem {
  private element: HTMLElement;

  constructor(event: EventData) {
    let element = document.createElement("li");
    element.className =
      "list-group-item d-flex align-items-center p-3 justify-content-between";

    let summary = document.createElement("div");
    summary.innerText = `${event.date} ${event.time} (${event.description})`;

    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "d-flex align-items-center";

    let editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-outline-primary";
    editButton.innerText = "Edit event";

    // let deleteButton = document.createElement("button");
    // deleteButton.className = "btn";
    let deleteButton = document.createElement("i");
    deleteButton.className = "bi-x-square-fill p-3";
    deleteButton.style.color = "maroon";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.fontSize = "1.5em";
    // deleteIcon.fill =
    // deleteButton.style.fontSize = "1rem";
    // let deleteUse = document.createElement("use");
    // deleteUse.setAttribute("xlink:hreg", "bootstrap-icons#shop");

    // deleteButton.type = "button";
    // deleteButton.className = "btn btn-danger";
    // deleteButton.innerText = "Delete event";

    // Structure
    // deleteButton.appendChild(deleteButton);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    element.appendChild(summary);
    element.appendChild(buttonsDiv);

    // Events
    editButton.onclick = () => {
      setUpsertEventData(event, false);
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
