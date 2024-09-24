// TypeScript tür bildirimini dışarıda tanımlayın// react-dom/client modülünü genişletin
declare module "react-dom/client" {
  // İçeri aktarmalar bu alanın dışında olmalı
  export function createRoot(container: HTMLElement): {
    render(children: React.ReactNode): void;
    unmount(): void;
  };
}
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
