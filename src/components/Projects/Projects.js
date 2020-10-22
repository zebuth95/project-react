import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./ModalProject";
import "./style.css"
import { axiosInstance } from '../../api/auth.js'
import Task from '../Tasks/Task'

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        id: "",
        name: "",
        description: "",
      },
      projectList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axiosInstance
      .get("api/project/retrive/")
      .then(res => this.setState({ projectList: res.data }))
      .catch(err => console.log(err));
  };
  renderItems = () => {
    const newItems = this.state.projectList
    return newItems.map(item => (
      <>
      <div className="list-group-item d-flex justify-content-between align-items-center">
        <ul
          className='row-1'
        >
          <span
            className="todo-title mr-2"
            title={item.description}
          >
            <h4>{item.name}</h4>
          </span>
        </ul>
        <ul
          className='row-2'
        >
        <span
            className="todo-title mr-2"
          >
          <button
              onClick={() => this.toTask(item)}
              className="btn btn-default mr-2"
            >
              {" "}
              Go to task{" "}
            </button>
          </span>

          <span
            className='todo-action mr-2'
          >
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-default mr-2"
            >
              {" "}
              Edit Project{" "}
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Delete Project{" "}
            </button>
          </span>
        </ul>
    </div>
      </>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
        axiosInstance
        .put(`api/project/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axiosInstance
      .post("api/project/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axiosInstance
      .delete(`api/project/${item.id}/`)
      .then(res => this.refreshList());
  };
  toTask = item => {
    axiosInstance.get(`api/project/${item.id}/`)
    .then(res => this.setState({ activeItem: res.data }))
    .catch(err => console.log(err));
    this.setState({ task: !this.state.task });
  };
  createItem = () => {
    const item = { name: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white">Todo List</h1>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Create Project
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
              </div>
          </div>
        </div>
        {this.state.task ? (
          <Task
            activeItem={this.state.activeItem}
          />
        ) : null}

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default Projects;
