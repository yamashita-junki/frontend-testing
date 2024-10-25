import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const BaseInput = (props: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search users..."
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        className="mr-2 border-2 rounded-md shadow-md p-2 w-full"
      />
    </>
  );
};

export default BaseInput;
