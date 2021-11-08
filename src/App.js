import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import MakeTransfer from "./Components/MakeTransfer/MakeTransfer";
import NoAccess from "./CommonComponents/NoAccess/NoAccess";

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/dashboard" exact element={<Dashboard />}></Route>
          <Route path="/make-transfer" exact element={<MakeTransfer />}></Route>
          <Route path="/no-access" exact element={<NoAccess />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
