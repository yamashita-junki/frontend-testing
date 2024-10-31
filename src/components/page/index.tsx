'use client';

import { useHook } from './hook';
import { useUsers } from '@/hooks/useUsers';
import PageHero from './elements/PageHero';
import PageContent from './elements/PageContent';
import { User } from '@/types/type';

type Props = {
  initialUsers: User[] | undefined;
};

export const Page = (props: Props) => {
  const { isLoading, searchUsers } = useUsers(props.initialUsers);
  const { usePage } = useHook();
  const { searchTerm, setSearchTerm } = usePage();

  return (
    <div className="container mx-auto p-4">
      <PageHero
        value={searchTerm}
        setValue={setSearchTerm}
      />
      <PageContent
        isLoading={isLoading}
        users={searchUsers(searchTerm)}
      />
    </div>
  );
};

export default Page;
