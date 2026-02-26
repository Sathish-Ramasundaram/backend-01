import React, { useEffect, useState } from 'react';

const API = 'http://localhost:3002';

type User = {
  id: number;
  name: string;
  email: string;
};

function RestAPI() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API}/users`);
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Could not load users. Check backend/CORS.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      setError('');

      const res = await fetch(`${API}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error(`POST failed: ${res.status}`);

      setName('');
      setEmail('');
      await fetchUsers();
    } catch (err) {
      setError('Could not add user.');
      console.error(err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      setError('');

      const res = await fetch(`${API}/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);

      await fetchUsers();
    } catch (err) {
      setError('Could not delete user.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-5 max-w-2xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">REST API Demo</h2>
      <hr className="mb-6 border-gray-300" />

      <h3 className="text-lg font-semibold mb-3 text-gray-700">Add User</h3>
      <div className="flex flex-col gap-3 mb-6">
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-fit"
          onClick={addUser}
        >
          Add User
        </button>
      </div>

      <hr className="mb-6 border-gray-300" />

      <h3 className="text-xl font-semibold mb-4 text-gray-800">Users</h3>
      {loading && <p className="text-gray-500 italic mb-4">Loading...</p>}
      {error && (
        <p className="text-red-500 bg-red-50 p-3 rounded-md mb-4">{error}</p>
      )}

      <div className="flex flex-col gap-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="text-gray-700">
              <span className="font-semibold text-gray-900">#{u.id}</span> -{' '}
              <span className="font-medium">{u.name}</span> -{' '}
              <span className="text-gray-500">{u.email}</span>
            </div>
            <button
              className="bg-red-100 text-red-600 hover:bg-red-200 font-medium py-1 px-3 rounded text-sm transition-colors ml-2"
              onClick={() => deleteUser(u.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestAPI;
