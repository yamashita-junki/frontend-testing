import commonConstants from '@/constants/common';

type Props = {
  name: string;
  email: string;
  phone: string;
};

export const UserCard = (props: Props) => {
  return (
    <div className=" border-2 p-3 shadow-md rounded-md hover:scale-105 bg-white transition-all">
      <div>{props.name}</div>
      <div>
        <p>
          <span>
            <strong>{commonConstants.EMAIL}:</strong>
          </span>
          <span>{props.email}</span>
        </p>
        <p>
          <span>
            <strong>{commonConstants.PHONE}:</strong>
          </span>
          <span>{props.phone}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
