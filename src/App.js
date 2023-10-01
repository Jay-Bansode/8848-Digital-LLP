import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import DataList from "./components/DataList";
import Details from "./components/Details";
import UpdateDetails from "./components/UpdateDetails";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dataList" element={<DataList />} />
          <Route path="/details/:name1" element={<Details />} />
          <Route path="/updateDetails/:name1" element={<UpdateDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
