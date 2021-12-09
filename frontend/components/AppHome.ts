import { EventListWidget } from "./EventListWidget";

export class AppHome {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");
    let listEventWidget = new EventListWidget();

    element.appendChild(listEventWidget.getElement());

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
