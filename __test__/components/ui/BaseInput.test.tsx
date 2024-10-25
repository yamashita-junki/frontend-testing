import { render, screen, fireEvent } from '@testing-library/react';
import BaseInput from '@/components/ui/BaseInput';
import '@testing-library/jest-dom';
import { useState } from 'react';

type WrapperProps = {
  placeholder?: string;
  id?: string;
  name?: string;
  type?: string;
  maxLength?: number;
  minLength?: number;
};

// テスト用のラッパーコンポーネント
const WrapperComponent = ({
  placeholder = 'Default placeholder',
  id,
  name,
  type,
  maxLength,
  minLength
}: WrapperProps) => {
  const [value, setValue] = useState('');
  return (
    <BaseInput
      value={value}
      setValue={setValue}
      disabled={false}
      placeholder={placeholder}
      id={id}
      name={name}
      type={type}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
};

describe('BaseInput', () => {
  test('renders input element with placeholder', () => {
    // BaseInput をレンダリングし、指定したプレースホルダーテキストを持つ input 要素が存在するか確認
    render(<WrapperComponent placeholder="Enter your name..." />);
    const inputElement = screen.getByPlaceholderText('Enter your name...');
    expect(inputElement).toBeInTheDocument(); // input 要素がドキュメント内に存在することを確認
  });

  test('displays the correct initial value', () => {
    // BaseInput をレンダリングし、初期値が空であることを確認
    render(<WrapperComponent placeholder="Enter your name..." />);
    const inputElement = screen.getByPlaceholderText(
      'Enter your name...'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(''); // 初期値が空であることを確認
  });

  test('updates value on change event', () => {
    // BaseInput をレンダリングし、値の変更イベントが動作するか確認
    render(<WrapperComponent placeholder="Enter your name..." />);
    const inputElement = screen.getByPlaceholderText(
      'Enter your name...'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test user' } }); // 値を変更する
    expect(inputElement.value).toBe('test user'); // 値が更新されていることを確認
  });

  test('disables the input when disabled prop is true', () => {
    // disabled プロパティが true の場合、入力が無効化されることを確認
    render(
      <BaseInput
        value=""
        setValue={() => {}}
        disabled={true}
        placeholder="Enter your name..."
      />
    );
    const inputElement = screen.getByPlaceholderText('Enter your name...');
    expect(inputElement).toBeDisabled(); // input 要素が無効化されていることを確認
  });

  test('enables the input when disabled prop is false', () => {
    // disabled プロパティが false の場合、入力が有効化されることを確認
    render(
      <BaseInput
        value=""
        setValue={() => {}}
        disabled={false}
        placeholder="Enter your name..."
      />
    );
    const inputElement = screen.getByPlaceholderText('Enter your name...');
    expect(inputElement).not.toBeDisabled(); // input 要素が有効化されていることを確認
  });

  test('applies the correct id and name attributes', () => {
    // id と name プロパティが適切に適用されることを確認
    render(
      <WrapperComponent
        id="test-id"
        name="test-name"
      />
    );
    const inputElement = screen.getByPlaceholderText('Default placeholder'); // プレースホルダーを使用して input 要素を取得
    expect(inputElement).toHaveAttribute('id', 'test-id'); // id が "test-id" であることを確認
    expect(inputElement).toHaveAttribute('name', 'test-name'); // name が "test-name" であることを確認
  });

  test('sets the correct type attribute', () => {
    // type プロパティが適切に設定されることを確認
    render(
      <WrapperComponent
        type="password"
        placeholder="Password input"
      />
    );
    const inputElement = screen.getByPlaceholderText('Password input'); // プレースホルダーを使用して input 要素を取得
    expect(inputElement).toHaveAttribute('type', 'password'); // type が "password" であることを確認
  });

  test('respects maxLength and minLength attributes', () => {
    // maxLength と minLength が適切に設定されることを確認
    render(
      <WrapperComponent
        maxLength={10}
        minLength={5}
      />
    );
    const inputElement = screen.getByPlaceholderText('Default placeholder'); // プレースホルダーを使用して input 要素を取得
    expect(inputElement).toHaveAttribute('maxLength', '10'); // maxLength が 10 であることを確認
    expect(inputElement).toHaveAttribute('minLength', '5'); // minLength が 5 であることを確認
  });
});
