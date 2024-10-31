import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  type?: string;
  maxLength?: number;
  minLength?: number;
  setValue: Dispatch<SetStateAction<string>>;
};

export const BaseInput = (props: Props) => {
  return (
    <>
      <input
        type={props.type ?? 'text'}
        placeholder={props.type ?? 'input!'}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        value={props.value}
        maxLength={props.maxLength}
        minLength={props.minLength}
        onChange={(e) => props.setValue(e.target.value)}
        className="mr-2 border-2 rounded-md shadow-md p-2 w-full"
      />
    </>
  );
};

export default BaseInput;
