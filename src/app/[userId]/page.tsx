import UserId from '@/components/userId';
import { fetchUsersData } from '@/hooks/useUsers';

const UserIdPage = async (props: { params: Promise<{ userId: string }> }) => {
  const params = await props.params;
  const { userId } = params;
  const initialUsers = await fetchUsersData();
  return (
    <>
      <UserId
        initialUsers={initialUsers}
        userId={userId}
      />
    </>
  );
};

export default UserIdPage;
