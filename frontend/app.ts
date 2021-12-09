import { AppHome } from "./components/AppHome";
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};

let appHome = new AppHome();
document.body.appendChild(appHome.getElement());
