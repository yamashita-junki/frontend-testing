import UserId from '@/components/userId';
import { fetchUsersData } from '@/hooks/useUsers';

const UserIdPage = async ({ params }: { params: { userId: string } }) => {
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
