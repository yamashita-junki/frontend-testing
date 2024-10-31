import { renderHook, act } from '@testing-library/react';
import { useHook } from '../hook';

describe('useHook - usePage', () => {
  test('initial state of searchTerm', () => {
    const { result } = renderHook(() => useHook().usePage());

    // 初期状態の確認
    expect(result.current.searchTerm).toBe('');
  });

  test('setSearchTerm updates searchTerm', () => {
    const { result } = renderHook(() => useHook().usePage());

    // setSearchTermで値を変更
    act(() => {
      result.current.setSearchTerm('new search term');
    });

    // 値が更新されたことを確認
    expect(result.current.searchTerm).toBe('new search term');
  });
});
