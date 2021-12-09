import { predictNext } from "../analysis/predict";

export class PredicationWidget {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");

    let predictionStatement = document.createElement("div");
    predictionStatement.innerText = "None";

    let refreshPrediction = document.createElement("button");
    refreshPrediction.innerText = "Refresh prediction";

    // Structure
    element.appendChild(predictionStatement);
    element.appendChild(refreshPrediction);

    // Events
    refreshPrediction.onclick = async () => {
      let [nextDate, nextTime] = await predictNext();
      predictionStatement.innerText = `Predicted next: ${nextDate} ${nextTime}`;
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
