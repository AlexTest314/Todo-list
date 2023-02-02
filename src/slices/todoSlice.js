import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem(
    "todoList",
    JSON.stringify({
      new: [],
      pending: [],
      done: []
    })
  );
  return {
    new: [],
    pending: [],
    done: []
  };
};

const initialValue = {
  inputValue: "",
  todoList: getInitialTodo()
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr[action.payload.status].push(action.payload);
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr[action.payload.status].forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todoListArr[action.payload.status].splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateOrderTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        const prevStatus = todoListArr[action.payload.prevStatus];
        const newStatus = todoListArr[action.payload.newStatus];
        const prevIndex = action.payload.prevIndex;
        const newIndex = action.payload.newIndex;

        const [deletedTodo] = prevStatus.splice(prevIndex, 1);
        deletedTodo.status = action.payload.newStatus;
        deletedTodo.time = new Date().toUTCString();

        const removedTodos = newStatus.splice(newIndex);

        removedTodos
          ? newStatus.splice(newIndex, 0, deletedTodo, ...removedTodos)
          : newStatus.splice(newIndex, 0, deletedTodo);

        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateOrderListTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        const prevStatus = todoListArr[action.payload.prevStatus];
        const newStatus = todoListArr[action.payload.newStatus];
        const newIndex = action.payload.newIndex;

        const deletedTodo = prevStatus.reduce((res, todo, index) => {
          if (action.payload.id.has(todo.id)) {
            prevStatus.splice(index, 1);
            res = res + todo;
            return res;
          }
          return res;
        }, []);

        console.log("deletedTodo", deletedTodo);
        deletedTodo.forEach((item) => {
          item.status = action.payload.newStatus;
          item.time = new Date().toUTCString();
        });

        console.log("deletedTodo", deletedTodo);

        const removed = newStatus.splice(newIndex);

        console.log("removed", removed);

        removed
          ? newStatus.splice(newIndex, 0, deletedTodo, ...removed)
          : newStatus.splice(newIndex, 0, deletedTodo);

        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr[action.payload.status].forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todoListArr[action.payload.status][index] = {
              ...todo,
              ...action.payload
            };
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },

    editSearchFilter: (state, action) => {
      state.inputValue = action.payload;
    }
  }
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  editSearchFilter,
  updateOrderTodo,
  updateOrderListTodo
} = todoSlice.actions;
export default todoSlice.reducer;
