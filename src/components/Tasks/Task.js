import React, { Component } from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./ModalTask";
import "./style.css"
import { axiosInstance } from '../../api/auth.js'


class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      viewCompleted: false,
      activeItemTask: {
        name: "",
        description: "",
        status: "",
        priority: "",
        deadline: "",
        project: "",
        completed: false
      },
      taskList: [],
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    //this.setState({ testList: this.state.activeItem })
    console.log(this.state.activeItem)
    axiosInstance
      .get("api/task/retrieve/", this.state.activeItem)
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };
  renderItems = () => {
    const newItems = this.state.taskList
    return newItems.map(item => (
      <>
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
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
            className='todo-action mr-2'
          >
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-default mr-2"
            >
              {" "}
              Edit{" "}
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Delete{" "}
            </button>
          </span>
        </ul>
      </li>
      <h1>Task</h1>
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
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Task to Project
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
              </div>
        </div>
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
export default Task;
