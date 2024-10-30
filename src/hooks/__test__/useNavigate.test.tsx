import { renderHook } from '@testing-library/react';
import { useNavigate } from '../useNavigate';
import { useRouter } from 'next/navigation';

// useRouter のモックを設定
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('useNavigate', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // useRouter の戻り値として mockPush を設定
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls router.push with the correct URL', () => {
    const { result } = renderHook(() => useNavigate());

    // window.location.origin をモック化
    Object.defineProperty(window, 'location', {
      value: { origin: 'http://localhost' },
      writable: true
    });

    // navigateTo 関数を呼び出し
    result.current.navigateTo('test-path');

    // router.push が正しい URL で呼ばれていることを確認
    expect(mockPush).toHaveBeenCalledWith('http://localhost/test-path');
  });
});
