/** @odoo-module */

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
export class Todo extends Component {
  static props = {
    action: Object,
    actionId: Number,
    className: { type: String, optional: true },
  };
  setup() {
    this.state = useState({ tasks: [], newTaskName: "",searchInput: "" });
    this.orm = useService("orm");
    onWillStart(async () => await this.loadTasks());
  }

  loadTasks = async () => {
    const tasks = await this.orm.searchRead(
      "task.todo",
      [],
      ["name", "is_done"],
    );
    this.state.tasks = tasks;
  };
  addTask = async () => {
    if (!this.state.newTaskName) {
      return;
    }
    const newTask = await this.orm.create("task.todo", [
      { name: this.state.newTaskName },
    ]);
    this.state.newTaskName = "";
    await this.loadTasks();
  };
  toggleTask = async (task) => {
    await this.orm.write("task.todo", [task.id], {
      is_done: !task.is_done,
    });
    await this.loadTasks();
  };

  deleteTask = async (task) => {
    const deletedTask = await this.orm.unlink("task.todo", [task.id]);
    await this.loadTasks();
  };
  get filteredTasks() {
        const query = this.state.searchInput.toLowerCase();

        if (!query) {
            return this.state.tasks;
        }

        return this.state.tasks.filter(task =>
            task.name.toLowerCase().includes(query)
        );
    }
}

Todo.template = "to_do_app.Todo";
Todo.components={Layout}

registry.category("actions").add("to_do_app.custom_todo", Todo);
