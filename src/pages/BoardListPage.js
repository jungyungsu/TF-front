import React, { useEffect, useState } from "react";
import BoardService from "../services/BoardService";
import { Link } from "react-router-dom";

function Board() {
  const [boardList, setBoardList] = useState();
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    retrieveBoard();
  }, []);

  const setActiveBoard = (board, index) => {
    setCurrentBoard(board);
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

  const onChangeSearchTitle = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterData = () => {
    if (searchQuery === "") {
      return boardList;
    }
    return boardList.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="list row">
      <h1>Board page</h1>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            onChange={onChangeSearchTitle}
          />
        </div>
      </div>
      <div className="col-md-6">
        <ul className="list-group">
          {filterData() &&
            filterData().map((board, index) => (
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
            <h4>Board</h4>
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
            <p>Please click on a Board...</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Board;
