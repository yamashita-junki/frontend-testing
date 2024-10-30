// 各画面に依存したhookファイルとなり、画面ごとの結合テストで賄えるため基本的には本ファイルは不要だが、見本として作成

import { renderHook, act } from '@testing-library/react';
import { useUsers } from '@/hooks/useUsers';
import { useHook } from '../hook';

// useUsers フックをモック化して、getUsers 関数の動作を制御
jest.mock('@/hooks/useUsers');
const mockGetUsers = jest.fn();

(useUsers as jest.Mock).mockReturnValue({
  getUsers: mockGetUsers
});

describe('useHook', () => {
  test('initial state of usePage', () => {
    const { result } = renderHook(() => useHook().usePage());

    // 初期状態の確認
    expect(result.current.users).toEqual([]);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.isLoading).toBe(true);
  });

  test('fetchUsers sets isLoading correctly and calls getUsers', async () => {
    const { result } = renderHook(() => useHook().usePage());

    // fetchUsers を呼び出して、getUsers が呼ばれることを確認
    await act(async () => {
      await result.current.fetchUsers();
    });

    // getUsers が呼び出されていることを確認
    expect(mockGetUsers).toHaveBeenCalled();

    // isLoading が false に設定されていることを確認
    expect(result.current.isLoading).toBe(false);
  });

  test('fetchUsers handles errors and sets isLoading to false', async () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // getUsers がエラーをスローするように設定
    mockGetUsers.mockImplementationOnce(() => {
      throw new Error('Failed to fetch users');
    });

    const { result } = renderHook(() => useHook().usePage());

    // fetchUsers を呼び出してエラーハンドリングを確認
    await act(async () => {
      await result.current.fetchUsers();
    });

    // エラー発生後も isLoading が false に設定されていることを確認
    expect(result.current.isLoading).toBe(false);

    consoleErrorMock.mockRestore();
  });
});
