// src/main.ts

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoList {
  private todos: Todo[] = [];

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.todos.push(newTodo);
    this.render();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.render();
  }

  toggleTodoCompleted(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    this.render();
  }

  render(): void {
    const todoList = document.querySelector('#todo-list') as HTMLUListElement;
    todoList.innerHTML = ''; // Clear the existing list
    this.todos.forEach((todo) => {
      const li = document.createElement('li');
      li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`;

      const span = document.createElement('span');
      span.innerText = todo.text; // Set the text using innerText

      const completeButton = document.createElement('button');
      completeButton.className = 'btn btn-success btn-sm complete-btn';
      completeButton.innerText = '✔️'; // Set the text using innerText
      completeButton.addEventListener('click', () => {
        this.toggleTodoCompleted(todo.id);
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm delete-btn';
      deleteButton.innerText = '🗑️'; // Set the text using innerText
      deleteButton.addEventListener('click', () => {
        this.deleteTodo(todo.id);
      });

      li.appendChild(span);
      li.appendChild(completeButton);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  }
}

const todoList = new TodoList();

document.querySelector('#todo-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#todo-input') as HTMLInputElement;
  if (input.value.trim() !== '') {
    todoList.addTodo(input.value.trim());
    input.value = '';
  }
});