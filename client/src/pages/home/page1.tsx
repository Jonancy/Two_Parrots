import { useGetUsersQuery } from "@/queries/user/user.query";

export default function Page1() {
  const users = useGetUsersQuery();
  console.log(users);

  return (
    <div>
      {users.data ? (
        users.data.map((user) => (
          <p key={user.userId}>
            {user.userId} - {user.name}
          </p>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}
