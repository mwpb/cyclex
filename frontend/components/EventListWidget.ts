import { localDb } from "../state/dexie";
import { email$ } from "../state/state";
import { EventListItem } from "./EventListItem";
import { liveQuery } from "dexie";
import { dateToEpoch } from "../../data/CyclexDate";

export class EventListWidget {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");
    element.className = "accordion";
    element.id = "accordionExample";
    element.style.width = "min(700px, 95vw)";
    // element.style.minWidth = "800px";

    let accordianItem = document.createElement("div");
    accordianItem.className = "accordion-item";

    let accordionHeader = document.createElement("h2");
    accordionHeader.className = "accordion-header";
    accordionHeader.id = "headingOne";

    let accordionButton = document.createElement("button");
    accordionButton.type = "button";
    accordionButton.setAttribute("data-bs-toggle", "collapse");
    accordionButton.setAttribute("data-bs-target", "#collapseOne");
    accordionButton.setAttribute("aria-expanded", "false");
    accordionButton.setAttribute("aria-controls", "collapseOne");
    accordionButton.className = "accordion-button collapsed";
    accordionButton.innerText = "Previous events";

    let accordionCollapse = document.createElement("div");
    accordionCollapse.id = "collapseOne";
    accordionCollapse.className = "accordion-collapse collapse";
    accordionCollapse.setAttribute("aria-labelledby", "headingOne");
    accordionCollapse.setAttribute("data-bs-parent", "#accordionExample");

    let list = document.createElement("ul");
    // element.style.height = "70vh";
    // element.style.overflowY = "scroll";
    // element.style.backgroundColor = "lightgrey"

    // let listDiv = document.createElement("ul");
    list.className = "accordion-body list-group p-3";

    // Structure
    accordionHeader.appendChild(accordionButton);
    accordionCollapse.appendChild(list);
    accordianItem.appendChild(accordionHeader);
    accordianItem.appendChild(accordionCollapse);
    element.appendChild(accordianItem);

    // Subscriptions
    liveQuery(() =>
      localDb.events.where({ email: email$.value }).toArray()
    ).subscribe(async (events) => {
      // console.log(events);
      
      let evs = events.sort(function (a, b) {
        return dateToEpoch(b) - dateToEpoch(a);
      });
      evs = evs.filter((x) => !x.deleted);
      list.innerHTML = "";
      if (evs.length === 0) {
        list.innerText = "No events entered.";
      }
      for (let event of evs) {
        list.appendChild(new EventListItem(event).getElement());
      }
    });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
