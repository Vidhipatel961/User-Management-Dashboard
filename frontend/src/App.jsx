import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [search, setSearch] = useState("");

  const refreshList = () => setRefreshFlag((prev) => !prev);

  return (
    <div className="d-flex justify-content-center">
      <div
        className="container bg-white p-4 shadow rounded"
        style={{ maxWidth: "900px", width: "800px" }}
      >
        <h2 className="text-center mb-4">User Management Dashboard</h2>

        {!showForm && (
          <div className="d-flex mb-3">
            <input
              className="form-control me-3"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ width: "180px" }}
              onClick={() => {
                setEditingUser(null);
                setShowForm(true);
              }}
            >
              Add User
            </button>
          </div>
        )}

        {showForm ? (
          <UserForm
            selectedUser={editingUser}
            refresh={() => {
              setShowForm(false);
              refreshList();
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <UserList
            onEdit={(u) => {
              setEditingUser(u);
              setShowForm(true);
            }}
            refreshFlag={refreshFlag}
            search={search}
          />
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}
