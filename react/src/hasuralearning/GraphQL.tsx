import React, { useEffect, useState } from "react";

const GRAPHQL_URL = "http://localhost:8080/v1/graphql";

function GraphQL() {

  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /*
  GRAPHQL QUERY
  (Equivalent to GET /users)
  */
  const fetchUsers = async () => {

    const res = await fetch(GRAPHQL_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-hasura-role": "admin"
      },

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

    const data = await res.json();

    setUsers(data.data.users);

  };


  /*
  GRAPHQL MUTATION
  (Equivalent to POST /users)
  */
  const addUser = async () => {

    await fetch(GRAPHQL_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-hasura-role": "admin"
      },

      body: JSON.stringify({

        query: `
          mutation {

            insert_users(objects:{

              name:"${name}",
              email:"${email}"

            }){

              affected_rows

            }

          }
        `
      })

    });

    fetchUsers();

  };


  /*
  GRAPHQL MUTATION
  (Equivalent to DELETE /users/1)
  */
  const deleteUser = async (id:number) => {

    await fetch(GRAPHQL_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-hasura-role": "admin"
      },

      body: JSON.stringify({

        query: `
          mutation {

            delete_users(
              where:{
                id:{_eq:${id}}
              }
            ){

              affected_rows

            }

          }
        `
      })

    });

    fetchUsers();

  };


  useEffect(()=>{

    fetchUsers();

  },[]);



  return (

    <div className="mx-auto mt-8 w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold tracking-tight text-slate-800">GraphQL Demo</h2>

      <hr className="my-4 border-slate-200"/>

      <h3 className="mb-3 text-lg font-semibold text-slate-700">Add User</h3>

      <input
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <div className="h-4" />

      <input
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <div className="h-4" />

      <button
        onClick={addUser}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
      >
        Add User
      </button>


      <hr className="my-6 border-slate-200"/>

      <h3 className="mb-3 text-lg font-semibold text-slate-700">Users</h3>

      {users.map((u)=>(
        <div key={u.id} className="mb-2 flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2">

          <span className="text-sm text-slate-700">
            <span className="font-semibold">{u.id}</span> - {u.name} - {u.email}
          </span>

          <button
            onClick={()=>deleteUser(u.id)}
            className="ml-3 rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700 active:bg-rose-800"
          >
            Delete
          </button>

        </div>
      ))}

    </div>

  );
}

export default GraphQL;
