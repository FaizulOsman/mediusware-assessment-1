import React, { useState } from "react";

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState("all");
  const [nameInput, setNameInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name: nameInput, status: statusInput };
    setTasks([...tasks, newTask]);
    setNameInput("");
    setStatusInput("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (show === "all") return true;
    return task.status === show;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.status === "Active" && b.status !== "Active") return -1;
    if (a.status === "Completed" && b.status !== "Completed") return 1;
    return 0;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "Active"}`}
                type="button"
                onClick={() => setShow("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "Active" && "Active"}`}
                type="button"
                onClick={() => setShow("Active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "Completed" && "Active"}`}
                type="button"
                onClick={() => setShow("Completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
