'use client';

import UserIdHero from './elements/UserIdHero';
import { useUsers } from '@/hooks/useUsers';
import { useHook } from './hook';
import UserIdContent from './elements/UserIdContent';
import { User } from '@/types/type';

type Props = {
  userId: string;
  initialUsers: User[] | undefined;
};

export const UserId = (props: Props) => {
  const { getUserDetail } = useUsers(props.initialUsers);
  const { usePage } = useHook();
  const { onSubmit } = usePage();

  return (
    <div className="container mx-auto p-4">
      <UserIdHero onSubmit={onSubmit} />
      <UserIdContent userDetail={getUserDetail(props.userId)} />
    </div>
  );
};

export default UserId;
