/* src/App.js */
import React, { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Amplify } from 'aws-amplify'
import "./App.css";
import BoardList from "./pages/BoardListPage";
import Main from "./pages/MainPage";
import BoardWrite from "./pages/BoardWritePage";
import BoardUpdatePage from "./pages/BoardUpdatePage";
import Search from "./pages/SearchPage";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";




Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = ({ signOut, user }) => {
  const [formState, setFormState] = useState(initialState)
  //const [todos, setTodos] = useState([])

  useEffect(() => {
    //fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  return (

    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark">
        <NavLink className="navbar-brand" to="/">Main.</NavLink>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/board">Search</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/board/write">BoardWrite</NavLink>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Button onClick={signOut} style={styles.button}>Sign out</Button>
          </li>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/board" element={<BoardList />}></Route>
        <Route path="/board/write" element={<BoardWrite />}></Route>
        <Route path="/board/:id" element={<BoardUpdatePage />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);