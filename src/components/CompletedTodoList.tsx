import { Todo, TodoType } from './Todo'

// Define this
interface StateProps {}

export const CompletedTodoList = (props: StateProps) => {

  const {completedTodos, toggleTodoCompletion, removeTodo} = props

  return (
    <section className="completed-list-section">
      <h2 className="title">COMPLETED</h2>
      <ul className="completed-list">
        {completedTodos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            toggleTodoCompletion={toggleTodoCompletion}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </section>
  )
}
