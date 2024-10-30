import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserId from '..';
import { useUsers } from '@/hooks/useUsers';
import { useHook } from '../hook';

// モックの設定
jest.mock('@/hooks/useUsers');
jest.mock('../hook');

describe('UserId', () => {
  const mockGetUserDetail = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // useUsers の戻り値として mock データと関数を設定
    (useUsers as jest.Mock).mockReturnValue({
      userDetail: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      },
      getUserDetail: mockGetUserDetail
    });

    // useHook の戻り値として mock データと関数を設定
    (useHook as jest.Mock).mockReturnValue({
      usePage: () => ({
        userId: '1',
        onSubmit: mockOnSubmit
      })
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders UserIdHero and UserIdContent components', () => {
    render(<UserId />);

    // UserIdHero が表示されていることを確認
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  test('calls getUserDetail on mount', () => {
    render(<UserId />);

    // getUserDetail がコンポーネントマウント時に呼ばれることを確認
    expect(mockGetUserDetail).toHaveBeenCalledWith('1');
  });

  test('calls onSubmit when UserIdHero is clicked', () => {
    render(<UserId />);

    // UserIdHero の onSubmit がクリック時に呼び出されることを確認
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
