import { AppHome } from "./components/AppHome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UpsertEventModal } from "./components/UpsertEventModal";
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};

let appHome = new AppHome();
export let upsertEventModal = new UpsertEventModal();

document.body.appendChild(appHome.getElement());
document.body.appendChild(upsertEventModal.getElement());
