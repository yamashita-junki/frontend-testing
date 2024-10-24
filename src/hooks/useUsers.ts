import { User } from "@/types/type";
import { useState } from "react";
import endpoint from "@/constants/endpoint";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userDetail, setUserDetail] = useState<User | null>(null);

  const usersEndpoint = `${endpoint.JSON_PLACE_HOLDER}/users`;

  /**
   * 全てのユーザーを取得する。
   */
  const getUsers = async (): Promise<void> => {
    try {
      const data = await _fetch();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  /**
   * idをもとに特定のユーザーを取得する。
   */
  const getUserDetail = async (id: string): Promise<void> => {
    try {
      const data = await _fetch();
      const targetUser = data.find((user) => user.id === Number(id));

      if (!targetUser) {
        throw new Error("User not found");
      }
      setUserDetail(targetUser);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  /**
   * 名前またはメールアドレスにvalueが含まれるユーザーを取得する。
   * NOTE:jSONPlaceholderは検索機能が存在しないため全て取得してincludesで絞り込む
   */
  const searchUsers = async (value: string): Promise<void> => {
    const data = await _fetch();
    const filteredUsers = data.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  /**
   * jSONPlaceholderを叩く汎用関数
   */
  const _fetch = async (): Promise<User[]> => {
    try {
      const response = await fetch(usersEndpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in fetch operation:", error);
      return [];
    }
  };

  return {
    users,
    userDetail,
    getUsers,
    getUserDetail,
    searchUsers,
  };
};
