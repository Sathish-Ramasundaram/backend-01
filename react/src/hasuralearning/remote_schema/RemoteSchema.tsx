
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_DATA = gql`
  query {
    users {
      id
      name
    }

    hello

    getServerTime
  }
`;

function RemoteSchema() {
  const { loading, error, data } = useQuery<any>(GET_DATA);

  if (loading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">Loading unified GraphQL data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-8 w-full max-w-4xl rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-rose-700">Query Failed</h2>
        <p className="mt-2 text-sm text-rose-700">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800">
        Hasura Remote Schema Demo
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        One GraphQL query, two sources: database tables + remote GraphQL service.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-lg font-semibold text-slate-800">From Hasura DB</h3>
          <p className="mt-1 text-xs text-slate-500">Field: users</p>
          <div className="mt-3 space-y-2">
            {data.users.map((user: any) => (
              <div key={user.id} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                <span className="font-semibold">{user.id}</span> - {user.name}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="text-lg font-semibold text-slate-800">From Remote Schema</h3>
          <p className="mt-1 text-xs text-slate-500">Fields: hello, getServerTime</p>
          <p className="mt-3 text-sm text-slate-700">
            <span className="font-semibold">Message:</span> {data.hello}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            <span className="font-semibold">Server Time:</span> {data.getServerTime}
          </p>
        </section>
      </div>

      <hr className="my-6 border-slate-200" />
      <h3 className="text-lg font-semibold text-slate-800">Combined GraphQL Response</h3>
      <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default RemoteSchema;

