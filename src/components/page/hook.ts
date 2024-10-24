import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types/type";
import { useState } from "react";

export const useHook = () => {
  const { getUsers } = useUsers();

  const usePage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
      try {
        getUsers();
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return {
      users,
      searchTerm,
      isLoading,
      setUsers,
      setSearchTerm,
      setIsLoading,
      fetchUsers,
    };
  };

  return { usePage };
};
