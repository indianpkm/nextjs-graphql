'use client';

import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      _id
      name
      email
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
    }
  }
`;


const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS_QUERY);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({
        variables: { id },
      });
      alert("User deleted successfully.");
    } catch (err) {
      alert("Error deleting user: " + err?.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">User List</h2>
      <ul className="list-disc pl-5">
        {data.users.map((user: { _id: string; name: string, email: string }) => (
          <li key={user._id} className="mb-2 gap-4">
            {user.name} {user.email} 
            <Link href={`/updateUser/${user._id}`}>Update</Link>
            <button onClick={()=>handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
