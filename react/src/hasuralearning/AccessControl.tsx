

import React, { useState } from "react";

const HASURA_URL = "http://localhost:8080/v1/graphql";

function AccessControl() {

  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("customer");
  const [userId, setUserId] = useState("2");

  const fetchUsers = async () => {

    const headers: any = {
      "Content-Type": "application/json",
      "x-hasura-role": role
    };

    // Add user id only for customer
    if (role === "customer") {
      headers["x-hasura-user-id"] = userId;
    }

    const response = await fetch(HASURA_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: `
          query {
            users {
              id
              name
              email
            }
          }
        `
      })
    });

    const data = await response.json();

    console.log(data);

    setUsers(data.data?.users || []);
  };


  return (
    <div className="mx-auto mt-8 w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold tracking-tight text-slate-800">Hasura Access Control Demo</h2>

      <div className="h-4" />

      <label className="mb-1 block text-sm font-medium text-slate-700">Role:</label>

      <select
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
      </select>

      <div className="h-4" />

      {role === "customer" && (
        <>
          <label className="mb-1 block text-sm font-medium text-slate-700">User Id:</label>

          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <div className="h-4" />
        </>
      )}

      <button
        onClick={fetchUsers}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
      >
        Fetch User Data
      </button>

      <hr className="my-6 border-slate-200" />

      <h3 className="mb-3 text-lg font-semibold text-slate-700">Users</h3>

      {users.map((user) => (
        <div key={user.id} className="mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          <span className="font-semibold">{user.id}</span> - {user.name} - {user.email}
        </div>
      ))}

    </div>
  );
}

export default AccessControl;

