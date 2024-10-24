import PageUserCard from "./PageUserCard";
import { User } from "@/types/type";
import constants from "@/constants/page";
import { useNavigate } from "@/hooks/useNavigate";

type Props = {
  isLoading: boolean;
  users: User[];
};

export const PageContent = (props: Props) => {
  const { navigateTo } = useNavigate();

  return (
    <>
      {props.isLoading ? (
        <p>{constants.LOADING_TEXT}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {props.users.map((user) => (
            <div
              key={user.id}
              className="cursor-pointer"
              onClick={() => navigateTo(String(user.id))}
            >
              <PageUserCard
                name={user.name}
                email={user.email}
                phone={user.phone}
              />
            </div>
          ))}
        </div>
      )}

      {!props.isLoading && props.users.length === 0 && (
        <p>{constants.NO_USERS_TEXT}</p>
      )}
    </>
  );
};

export default PageContent;
