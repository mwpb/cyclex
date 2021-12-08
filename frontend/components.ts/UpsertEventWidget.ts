import { EventData } from "../../data/Event";
import { localDb } from "../rxdb/initRxdb";

export class UpsertEventWidget {
  private element: HTMLElement;

  constructor(event: EventData) {
    // Elements
    let element = document.createElement("div");
    element.style.position = "fixed";
    element.style.left = "50%";
    element.style.top = "50%";
    element.style.maxHeight = "95vh";
    element.style.maxWidth = "95vw";
    element.style.width = "300px";
    element.style.height = "400px";

    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = event.date;

    let timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = event.time;

    let descriptionInput = document.createElement("select");
    let lightOption = document.createElement("option");
    lightOption.innerText = "Light";
    lightOption.value = "Light";
    let normalOption = document.createElement("option");
    normalOption.innerText = "Normal";
    normalOption.value = "Normal";
    let heavyOption = document.createElement("option");
    heavyOption.innerText = "Heavy";
    heavyOption.value = "Heavy";

    let feedbackDiv = document.createElement("div");

    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";

    let submitButton = document.createElement("button");
    submitButton.innerText = "Create/update";

    // Structure
    descriptionInput.appendChild(lightOption);
    descriptionInput.appendChild(normalOption);
    descriptionInput.appendChild(heavyOption);
    descriptionInput.value = event.description;

    element.appendChild(dateInput);
    element.appendChild(timeInput);
    element.appendChild(descriptionInput);
    element.appendChild(cancelButton);
    element.appendChild(submitButton);

    // Events
    cancelButton.onclick = () => {
      element.outerHTML = "";
    };

    submitButton.onclick = async () => {
      feedbackDiv.innerText = "";
      if (!localDb) {
        feedbackDiv.innerText = "Could not connect to database.";
        return;
      }

      try {
        await localDb.events.upsert({
          created_at: event.created_at,
          updated_at: Date.now(),
          date: dateInput.value,
          time: timeInput.value,
          description: descriptionInput.value,
        });
      } catch (err) {
        console.log("Error upserting event.");
        console.log(err);
      }

      element.outerHTML = "";
    };

    this.element = element;
  }
  getElement(): HTMLElement {
    return this.element;
  }
}
