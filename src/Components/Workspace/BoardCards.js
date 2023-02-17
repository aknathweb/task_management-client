import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../Context/UserContext";
import ToDoCard from "./ToDoCard/ToDoCard";


const BoardCards = () => {
  const { id } = useParams();
  const {
    user, initialBoardLists,
    reloadWorkspaces,
    currentWorkspace,
    setCurrentWorkspace,
    workspaces,
    logOut, setBoardItems
  } = useContext(AuthContext);
  const setCurrent = (id) => {
    setCurrentWorkspace(workspaces.find((w) => w._id == id));
  };

  useEffect(reloadWorkspaces, [user]);
  const [list, setLists] = useState(initialBoardLists);
  const [board, setBoard] = useState(null);

  const reloadItems = () => {
    if (!currentWorkspace) return;
    fetch(process.env.REACT_APP_SERVER_URL + `/board/get_task_list/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((res) => {
        setBoardItems(res);
        if (res.length > 0) {
          setCurrent(res[0].wid);
        }
      });
  };

  const reloadBoard = () => {
    if (!id) return;
    fetch(process.env.REACT_APP_SERVER_URL + `/board/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((res) => {
        setBoard(res);
      });
  };

  useEffect(reloadItems, [currentWorkspace]);
  useEffect(reloadBoard, []);
  return (
    <div className="my-12 px-12 min-h-screen">
      <div>
        <div className="w-full mb-12">
          <h3>{currentWorkspace?.name}</h3>
          <h2 className="text-2xl font-bold">{board?.name}</h2>
        </div>
        <div>
          <div className="grid md:grid-cols-3 content-center gap-4">
            {list.map((l, i) => (
              <ToDoCard
                key={l.id}
                current_list={l}
                current_board={id}
                reloadItems={reloadItems}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCards;
