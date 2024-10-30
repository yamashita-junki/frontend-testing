import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageContent from '../PageContent';
import constants from '@/constants/page';
import { User } from '@/types/type';
import { useNavigate } from '@/hooks/useNavigate';

// useNavigate フックをモック化して、実際のナビゲーション機能をテスト中に防ぐ
jest.mock('@/hooks/useNavigate');

describe('PageContent', () => {
  // モック関数 mockNavigateTo を作成して、navigateTo 関数の挙動をテストで制御できるようにする
  const mockNavigateTo = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue({ navigateTo: mockNavigateTo });

  // テスト用のダミーユーザーデータを定義
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '098-765-4321'
    }
  ];

  // isLoading が true の場合、ローディングメッセージが表示されることを確認
  test('displays loading text when isLoading is true', () => {
    // PageContent を isLoading=true, users=[] としてレンダリング
    render(
      <PageContent
        isLoading={true}
        users={[]}
      />
    );
    // ローディングメッセージがドキュメントに表示されていることを確認
    expect(screen.getByText(constants.LOADING_TEXT)).toBeInTheDocument();
  });

  // isLoading が false で users が提供されている場合、ユーザーカードが表示されることを確認
  test('displays user cards when isLoading is false and users are provided', () => {
    // PageContent を isLoading=false, mockUsers をユーザーデータとしてレンダリング
    render(
      <PageContent
        isLoading={false}
        users={mockUsers}
      />
    );

    // 各ユーザーの name, email, phone が表示されているか確認
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.phone)).toBeInTheDocument();
    });
  });

  // ユーザーカードをクリックすると navigateTo 関数が呼び出されることを確認
  test('calls navigateTo function when a user card is clicked', () => {
    // PageContent を isLoading=false, mockUsers をユーザーデータとしてレンダリング
    render(
      <PageContent
        isLoading={false}
        users={mockUsers}
      />
    );

    // 1番目のユーザーのカード（名前表示）を取得し、クリックイベントを発生させる
    const userCard = screen.getByText(mockUsers[0].name);
    fireEvent.click(userCard);

    // navigateTo 関数がクリックされたユーザーの ID を引数として呼び出されたことを確認
    expect(mockNavigateTo).toHaveBeenCalledWith(String(mockUsers[0].id));
  });

  // isLoading が false かつ users が空配列の場合、「ユーザーなし」のメッセージが表示されることを確認
  test('displays no users text when isLoading is false and users is an empty array', () => {
    // PageContent を isLoading=false, 空の users 配列でレンダリング
    render(
      <PageContent
        isLoading={false}
        users={[]}
      />
    );
    // 「ユーザーなし」のメッセージがドキュメントに表示されていることを確認
    expect(screen.getByText(constants.NO_USERS_TEXT)).toBeInTheDocument();
  });
});
