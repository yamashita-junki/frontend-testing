import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHero from '../PageHero';
import constants from '@/constants/page';
import { Dispatch, SetStateAction } from 'react';

describe('PageHero', () => {
  test('renders the title, input, and search icon', () => {
    const mockSetValue: Dispatch<SetStateAction<string>> = jest.fn();
    const mockValue = 'Test value';

    render(
      <PageHero
        value={mockValue}
        setValue={mockSetValue}
      />
    );

    // タイトルが正しくレンダリングされているか確認
    expect(screen.getByText(constants.TITLE)).toBeInTheDocument();

    // 入力フィールドが正しい値で表示されているか確認
    const inputElement = screen.getByDisplayValue(mockValue);
    expect(inputElement).toBeInTheDocument();

    // Searchアイコンが表示されているか確認
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });
});
