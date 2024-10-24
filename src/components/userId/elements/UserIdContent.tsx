import commonConstants from "@/constants/common";
import { User } from "@/types/type";
import Image from "next/image";
import humanImage from "@/assets/human.png";

type Props = {
  userDetail: User | null;
};

export const UserIdContent = (props: Props) => {
  return (
    <>
      <div className="flex justify-between w-[900px] m-auto text-4xl py-12 bg-sky-300 rounded-3xl p-6 h-[500px] mt-[100px]">
        <div className=" bg-sky-100 rounded-2xl p-6 w-[700px] overflow-auto">
          <div className="h-2/5 flex items-end">
            <div>{props.userDetail?.name ?? ""}</div>
          </div>
          <div className="mt-12 h-3/5">
            <p>
              <span>
                <strong>{commonConstants.EMAIL}:</strong>
              </span>
              <span>{props.userDetail?.email ?? ""}</span>
            </p>
            <p className="mt-6">
              <span>
                <strong>{commonConstants.PHONE}:</strong>
              </span>
              <span>{props.userDetail?.phone ?? ""}</span>
            </p>
          </div>
        </div>
        <Image src={humanImage} alt="Human" className="ml-2" />
      </div>
    </>
  );
};

export default UserIdContent;
