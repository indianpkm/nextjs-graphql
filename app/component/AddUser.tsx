'use client'

import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'

const ADD_USER_MUTATION = gql`
 mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      name
      email
    }
  }
`

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addUser, {data, loading, error}] = useMutation(ADD_USER_MUTATION)

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    try{
      await addUser({variables: {name, email}})
      setName("")
      setEmail("")
      console.log("User added:", data)
    } catch( err ){
      console.error("Error adding user:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 w-full"
        disabled={loading}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <p className="text-green-500">User added successfully: {data.addUser.name}</p>
      )}
    </form>
  );
};

export default AddUser;