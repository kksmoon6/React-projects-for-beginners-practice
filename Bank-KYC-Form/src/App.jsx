import Menu from "components/Menu";
import Dashboard from "components/Dashboard";
import HelloWorld from "components/HelloWorld";
import Counter from "components/Counter";
import HookExamples from "components/HookExamples";
import ArrowFunctionExamples from "components/ArrowFunctionExamples";
import "src/index.css";

const App = () =>
  <div className="App">
    <HelloWorld />
    <Counter />
    <ArrowFunctionExamples />
    <HookExamples />
    <Menu />
    <Dashboard />
  </div>;

export default App;
