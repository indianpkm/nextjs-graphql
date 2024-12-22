"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { use } from "react"; // Import use() for unwrapping params

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($_id: ID!, $name: String, $email: String) {
    updateUser(_id: $_id, name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;

const UpdateUserForm = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateUser({
      variables: {
        _id:id,
        name,
        email,
      },
    });

    // Clear form fields
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Name"
        className="border p-2 w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update User"}
      </button>

      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && <p className="text-green-500">User updated: {data.updateUser.name}</p>}
    </form>
  );
};

export default UpdateUserForm;
