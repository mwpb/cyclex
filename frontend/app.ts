import { AppHome } from "./components/AppHome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UpsertEventModal } from "./components/UpsertEventModal";
import Cookies from "js-cookie";
import { NavBar } from "./components/NavBar";
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};

export let email = Cookies.get("cyclexEmail");
if (!email) {
  window.location.replace("/login.html");
  throw "Not logged in... redirecting...";
}
let navBar = new NavBar();
let appHome = new AppHome();
export let upsertEventModal = new UpsertEventModal();

document.body.appendChild(navBar.getElement());
document.body.appendChild(appHome.getElement());
document.body.appendChild(upsertEventModal.getElement());
