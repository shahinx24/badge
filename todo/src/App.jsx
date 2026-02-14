import Todos from "./components/Todo";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
}

export default App;