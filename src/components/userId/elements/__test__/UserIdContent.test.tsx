import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserIdContent from '../UserIdContent';
import commonConstants from '@/constants/common';
import { User } from '@/types/type';

// テスト用のダミーユーザーデータを作成
const mockUserDetail: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890'
};

describe('UserIdContent', () => {
  // ユーザー詳細が正しく表示されるかのテスト
  test('displays user details correctly', () => {
    render(<UserIdContent userDetail={mockUserDetail} />);

    // ユーザーの名前が表示されていることを確認
    expect(screen.getByText(mockUserDetail.name)).toBeInTheDocument();

    // メールアドレスが正しく表示されていることを確認
    expect(screen.getByText(`${commonConstants.EMAIL}:`)).toBeInTheDocument();
    expect(screen.getByText(mockUserDetail.email)).toBeInTheDocument();

    // 電話番号が正しく表示されていることを確認
    expect(screen.getByText(`${commonConstants.PHONE}:`)).toBeInTheDocument();
    expect(screen.getByText(mockUserDetail.phone)).toBeInTheDocument();
  });

  // userDetail が null の場合のテスト
  test('renders empty fields when userDetail is null', () => {
    render(<UserIdContent userDetail={null} />);

    // 名前、メールアドレス、電話番号が空で表示されていることを確認
    expect(screen.queryByText(mockUserDetail.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUserDetail.email)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUserDetail.phone)).not.toBeInTheDocument();
  });

  // 画像が正しくレンダリングされるかのテスト
  test('renders human image correctly', () => {
    render(<UserIdContent userDetail={mockUserDetail} />);

    // 画像が正しい alt テキストで表示されていることを確認
    const image = screen.getByAltText('Human');
    expect(image).toBeInTheDocument();
  });
});
