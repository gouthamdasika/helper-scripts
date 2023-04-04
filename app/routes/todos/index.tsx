import { useState, useEffect } from 'react';

function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
  const [state, setState] = useState<ValueType>(() => {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    if (
      (item.startsWith('{') && item.endsWith('}')) ||
      (item.startsWith('[') && item.endsWith(']'))
    ) {
      return JSON.parse(item);
    }

    return item;
  });

  useEffect(() => {
    if (state && typeof state === 'object') {
      localStorage.setItem(key, JSON.stringify(state));
    }
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export default function Todos() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return todos.map((todo) => (
    <div>
      <input type="checkbox" value={todo.completed} />
      <label>{todo.name}</label>
    </div>
  ));
}
