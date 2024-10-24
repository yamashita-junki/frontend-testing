import { useEffect } from "react";
import { useHook } from "./hook";
import { useUsers } from "@/hooks/useUsers";
import PageHero from "./elements/PageHero";
import PageContent from "./elements/PageContent";

export const Page = () => {
  const { users, searchUsers } = useUsers();
  const { usePage } = useHook();
  const { searchTerm, isLoading, fetchUsers, setSearchTerm } = usePage();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchUsers(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <PageHero value={searchTerm} setValue={setSearchTerm} />
      <PageContent isLoading={isLoading} users={users} />
    </div>
  );
};

export default Page;
