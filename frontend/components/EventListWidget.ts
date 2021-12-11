import { newEvent } from "../../data/Event";
import { localDb } from "../state/initRxdb";
import { EventListItem } from "./EventListItem";
import { PredicationWidget } from "./PredictionWidget";

export class EventListWidget {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("ul");
    element.style.height = "70vh";
    element.style.overflowY = "scroll";
    element.style.backgroundColor = "lightgrey"

    // let listDiv = document.createElement("ul");
    element.className = "list-group p-3";

    // Structure
    // element.appendChild(listDiv);
    

    // Subscriptions
    localDb.events
      .find()
      .sort("date")
      .$.subscribe((events) => {
        element.innerHTML = "";
        for (let event of events) {
          element.appendChild(new EventListItem(event).getElement());
        }
      });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
