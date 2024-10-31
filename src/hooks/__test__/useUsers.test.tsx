import { renderHook } from '@testing-library/react';
import useSWR from 'swr';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/type';

// モックデータ
const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '098-765-4321' }
];

// SWRのfetcherをモック
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('useUsers hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial users when initialUsers is provided', () => {
    // SWRが初期データを返すように設定
    (useSWR as jest.Mock).mockReturnValue({
      data: mockUsers,
      error: null,
      isLoading: false
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers(mockUsers));

    // 初期データが正しく返されることを確認
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error if fetch fails', async () => {
    // エラーレスポンスをモック
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: new Error('Failed to fetch'),
      isLoading: false
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers());

    // エラーが正しく返されることを確認
    expect(result.current.error).toEqual(new Error('Failed to fetch'));
  });

  it('should find user by ID in getUserDetail', () => {
    // モックデータを返すように設定
    (useSWR as jest.Mock).mockReturnValue({
      data: mockUsers,
      error: null,
      isLoading: false
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers(mockUsers));

    // 特定のユーザーが正しく取得されることを確認
    const userDetail = result.current.getUserDetail('1');
    expect(userDetail).toEqual(mockUsers[0]);
  });

  it('should return null in getUserDetail if user is not found', () => {
    // モックデータを返すように設定
    (useSWR as jest.Mock).mockReturnValue({
      data: mockUsers,
      error: null,
      isLoading: false
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers(mockUsers));

    // 存在しないIDの場合nullが返されることを確認
    const userDetail = result.current.getUserDetail('999');
    expect(userDetail).toBeNull();
  });

  it('should filter users by name or email in searchUsers', () => {
    // モックデータを返すように設定
    (useSWR as jest.Mock).mockReturnValue({
      data: mockUsers,
      error: null,
      isLoading: false
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers(mockUsers));

    // 名前またはメールアドレスに基づいてユーザーがフィルタされることを確認
    const filteredUsers = result.current.searchUsers('Jane');
    expect(filteredUsers).toEqual([mockUsers[1]]);
  });

  it('should return an empty array in searchUsers if no match is found', () => {
    // モックデータを返すように設定
    (useSWR as jest.Mock).mockReturnValue({
      data: mockUsers,
      error: null,
      isLoading: false
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers(mockUsers));

    // 一致するユーザーがいない場合、空の配列が返されることを確認
    const filteredUsers = result.current.searchUsers('No Match');
    expect(filteredUsers).toEqual([]);
  });
});
