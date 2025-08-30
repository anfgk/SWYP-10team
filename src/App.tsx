import "./App.css";

import { BrowserRouter } from "react-router-dom";

import useUserLocation from "./hooks/useUserLocation";
import useIssueAccessToken from "./hooks/useIssueAccessToken";

import AppShell from "./components/layout/AppShell";

function App() {
  useUserLocation();
  useIssueAccessToken();

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
