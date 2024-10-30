// 各画面に依存したhookファイルとなり、画面ごとの結合テストで賄えるため基本的には本ファイルは不要だが、見本として作成

import { renderHook } from '@testing-library/react';
import { useHook } from '../hook';
import { useNavigate } from '@/hooks/useNavigate';
import { useParams } from 'next/navigation';

// useNavigate フックと useParams をモック化
jest.mock('@/hooks/useNavigate');
jest.mock('next/navigation');

describe('useHook', () => {
  const mockNavigateTo = jest.fn();

  beforeEach(() => {
    // useNavigate の戻り値として mockNavigateTo を設定
    (useNavigate as jest.Mock).mockReturnValue({
      navigateTo: mockNavigateTo
    });

    // useParams の戻り値を設定
    (useParams as jest.Mock).mockReturnValue({ userId: '123' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns correct userId from useParams', () => {
    const { result } = renderHook(() => useHook().usePage());

    // userId が正しく設定されていることを確認
    expect(result.current.userId).toBe('123');
  });

  test('calls navigateTo when onSubmit is invoked', () => {
    const { result } = renderHook(() => useHook().usePage());

    // onSubmit を呼び出し
    result.current.onSubmit();

    // navigateTo が正しい引数で呼び出されていることを確認
    expect(mockNavigateTo).toHaveBeenCalledWith('');
  });
});
