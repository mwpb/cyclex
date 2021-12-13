import { upsertEventModal } from "../app";
import { EventListWidget } from "./EventListWidget";
import { NavBar } from "./NavBar";
import { PredicationWidget } from "./PredictionWidget";
import { TabBar } from "./TabBar";

export class AppHome {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");
    element.className = "d-flex flex-column align-items-center";
    element.style.minHeight = "100vh";
    // element.style.width = "100vw";
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.backgroundColor = "lightgrey";

    
    let listEventWidget = new EventListWidget();
    let predictionWidget = new PredicationWidget();
    // let tabBar = new TabBar();
    // let dummyBottom = document.createElement("div");
    // dummyBottom.style.backgroundColor = "black";
    // dummyBottom.style.height = "10vh";

    
    element.appendChild(predictionWidget.getElement());
    element.appendChild(listEventWidget.getElement());
    
    // element.appendChild(tabBar.getElement());
    // element.appendChild(dummyBottom);

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
