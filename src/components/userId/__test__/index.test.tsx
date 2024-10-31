import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserId from '..';
import { useUsers } from '@/hooks/useUsers';
import { useHook } from '../hook';

// モジュールのモック設定
jest.mock('@/hooks/useUsers');
jest.mock('../hook');

describe('UserId', () => {
  // 各テストで使用するモック関数とデータの定義
  const mockGetUserDetail = jest.fn(); // getUserDetailのモック関数
  const mockOnSubmit = jest.fn(); // onSubmitのモック関数
  const mockUserDetail = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890'
  };

  // 各テストの前にモック関数とデータを設定
  beforeEach(() => {
    // useUsersの戻り値としてモックのgetUserDetail関数を設定
    (useUsers as jest.Mock).mockReturnValue({
      getUserDetail: mockGetUserDetail
    });

    // useHookの戻り値としてモックのonSubmit関数を設定
    (useHook as jest.Mock).mockReturnValue({
      usePage: () => ({
        onSubmit: mockOnSubmit
      })
    });

    // getUserDetailがmockUserDetailを返すように設定
    mockGetUserDetail.mockReturnValue(mockUserDetail);
  });

  // 各テストの後にモック関数の呼び出し履歴をクリア
  afterEach(() => {
    jest.clearAllMocks();
  });

  // UserIdHeroとUserIdContentが表示されていることを確認するテスト
  test('renders UserIdHero and UserIdContent components', () => {
    // コンポーネントをレンダリングし、propsにuserIdとinitialUsersを渡す
    render(
      <UserId
        userId="1"
        initialUsers={[mockUserDetail]}
      />
    );

    // UserIdHero内の"Back"ボタンが表示されていることを確認
    expect(screen.getByText(/back/i)).toBeInTheDocument();

    // UserIdContent内でユーザーの名前、メール、電話番号が表示されていることを確認
    expect(screen.getByText(mockUserDetail.name)).toBeInTheDocument();
    expect(screen.getByText(mockUserDetail.email)).toBeInTheDocument();
    expect(screen.getByText(mockUserDetail.phone)).toBeInTheDocument();
  });

  // コンポーネントのマウント時にgetUserDetailが正しいuserIdで呼ばれることを確認するテスト
  test('calls getUserDetail with correct userId on mount', () => {
    // コンポーネントをレンダリングし、propsにuserIdとinitialUsersを渡す
    render(
      <UserId
        userId="1"
        initialUsers={[mockUserDetail]}
      />
    );

    // getUserDetailがコンポーネントマウント時に正しいuserIdで呼ばれていることを確認
    expect(mockGetUserDetail).toHaveBeenCalledWith('1');
  });

  // UserIdHeroのボタンがクリックされた際にonSubmitが呼び出されることを確認するテスト
  test('calls onSubmit when UserIdHero button is clicked', () => {
    // コンポーネントをレンダリングし、propsにuserIdとinitialUsersを渡す
    render(
      <UserId
        userId="1"
        initialUsers={[mockUserDetail]}
      />
    );

    // UserIdHero内の"Back"ボタンを取得し、クリックイベントを発火
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);

    // onSubmit関数がクリック時に呼ばれていることを確認
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
