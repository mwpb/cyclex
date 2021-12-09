import { EventData } from "../../data/Event";
import { localDb } from "../state/initRxdb";

export class UpsertEventModal {
  private element: HTMLElement;

  constructor(event: EventData) {
    // Elements
    let element = document.createElement("div");
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.position = "fixed";
    element.style.left = "0";
    element.style.top = "0";
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.backgroundColor = "rgba(108,122,137,0.5)";
    element.style.zIndex = "98";

    let column = document.createElement("div");
    column.style.display = "flex";
    column.style.flexDirection = "column";
    column.style.justifyContent = "center";

    let content = document.createElement("div");
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.style.zIndex = "99";

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

    content.appendChild(dateInput);
    content.appendChild(timeInput);
    content.appendChild(descriptionInput);
    content.appendChild(cancelButton);
    content.appendChild(submitButton);

    column.appendChild(content);
    element.appendChild(column);

    // Events
    cancelButton.onclick = (e) => this.destroy(e, cancelButton);
    column.onclick = (e) => this.destroy(e, column);
    element.onclick = (e) => this.destroy(e, element);

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

  destroy(e: Event, ele: HTMLElement): void {
    if (e.target === ele) this.element.outerHTML = "";
  }
}
