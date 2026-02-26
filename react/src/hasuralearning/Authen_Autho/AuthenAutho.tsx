import { useState } from "react";

const HASURA_URL = "http://localhost:8080/v1/graphql";

/*
Fake Backend Users (Simulating Database)
*/
const USERS = [
  { id: "1", name: "Admin", email: "admin@gmail.com", role: "admin" },
  { id: "2", name: "Sathish", email: "sa@gmail.com", role: "customer" }
];

type Token = {
  "x-hasura-role": string;
  "x-hasura-user-id": string;
};

function AuthenAutho() {

  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("customer");
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState("");

  /*
  AUTHENTICATION
  Validate User + Role
  */
  const login = () => {

    const user = USERS.find(u => u.id === userId);

    if (!user) {
      setMessage("User not found");
      return;
    }

    // Role validation
    if (user.role !== role) {
      setMessage("Invalid role for this user");
      return;
    }

    const fakeJWT: Token = {
      "x-hasura-role": role,
      "x-hasura-user-id": userId
    };

    localStorage.setItem("token", JSON.stringify(fakeJWT));

    setMessage(`Login successful: ${user.name} (${role})`);
    setData(null);
  };


  /*
  AUTHORIZATION
  */
  const fetchUsers = async () => {

    const token: Token = JSON.parse(
      localStorage.getItem("token") || "{}"
    );

    if (!token["x-hasura-role"]) {
      setMessage("Not authenticated");
      return;
    }

    const query =
      token["x-hasura-role"] === "customer"
        ? `
      query {
        users(where: { id: { _eq: ${token["x-hasura-user-id"]} } }) {
          id
          name
          email
        }
      }
    `
        : `
      query {
        users {
          id
          name
          email
        }
      }
    `;

    const res = await fetch(HASURA_URL, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        "x-hasura-role": token["x-hasura-role"],
        "x-hasura-user-id": token["x-hasura-user-id"]

      },

      body: JSON.stringify({ query })

    });

    const json = await res.json();

    if (json.errors) {
      setMessage(json.errors[0]?.message || "Failed to fetch data");
      setData(null);
      return;
    }

    setData(json.data);
    setMessage("Data fetched successfully");
  };


  const logout = () => {

    localStorage.removeItem("token");

    setMessage("Logged out");

    setData(null);

  };


  const token = JSON.parse(
    localStorage.getItem("token") || "null"
  );


  return (

    <div className="mx-auto mt-8 w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold tracking-tight text-slate-800">Authentication vs Authorization</h2>

      <h3 className="mt-5 text-lg font-semibold text-slate-700">Login</h3>

      <input
        className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="Enter User ID (1 or 2)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <div className="h-4" />

      <select
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <div className="h-4" />

      <button
        onClick={login}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
      >
        Login
      </button>

      <button
        onClick={logout}
        className="ml-3 rounded-md bg-slate-600 px-4 py-2 font-medium text-white transition hover:bg-slate-700 active:bg-slate-800"
      >
        Logout
      </button>


      <hr className="my-6 border-slate-200"/>


      <h3 className="text-lg font-semibold text-slate-700">Authorization</h3>

      <button
        onClick={fetchUsers}
        className="mt-3 rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 active:bg-emerald-800"
      >
        Fetch Data
      </button>


      <hr className="my-6 border-slate-200"/>


      <h3 className="text-lg font-semibold text-slate-700">Session Token</h3>

      <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">
        {JSON.stringify(token, null, 2)}
      </pre>


      <h3 className="mt-5 text-lg font-semibold text-slate-700">Status</h3>

      <p className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{message}</p>


      <h3 className="mt-5 text-lg font-semibold text-slate-700">Data</h3>

      <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>

  );
}

export default AuthenAutho;
