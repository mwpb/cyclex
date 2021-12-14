import { formatCyclexDate } from "../../data/CyclexDate";
import { EventData } from "../../data/Event";
import { localDb } from "../state/dexie";
import { setUpsertEventData } from "../state/state";

export class EventListItem {
  private element: HTMLElement;

  constructor(event: EventData) {
    let element = document.createElement("li");
    element.className =
      "list-group-item d-flex align-items-center p-3 justify-content-between";

    let summary = document.createElement("div");
    summary.innerText = `${formatCyclexDate(event)} (${event.description})`;

    let leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";

    let editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-primary";
    editButton.innerText = "Edit";

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
    leftDiv.appendChild(deleteButton);
    leftDiv.appendChild(summary);

    element.appendChild(leftDiv);
    element.appendChild(editButton);

    // Events
    editButton.onclick = () => {
      setUpsertEventData(event, false);
    };

    deleteButton.onclick = async () => {
      let confirmed = window.confirm(
        `Are you sure you want to delete the event on ${formatCyclexDate(
          event
        )}?`
      );
      if (confirmed) {
        await localDb.events.delete(event.created_at);
      }
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
