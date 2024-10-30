import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserIdHero from '../UserIdHero';
import constants from '@/constants/page';

describe('UserIdHero', () => {
  // テキストとアイコンが正しく表示されているかのテスト
  test('renders the back text and icon', () => {
    // ダミーの onSubmit 関数を作成
    const mockOnSubmit = jest.fn();

    render(<UserIdHero onSubmit={mockOnSubmit} />);

    // アイコンが表示されているか確認
    const arrowLeftIcon = screen.getByTestId('arrow-left-icon');
    expect(arrowLeftIcon).toBeInTheDocument();

    // テキストが表示されているか確認
    expect(screen.getByText(constants.BACK_TEXT)).toBeInTheDocument();
  });

  // onSubmit がクリック時に呼び出されるかのテスト
  test('calls onSubmit when clicked', () => {
    // ダミーの onSubmit 関数を作成
    const mockOnSubmit = jest.fn();

    render(<UserIdHero onSubmit={mockOnSubmit} />);

    // クリックイベントを発生させる
    const button = screen.getByText(constants.BACK_TEXT);
    fireEvent.click(button);

    // onSubmit が 1 回呼び出されていることを確認
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
