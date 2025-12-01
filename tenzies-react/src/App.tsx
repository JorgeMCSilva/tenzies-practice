import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="blue-background">
        <div className="app">
          <Header />
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
