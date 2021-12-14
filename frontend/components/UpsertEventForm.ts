import { EventData } from "../../data/Event";
import { localDb } from "../state/dexie";
import { email$, submitUpsertForm$, upsertEventData$ } from "../state/state";

class UpsertFormInput {
  private element: HTMLElement;

  constructor(
    input: HTMLInputElement | HTMLSelectElement,
    name: string,
    label: string
  ) {
    let element = document.createElement("div");
    element.className = "mb-3";

    let labelElement = document.createElement("label");
    labelElement.htmlFor = label;
    labelElement.className = "form-label";
    labelElement.innerText = name;

    input.className = "form-control";

    element.appendChild(labelElement);
    element.appendChild(input);

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

export class UpsertEventForm {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("div");
    element.className = "modal-body";

    let dateInput = document.createElement("input");
    dateInput.className = "mb-3";
    dateInput.type = "date";

    let timeInput = document.createElement("input");
    timeInput.type = "time";

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

    descriptionInput.appendChild(lightOption);
    descriptionInput.appendChild(normalOption);
    descriptionInput.appendChild(heavyOption);

    element.appendChild(
      new UpsertFormInput(dateInput, "Date", "date").getElement()
    );
    element.appendChild(
      new UpsertFormInput(timeInput, "Time", "time").getElement()
    );
    element.appendChild(
      new UpsertFormInput(
        descriptionInput,
        "Description",
        "description"
      ).getElement()
    );
    element.appendChild(feedbackDiv);

    // Subscriptions
    upsertEventData$.subscribe((event: EventData) => {
      dateInput.value = event.date;
      timeInput.value = event.time;
      descriptionInput.value = event.description;
    });

    submitUpsertForm$.subscribe(async (doSumbit) => {
      if (!doSumbit) return;
      console.log("submitting");

      feedbackDiv.innerText = "";

      await localDb.events.put({
        created_at: upsertEventData$.value.created_at,
        updated_at: Date.now(),
        date: dateInput.value,
        time: timeInput.value,
        description: descriptionInput.value,
        email: email$.value,
      });
    });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
