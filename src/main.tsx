import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { worker } from "./mocks/browser"

if (process.env.NODE_ENV === "development" && import.meta.env.MODE == "msw") {
  worker.start()
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
