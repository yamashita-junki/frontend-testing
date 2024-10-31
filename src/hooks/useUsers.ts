import { User } from '@/types/type';
import useSWR from 'swr';

import endpoint from '@/constants/endpoint';

const usersEndpoint = `${endpoint.JSON_PLACE_HOLDER}/users`;

/**
 * APIからデータを取得するfetcher関数
 */
export const fetchUsersData = async (): Promise<User[]> => {
  const response = await fetch(usersEndpoint);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const useUsers = (initialUsers: User[] = []) => {
  // SWRを利用してユーザーデータを取得
  const {
    data: users,
    error,
    isLoading
  } = useSWR<User[]>(usersEndpoint, fetchUsersData, {
    fallbackData: initialUsers
  });

  /**
   * 特定のユーザー詳細を取得
   */
  const getUserDetail = (id: string) => {
    if (!users) return null;
    return users.find((user) => user.id === Number(id)) || null;
  };

  /**
   * 名前またはメールアドレスにvalueが含まれるユーザーを検索
   */
  const searchUsers = (value: string) => {
    if (!users) return [];
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
  };

  return {
    users,
    getUserDetail,
    error,
    searchUsers,
    isLoading
  };
};
