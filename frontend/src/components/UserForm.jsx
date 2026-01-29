import { useEffect, useState } from "react";
import { createUser, updateUser } from "../api/usermanagementService";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

export default function UserForm({ selectedUser, refresh, onCancel }) {
  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUser(selectedUser || { id: 0, fullName: "", email: "", phone: "" });
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      if (user.id === 0) {
        await createUser(user);
        toast.success("User added successfully");
      } else {
        await updateUser(user.id, user);
        toast.success("User updated successfully");
      }

      refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow">
      <input
        className="form-control mb-2"
        placeholder="Full Name"
        value={user.fullName}
        required
        disabled={submitting}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
      />

      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        value={user.email}
        required
        disabled={submitting}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Phone"
        value={user.phone}
        disabled={submitting}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-success w-50"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner size="sm" /> Saving...
            </>
          ) : user.id === 0 ? (
            "Add User"
          ) : (
            "Update User"
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary w-50"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
