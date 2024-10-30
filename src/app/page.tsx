import { Page } from '@/components/page';
import { fetchUsersData } from '@/hooks/useUsers';

const Home = async () => {
  const initialUsers = await fetchUsersData();
  return (
    <>
      <Page initialUsers={initialUsers} />
    </>
  );
};

export default Home;
