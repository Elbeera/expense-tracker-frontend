import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Expenses from "../pages/Expenses";
import AddExpense from "../components/expenses/AddExpense";
import PrivateRoute from "../middleware/PrivateRoute";

export default function RootRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/expenses"
          element={<PrivateRoute element={<Expenses />} />}
        />

        <Route
          path="/add-expense"
          element={<PrivateRoute element={<AddExpense />} />}
        />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
