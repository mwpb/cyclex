import { upsertEventModal } from "../app";
import { EventListWidget } from "./EventListWidget";
import { PredicationWidget } from "./PredictionWidget";
import { TabBar } from "./TabBar";

export class AppHome {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");
    element.style.height = "100vh";
    element.style.width = "100vw";
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.justifyContent = "space-between";
    // element.style.backgroundColor = "lightgrey";

    let listEventWidget = new EventListWidget();
    let predictionWidget = new PredicationWidget();
    let tabBar = new TabBar();

    element.appendChild(listEventWidget.getElement());
    element.appendChild(predictionWidget.getElement());
    element.appendChild(tabBar.getElement());

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
