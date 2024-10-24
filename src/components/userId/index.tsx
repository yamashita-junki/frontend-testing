import UserIdHero from "./elements/UserIdHero";
import { useUsers } from "@/hooks/useUsers";
import { useEffect } from "react";
import { useHook } from "./hook";
import UserIdContent from "./elements/UserIdContent";

export const UserId = () => {
  const { userDetail, getUserDetail } = useUsers();
  const { usePage } = useHook();
  const { userId, onSubmit } = usePage();

  useEffect(() => {
    getUserDetail(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto p-4">
      <UserIdHero onSubmit={onSubmit} />
      <UserIdContent userDetail={userDetail} />
    </div>
  );
};

export default UserId;
