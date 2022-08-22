import React, { useEffect, useState } from "react";
import BoardService from "../services/BoardService";
import { Link } from "react-router-dom";

function Board() {
  const [boardList, setBoardList] = useState();
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveBoard();
  }, []);

  const setActiveBoard = (tutorial, index) => {
    setCurrentBoard(tutorial);
    setCurrentIndex(index);
  };

  const removeAllBoards = () => {
    BoardService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBoard();
    setCurrentBoard(null);
    setCurrentIndex(-1);
  };

  const retrieveBoard = () => {
    BoardService.getAll().then((response) => {
      setBoardList(response.data.data);
    });
  };

  return (
    <div className="list row">
      <h1>Board page</h1>
      <div className="col-md-6">
        {/* <h4>Tutorials List</h4> */}

        <ul className="list-group">
          {boardList &&
            boardList.map((board, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBoard(board, index)}
                key={index}
              >
                {board.title}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllBoards}>
          Remove All
        </button>
      </div>

      <div className="col-md-6">
        {currentBoard ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBoard.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBoard.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBoard.published ? "Published" : "Pending"}
            </div>

            <Link to={"/board/" + currentBoard.id} className="btn btn-warning">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Board;
