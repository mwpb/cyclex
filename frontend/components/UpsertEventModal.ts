import * as b from "bootstrap";
import {
  showUpsertEvent$,
  submitUpsertForm$,
  upsertEventIsNew$,
} from "../state/state";
import { UpsertEventForm } from "./UpsertEventForm";

export class UpsertEventModal {
  private element: HTMLElement;

  constructor() {
    // Elements
    let element = document.createElement("div");
    element.id = "upsertModal";
    element.className = "modal";
    element.tabIndex = -1;
    element.setAttribute("aria-labelledby", "modalLabel");
    element.setAttribute("aria-hidden", "true");

    let dialog = document.createElement("div");
    dialog.className = "modal-dialog";

    let content = document.createElement("div");
    content.className = "modal-content";

    let header = document.createElement("div");
    header.className = "modal-header";

    let heading = document.createElement("h5");
    heading.innerText = "Modal title";
    heading.className = "modal-title";
    heading.id = "modalLabel";

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    let body = new UpsertEventForm();

    let footer = document.createElement("div");
    footer.className = "modal-footer";

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.innerText = "Create/update";

    footer.appendChild(submitButton);
    // Structure
    header.appendChild(heading);
    header.appendChild(closeButton);

    content.appendChild(header);

    content.appendChild(body.getElement());
    content.appendChild(footer);
    dialog.appendChild(content);
    element.appendChild(dialog);

    // Events
    let modal = new b.Modal(element);
    submitButton.onclick = async () => {
      submitUpsertForm$.next(true);
      modal.hide();
    };

    // Subscriptions
    upsertEventIsNew$.subscribe((isNewEvent) => {
      heading.innerText = isNewEvent ? "New event" : "Edit event";
    });

    showUpsertEvent$.subscribe((showUpsertModal) => {
      if (showUpsertModal) modal.show();
    });

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
