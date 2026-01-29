import { useEffect, useState, useCallback } from "react";
import { getUsers, deleteUser } from "../api/usermanagementService";
import { toast } from "react-toastify";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";

export default function UserList({ onEdit, refreshFlag, search }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getUsers(search);
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.result || [];

      setUsers(data);
    } catch {
      setError("Unable to load users. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(loadUsers, 200);
    return () => clearTimeout(timer);
  }, [loadUsers, refreshFlag]);

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <Spinner size="sm" /> Loading users...
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            )}

            {!loading &&
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
