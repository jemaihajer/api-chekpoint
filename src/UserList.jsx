import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://fakestoreapi.com/users";

const formatName = (name) => {
  if (!name) return "Unknown user";
  const first = name.firstname
    ? name.firstname[0].toUpperCase() + name.firstname.slice(1)
    : "";
  const last = name.lastname
    ? name.lastname[0].toUpperCase() + name.lastname.slice(1)
    : "";
  const trimmed = `${first} ${last}`.trim();
  return trimmed || "Unknown user";
};

const getInitials = (name) => {
  if (!name) return "??";
  const first = name.firstname?.[0] ?? "?";
  const last = name.lastname?.[0] ?? "?";
  return `${first}${last}`.toUpperCase();
};

function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        if (!isMounted) return;
        setListOfUser(response.data);
        setError("");
      } catch (err) {
        if (!isMounted) return;
        setError(
          "Unable to load users right now. Please try again in a moment."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="status-card">Loading users...</div>;
  }

  if (error) {
    return <div className="status-card status-error">{error}</div>;
  }

  return (
    <ul className="user-grid">
      {listOfUser.map((user) => (
        <li className="user-card" key={user.id}>
          <div className="avatar" aria-hidden="true">
            {getInitials(user.name)}
          </div>
          <div>
            <div className="user-card__title">
              <h3>{formatName(user.name)}</h3>
              <span>@{user.username}</span>
            </div>
            <p className="user-card__contact">{user.email}</p>
            <p className="user-card__contact">{user.phone}</p>
            <p className="user-card__address">
              {user.address?.number} {user.address?.street},{" "}
              {user.address?.city}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
