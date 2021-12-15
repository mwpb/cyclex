import { AppHome } from "./components/AppHome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UpsertEventModal } from "./components/UpsertEventModal";
import Cookies from "js-cookie";
import { NavBar } from "./components/NavBar";
import { rpc } from "./fetch/rpcUtils";
import { email$ } from "./state/state";
import { localDb } from "./state/dexie";
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};

export let e = Cookies.get("cyclexEmail") ?? "";

if (e === "") {
  window.location.replace("/login.html");
  throw "Not logged in... redirecting...";
}

email$.next(e);
let navBar = new NavBar();
let appHome = new AppHome();
export let upsertEventModal = new UpsertEventModal();

document.body.appendChild(navBar.getElement());
document.body.appendChild(appHome.getElement());
document.body.appendChild(upsertEventModal.getElement());
