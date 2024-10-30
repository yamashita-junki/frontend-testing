import { renderHook, act } from '@testing-library/react';
import { useUsers } from '@/hooks/useUsers';

// モックデータを定義
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// fetch APIをモックするためのヘルパー設定
global.fetch = jest.fn();

// beforeEachに共通のconsole.errorモックを追加する
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorを無効化
});

afterEach(() => {
  jest.restoreAllMocks(); // テスト終了後に元に戻す
});

describe('useUsers', () => {
  beforeEach(() => {
    // 各テスト前にモックデータをクリアして干渉を防ぐ
    jest.clearAllMocks();
  });
  // getUsersが呼ばれたときにユーザー一覧を取得して設定する
  it('should fetch and set users when getUsers is called', async () => {
    // fetchが正常にユーザーリストを取得する場合のモック設定
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    // フックをレンダリング
    const { result } = renderHook(() => useUsers());

    // ActでgetUsers呼び出しをシミュレーション
    await act(async () => {
      await result.current.getUsers();
    });

    // usersの状態が正しく設定されているか確認
    expect(result.current.users).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/users'));
  });

  // getUserDetailが呼ばれたときに特定のユーザーの詳細を取得して設定する
  it('should fetch and set user detail when getUserDetail is called', async () => {
    // fetchが正常にユーザー詳細を取得する場合のモック設定
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUserDetail('1');
    });

    // userDetailが指定したIDのユーザーに一致するか確認
    expect(result.current.userDetail).toEqual(mockUsers[0]);
  });

  // ユーザーが見つからない場合にエラーが発生する
  it('should throw an error if user detail is not found', async () => {
    // fetchのモック設定
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUserDetail('999'); // モックデータに存在しないIDを使用
    });

    // userDetailがnullのままであることを確認
    expect(result.current.userDetail).toBeNull();
  });

  // searchUsersが呼ばれたときに名前やメールアドレスでユーザーをフィルタリングする
  it('should filter users by name or email when searchUsers is called', async () => {
    // fetchのモック設定
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.searchUsers('John');
    });

    // 'John'を含むユーザーのみが返されるか確認
    expect(result.current.users).toEqual([mockUsers[0]]);
  });

  // fetchが失敗した場合、空の配列を返し、エラーログが出力される
  it('should return an empty array and log an error if fetch fails', async () => {
    // fetchの失敗をモック
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    // console.error の呼び出しを監視
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsers();
    });

    // usersが空のままであるか確認
    expect(result.current.users).toEqual([]);

    // エラーログが正しく出力されたか確認
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain(
      'Error in fetch operation:'
    );

    // スパイを元に戻す
    consoleErrorSpy.mockRestore();
  });
});
