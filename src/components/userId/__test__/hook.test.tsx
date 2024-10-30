import { renderHook, act } from '@testing-library/react';
import { useHook } from '../hook';

// navigateToモック関数を設定
const navigateToMock = jest.fn();

// useNavigateのモック設定
jest.mock('@/hooks/useNavigate', () => ({
  useNavigate: () => ({
    navigateTo: navigateToMock
  })
}));

describe('useHook', () => {
  it('should call navigateTo with an empty string on onSubmit', () => {
    // useHookをレンダリング
    const { result } = renderHook(() => useHook());

    // onSubmitを呼び出し
    act(() => {
      result.current.usePage().onSubmit();
    });

    // navigateToが正しく呼び出されたか確認
    expect(navigateToMock).toHaveBeenCalledWith('');
  });
});
