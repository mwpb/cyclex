import { ListEventWidget } from "./ListEventWidget";

export class AppHome {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");
    let listEventWidget = new ListEventWidget();

    element.appendChild(listEventWidget.getElement());

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
