import "./App.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1 className="heading">Welcome to Password Reset app</h1>

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
