import { page$ } from "../state/state";

export class TabBar {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");
    element.style.display = "flex";
    element.style.justifyContent = "space-evenly";
    element.style.height = "10vh";

    let listButton = document.createElement("button");
    listButton.innerText = "List";
    let calendarButton = document.createElement("button");
    calendarButton.innerText = "Calendar";
    let settingsButton = document.createElement("button");
    settingsButton.innerText = "Settings";

    // Structure
    element.appendChild(listButton);
    element.appendChild(calendarButton);
    element.appendChild(settingsButton);

    // Events
    listButton.onclick = () => {
      page$.next("list");
    };
    calendarButton.onclick = () => {
      page$.next("calendar");
    };
    settingsButton.onclick = () => {
      page$.next("settings");
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
