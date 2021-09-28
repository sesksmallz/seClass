/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import ReactTooltip from "react-tooltip";
import { DragDropContext } from "react-beautiful-dnd";

import api from "../../network/api";
import { logoutUser } from "../../store/reducers/auth.reducer";
import { getTasks, reorderTask } from "../../store/actions/task.action";
import parseServerErrors from "../../utils/parse-server-errors";
import K from "../../constants";
import "./index.css";
import Column from "../../components/Column";
import TaskModalForm from "../../components/TaskModalForm";

function App() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [, , removeCookies] = useCookies([K.ACCESS_TOKEN]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [selectedItem, setSelectedItems] = useState(true);

  const tasks = useSelector((state) => state.tasks.tasks);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    //check if the location of the draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dispatch(reorderTask(tasks, source.index, destination.index));
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
    },
  };

  useEffect(() => {
    if (!auth.authenticated) {
      history.replace("/");
    }
  }, [auth.authenticated, history]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTasks(setLoading));
    }, 900);
    if (loading) showLoadingScreen();
  }, []);

  function showLoadingScreen() {
    return (
      <div className="page-loading">
        <BeatLoader color="#fff" size={60} />
        <h5>Please wait...</h5>
      </div>
    );
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(logoutUser(removeCookies));
    } catch (error) {
      const msg = parseServerErrors(error);
      toast.error(msg);
    }
  };

  return (
    <div className="main">
      <div className="top-section">
        <Link to="/">
          <div className="logo">
            <h3 className="app-logo-small">Taskly</h3>
          </div>
        </Link>
        <div className="right-nav">
          <p>Welcome,</p>
          <p className="username">{auth.user.username}</p>
          <span className="logout" data-tip="Sign out now" onClick={logout}>
            &rarr;
          </span>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tasks-section">
          {Object.values(K.COLUMNS).map((column) => (
            <Column
              // getItemStyle={getItemStyle}
              key={column}
              title={column}
              items={tasks.filter((item) => item.status === column)}
            />
          ))}
        </div>
      </DragDropContext>
      <div data-tip="Add new task" className="add-task" onClick={openModal}>
        <span> &#43; </span>
      </div>
      <ReactTooltip />
      <TaskModalForm
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
      />
    </div>
  );
}

export default App;
