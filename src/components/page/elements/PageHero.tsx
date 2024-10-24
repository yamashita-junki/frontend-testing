import { Search } from "lucide-react";
import BaseInput from "@/components/ui/BaseInput";
import { Dispatch, SetStateAction } from "react";
import constants from "@/constants/page";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const PageHero = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{constants.TITLE}</h1>
      <div className="mb-4 flex items-center">
        <p className="w-[300px]">
          <BaseInput value={props.value} setValue={props.setValue} />
        </p>
        <Search className="h-6 w-6 ml-3" />
      </div>
    </>
  );
};

export default PageHero;
