import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReadStocks from "./components/ReadStocks";
import CreateStock from "./components/CreateStock";
import UpdateStock from "./components/UpdateStock";
import DeleteStock from "./components/DeleteStock";
import StockProvider from "./context/StockProvider";

function App() {
  return (
    <div className="App">
      <StockProvider>
        <Routes>
          <Route exact path="/" element={<ReadStocks />} />
          <Route exact path="/create" element={<CreateStock />} />
          <Route exact path="/update/:id" element={<UpdateStock />} />
          <Route exact path="/delete/:id" element={<DeleteStock />} />
        </Routes>
      </StockProvider>
    </div>
  );
}

export default App;
