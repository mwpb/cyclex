import { predictNext } from "../analysis/predict";
import { localDb } from "../state/initRxdb";

export class PredicationWidget {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");
    element.className =
      "d-flex justify-content-center align-items-center border-top";
    element.style.height = "10vh";
    element.style.backgroundColor = "lightgreen";

    let predictionStatement = document.createElement("div");
    predictionStatement.innerText = "None";

    // Structure
    element.appendChild(predictionStatement);

    // Subscriptions

    localDb.events
      .find()
      .sort("date")
      .$.subscribe((events) => {
        let [nextDate, nextTime] = predictNext(events);
        predictionStatement.innerText = `Predicted next: ${nextDate} ${nextTime}`;
      });
    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
