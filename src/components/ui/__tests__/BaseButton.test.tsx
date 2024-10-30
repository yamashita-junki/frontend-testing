import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseButton from '@/components/ui/BaseButton';

describe('BaseButton', () => {
  test('renders button with children', () => {
    // ボタンをレンダリングし、子要素が正しく表示されるか確認
    render(<BaseButton>Click Me</BaseButton>);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    expect(buttonElement).toBeInTheDocument(); // ボタンがドキュメント内に存在することを確認
    expect(buttonElement).toHaveTextContent('Click Me'); // ボタンが "Click Me" というテキストを持っていることを確認
  });

  test('applies the correct variant styles', () => {
    // 各 variant のスタイルが適切に適用されることを確認
    const variants = [
      {
        name: 'primary',
        className: 'bg-blue-500 text-white hover:bg-blue-600'
      },
      {
        name: 'secondary',
        className: 'bg-gray-500 text-white hover:bg-gray-600'
      },
      { name: 'danger', className: 'bg-red-500 text-white hover:bg-red-600' },
      {
        name: 'success',
        className: 'bg-green-500 text-white hover:bg-green-600'
      }
    ];

    variants.forEach(({ name, className }) => {
      render(
        <BaseButton
          variant={name as 'primary' | 'secondary' | 'danger' | 'success'}>
          {name}
        </BaseButton>
      );
      const buttonElement = screen.getByRole('button', { name });
      expect(buttonElement).toHaveClass(className); // ボタンに対応するスタイルが適用されていることを確認
    });
  });

  test('disables the button when disabled prop is true', () => {
    // disabled プロパティが true の場合、ボタンが無効化されることを確認
    render(<BaseButton disabled>Disabled</BaseButton>);
    const buttonElement = screen.getByRole('button', { name: 'Disabled' });
    expect(buttonElement).toBeDisabled(); // ボタンが無効化されていることを確認
    expect(buttonElement).toHaveClass('opacity-50 cursor-not-allowed'); // 無効化されたスタイルが適用されていることを確認
  });

  test('enables the button when disabled prop is false', () => {
    // disabled プロパティが false の場合、ボタンが有効であることを確認
    render(<BaseButton disabled={false}>Enabled</BaseButton>);
    const buttonElement = screen.getByRole('button', { name: 'Enabled' });
    expect(buttonElement).not.toBeDisabled(); // ボタンが有効であることを確認
  });

  test('triggers onClick event when clicked', () => {
    // onClick ハンドラが正しく動作するか確認
    const handleClick = jest.fn();
    render(<BaseButton onClick={handleClick}>Click Me</BaseButton>);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(buttonElement); // ボタンをクリックする
    expect(handleClick).toHaveBeenCalled(); // onClick ハンドラが呼ばれたことを確認
  });

  test('applies additional classes passed via className prop', () => {
    // className プロパティが正しく適用されるか確認
    render(<BaseButton className="extra-class">Styled Button</BaseButton>);
    const buttonElement = screen.getByRole('button', { name: 'Styled Button' });
    expect(buttonElement).toHaveClass('extra-class'); // 追加されたクラスが適用されていることを確認
  });

  test('applies correct type attribute', () => {
    // type プロパティが適切に設定されることを確認
    render(<BaseButton type="submit">Submit Button</BaseButton>);
    const submitButton = screen.getByRole('button', { name: 'Submit Button' });
    expect(submitButton).toHaveAttribute('type', 'submit'); // ボタンの type が "submit" であることを確認

    render(<BaseButton type="reset">Reset Button</BaseButton>);
    const resetButton = screen.getByRole('button', { name: 'Reset Button' });
    expect(resetButton).toHaveAttribute('type', 'reset'); // ボタンの type が "reset" であることを確認
  });
});
