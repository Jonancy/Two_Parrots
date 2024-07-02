import { useParams, useSearchParams } from "react-router-dom";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const { userId } = useParams();

  const user = searchParams.get("user");

  //Will open this

  console.log(user);

  console.log(userId);

  return <p>{user}</p>;
}
