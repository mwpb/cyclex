import { email$ } from "../state/state";
import { syncWithServer } from "../sync";

export class NavBar {
  private element: HTMLElement;

  constructor() {
    let element = document.createElement("nav");
    element.className = "navbar navbar-expand-sm navbar-dark bg-dark";

    let container = document.createElement("div");
    container.className = "container-fluid";

    let brand = document.createElement("a");
    brand.className = "navbar-brand";
    brand.innerText = "Cyclex";
    brand.href = "#";

    // let toggleButton = document.createElement("button");
    // toggleButton.className = "navbar-toggler";
    // toggleButton.type = "button";
    // toggleButton.setAttribute("data-bs-toggle", "collapse");
    // toggleButton.setAttribute("data-bs-target", "#navbarSupportedContent");
    // toggleButton.setAttribute("aria-controls", "navbarSupportedContent");
    // toggleButton.setAttribute("aria-expanded", "false");
    // toggleButton.setAttribute("aria-label", "Toggle navigation");

    // let togglerIcon = document.createElement("span");
    // togglerIcon.className = "navbar-toggler-icon";

    let content = document.createElement("div");
    content.id = "navbarSupportedContent";
    // content.className = "collapse navbar-collapse";

    let list = document.createElement("ul");
    list.className = "navbar-nav me-auto mb-2 mb-lg-0";

    let userDropdownContainer = document.createElement("li");
    userDropdownContainer.className = "nav-item dropdown";

    let userDropdownLink = document.createElement("a");
    userDropdownLink.className = "nav-link dropdown-toggle";
    userDropdownLink.href = "#";
    userDropdownLink.id = "navbarDropdown";
    userDropdownLink.setAttribute("role", "button");
    userDropdownLink.setAttribute("data-bs-toggle", "dropdown");
    userDropdownLink.setAttribute("aria-expanded", "false");
    userDropdownLink.innerText = email$.value;

    let userDropdownMenu = document.createElement("ul");
    userDropdownMenu.className = "dropdown-menu dropdown-menu-end";
    userDropdownMenu.setAttribute("aria-labelledby", "navbarDropdown");

    let syncButton = document.createElement("button");
    syncButton.innerText = "Sync";
    syncButton.className = "dropdown-item";

    let logoutItem = document.createElement("li");
    let logoutLink = document.createElement("a");
    logoutLink.className = "dropdown-item";
    logoutLink.innerText = "Logout";
    logoutLink.href = "/.netlify/functions/logout";

    // Structure
    logoutItem.appendChild(logoutLink);
    userDropdownMenu.appendChild(syncButton);
    userDropdownMenu.appendChild(logoutItem);

    userDropdownContainer.appendChild(userDropdownLink);
    userDropdownContainer.appendChild(userDropdownMenu);

    list.appendChild(userDropdownContainer);

    content.appendChild(list);

    container.appendChild(brand);
    container.appendChild(content);

    element.appendChild(container);

    // Events

    syncButton.onclick = async () => {
      syncButton.innerText = "Syncing...";
      try {
        await syncWithServer(email$.value);
      } catch (err) {
        console.log("Error syncing with server.");
        console.log(err);
      }
      syncButton.innerText = "Sync";
    };

    this.element = element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
