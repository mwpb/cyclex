import { newEvent } from "../../data/Event";
import { predictNext } from "../analysis/predict";
import { localDb } from "../state/initRxdb";
import { meanGap$, setUpsertEventData } from "../state/state";

export class PredicationWidget {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");
    // element.className =
    //   "d-flex justify-content-center align-items-center border-top";
    element.className = "card m-3";
    element.style.width = "min(700px, 95vw)";
    // element.style.height = "100px"
    // element.style.width = "95vw";
    // element.style.backgroundColor = "lightgreen";

    let body = document.createElement("div");
    body.className = "card-body";

    let title = document.createElement("h5");
    title.innerText = "Summary";

    // let text = document.createElement("p");
    // text.className = "card-text";
    // text.innerText = "None";

    let dl = document.createElement("dl");
    dl.className = "row";

    let meanTitle = document.createElement("dt");
    meanTitle.innerText = "Average gap:";
    meanTitle.className = "col-sm-3";

    let meanText = document.createElement("dd");
    meanText.innerText = "None";
    meanText.className = "col-sm-9";

    let nextTitle = document.createElement("dt");
    nextTitle.innerText = "Next due:";
    nextTitle.className = "col-sm-3";

    let nextText = document.createElement("dd");
    nextText.innerText = "None";
    nextText.className = "col-sm-9";

    let newEventButton = document.createElement("a");
    newEventButton.className = "btn btn-primary";
    newEventButton.innerText = "Add event";

    // Structure
    dl.appendChild(meanTitle);
    dl.appendChild(meanText);
    dl.appendChild(nextTitle);
    dl.appendChild(nextText);

    // body.appendChild(title);
    body.appendChild(dl);
    body.appendChild(newEventButton);
    element.appendChild(body);

    // Events

    newEventButton.onclick = () => {
      setUpsertEventData(newEvent(), true);
    };

    // Subscriptions

    localDb.events
      .find()
      .sort("date")
      .$.subscribe((events) => {
        let next = predictNext(events);
        nextText.innerText = next.format("dddd, MMMM Do YYYY");
      });

    meanGap$.subscribe((mean) => {
      let days = (mean / 1000 / 60 / 60 / 24).toFixed(1);
      meanText.innerText = `${days} days`;
    });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
