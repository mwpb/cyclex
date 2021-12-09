import { newEvent } from "../../data/Event";
import { localDb } from "../state/initRxdb";
import { EventListItem } from "./EventListItem";
import { PredicationWidget } from "./PredictionWidget";
import { UpsertEventModal } from "./UpsertEventWidget";

export class EventListWidget {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");

    let listDiv = document.createElement("div");
    let predictionWidget = new PredicationWidget();

    // Structure
    element.appendChild(listDiv);
    element.appendChild(predictionWidget.getElement());

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
