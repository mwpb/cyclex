import { AppHome } from "./components/AppHome";
import { UpsertEventModal } from "./components/UpsertEventModal";
import Cookies from "js-cookie";
import { NavBar } from "./components/NavBar";
import { email$ } from "./state/state";
import { syncWithServer } from "./sync";

export let e = Cookies.get("cyclexEmail") ?? "";
if (e === "") {
  window.location.replace("/login.html");
  throw "Not logged in... redirecting...";
}
email$.next(e);

syncWithServer(e).then().catch(console.log);

let navBar = new NavBar();
let appHome = new AppHome();
export let upsertEventModal = new UpsertEventModal();

document.body.appendChild(navBar.getElement());
document.body.appendChild(appHome.getElement());
document.body.appendChild(upsertEventModal.getElement());
