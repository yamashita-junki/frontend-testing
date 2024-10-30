import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import commonConstants from '@/constants/common';
import UserCard from '../PageUserCard';

describe('UserCard', () => {
  // ダミーデータの定義
  const mockProps = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890'
  };

  test('displays name, email, and phone information', () => {
    // UserCard コンポーネントをダミーデータでレンダリング
    render(<UserCard {...mockProps} />);

    // 名前が表示されていることを確認
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    // EMAIL ラベルとメールアドレスが表示されていることを確認
    expect(screen.getByText(`${commonConstants.EMAIL}:`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();

    // PHONE ラベルと電話番号が表示されていることを確認
    expect(screen.getByText(`${commonConstants.PHONE}:`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.phone)).toBeInTheDocument();
  });
});
