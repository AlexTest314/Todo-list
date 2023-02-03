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

        const prevStatusArr = action.payload.status[0];
        const newStatus = action.payload.status[1];
        const prevIndex = action.payload.index[0];
        const newIndex = action.payload.index[1];

        const [transportedTodo] = todoListArr[prevStatusArr].splice(
          prevIndex,
          1
        );
        transportedTodo.status = newStatus;
        transportedTodo.time = new Date().toUTCString();

        const removedTodos = todoListArr[newStatus].splice(newIndex);

        removedTodos
          ? todoListArr[newStatus].splice(
              newIndex,
              0,
              transportedTodo,
              ...removedTodos
            )
          : todoListArr[newStatus].splice(newIndex, 0, transportedTodo);

        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateOrderListTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      const todoListArr = JSON.parse(todoList);
      if (todoList) {
        const prevStatus = action.payload.status[0];
        const newStatus = action.payload.status[1];
        let prevIndex;
        const stepIndex = action.payload.index[1];
        const newIndex = action.payload.index[0] + stepIndex;

        todoListArr[prevStatus].forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            prevIndex = index;
          }
        });

        const [transportedTodo] = todoListArr[prevStatus].splice(prevIndex, 1);
        transportedTodo.status = newStatus;
        transportedTodo.time = new Date().toUTCString();

        const removedTodos = todoListArr[newStatus].splice(newIndex);

        removedTodos
          ? todoListArr[newStatus].splice(
              newIndex,
              0,
              transportedTodo,
              ...removedTodos
            )
          : todoListArr[newStatus].splice(newIndex, 0, transportedTodo);

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
