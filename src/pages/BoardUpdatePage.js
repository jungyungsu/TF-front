import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BoardService from "../services/BoardService";
import { useEffect } from "react";

function BoardUpdatePage(props) {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentBoard, setCurrentBoard] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getBoard = (id) => {
    BoardService.get(id)
      .then((response) => {
        setCurrentBoard(response.data.data);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getBoard(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBoard({ ...currentBoard, [name]: value });
  };

  const updateBoard = () => {
    BoardService.update(currentBoard.id, currentBoard)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentBoard.id,
      title: currentBoard.title,
      description: currentBoard.description,
      published: status,
    };

    BoardService.update(currentBoard.id, data)
      .then((response) => {
        setCurrentBoard({ ...currentBoard, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBoard = () => {
    BoardService.remove(currentBoard.id)
      .then((response) => {
        console.log(response.data);
        navigate("/board");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Edit page</h1>
      <div>
        {currentBoard ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentBoard.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentBoard.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBoard.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentBoard.published ? (
              <button
                className="btn btn-warning"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button className="btn btn-danger mr-2" onClick={deleteBoard}>
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={updateBoard}
            >
              Update
            </button>
            <p>{message}</p>
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
export default BoardUpdatePage;
