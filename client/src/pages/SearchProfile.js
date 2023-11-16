import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import UserCard from "../components/UserCard";

const SearchProfile = () => {
  const { userState } = useContext(AuthContext);
  const { search } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const BASE_URL = "http://localhost:3001";
    const headers = {
      Authorization: `Bearer ${userState.token}`,
    };
    axios
      .get(BASE_URL + `/users/search/${search}`, { headers })
      .then((response) => setUsers(response.data))
      .catch((e) => console.error(e));
  }, [search]);

  if (users.length === 0) {
    return (
      <p className="text-gray-500 m-10 font-mono text-2xl">0 results found.</p>
    );
  }
  return (
    <div className="m-10 w-[60%] mx-auto p-10 flex flex-col gap-2">
      <h1 className="font-mono text-2xl mb-3">Search Results</h1>
      {users.map((user) => {
        if (user._id === userState.id) {
          return null;
        }
        return <UserCard data={user} />;
      })}
    </div>
  );
};

export default SearchProfile;
