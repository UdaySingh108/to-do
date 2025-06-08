export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          marginRight: '10px',
        }}
        onClick={() => onToggle(todo._id, todo.completed)}
      >
        {todo.task}
      </span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}
