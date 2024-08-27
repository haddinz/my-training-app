import { AddContact, Contacts, UpdateContact } from "./page";
import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/Contact/add" element={<AddContact />} />
        <Route path="/contact/update/:id" element={<UpdateContact />} />
      </Routes>
    </Router>
  );
}

export default App;
