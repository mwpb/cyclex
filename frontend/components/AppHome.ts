import { EventListWidget } from "./EventListWidget";
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

    let listEventWidget = new EventListWidget();
    let tabBar = new TabBar();

    element.appendChild(listEventWidget.getElement());
    element.appendChild(tabBar.getElement());

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
