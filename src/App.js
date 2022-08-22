import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardList from "./pages/BoardListPage";
import Main from "./pages/MainPage";
import BoardWrite from "./pages/BoardWritePage";
import BoardUpdatePage from "./pages/BoardUpdatePage";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/board">
              Board
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/board/write">
              BoardWrite
            </NavLink>
          </li>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/board" element={<BoardList />}></Route>
        <Route path="/board/write" element={<BoardWrite />}></Route>
        <Route path="/board/:id" element={<BoardUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
