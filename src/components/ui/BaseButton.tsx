import { MouseEventHandler } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  children: React.ReactNode;
  className?: string; // 追加のクラスを指定可能
  id?: string;
  name?: string;
};

export const BaseButton = (props: Props) => {
  // Tailwind クラスの設定
  const baseStyle = 'px-4 py-2 rounded font-semibold focus:outline-none';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600'
  };

  const disabledStyle = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      className={`${baseStyle} ${variantStyles[props.variant ?? 'primary']} ${props.disabled ? disabledStyle : ''} ${props.className ?? ''}`}>
      {props.children}
    </button>
  );
};

export default BaseButton;
