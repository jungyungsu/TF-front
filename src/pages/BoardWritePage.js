import React from "react";
import BoardService from "../services/BoardService";
import { useState } from "react";

function BoardWritePage() {
  const initialBoardState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [board, setBoard] = useState(initialBoardState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBoard({ ...board, [name]: value });
  };

  const saveBoard = () => {
    var data = {
      title: board.title,
      description: board.description,
    };

    BoardService.create(data)
      .then((response) => {
        setBoard({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newBoard = () => {
    setBoard(initialBoardState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBoard}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={board.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={board.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveBoard} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
export default BoardWritePage;
