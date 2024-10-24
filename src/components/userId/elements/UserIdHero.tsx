import { ArrowLeftIcon } from "lucide-react";
import constants from "@/constants/page";

type Props = {
  onSubmit: () => void;
};

export const UserIdHero = (props: Props) => {
  return (
    <>
      <div
        className="flex w-36 cursor-pointer hover:scale-105 transition-all"
        onClick={props.onSubmit}
      >
        <ArrowLeftIcon className="h-9 w-9" />
        <p className="text-2xl font-bold py-[3px] ml-2">
          {constants.BACK_TEXT}
        </p>
      </div>
    </>
  );
};

export default UserIdHero;
