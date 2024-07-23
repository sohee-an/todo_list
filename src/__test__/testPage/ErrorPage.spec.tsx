import { vi } from 'vitest';
import ErrorPage from '../../pages/ErrorPage';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const navigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
});

it('뒤로가기 클릭시 navigate함수가 호출된다', async () => {
  render(<ErrorPage />);
  const backButton = screen.getByText('뒤로');
  //   fireEvent.click(backButton);
  await userEvent.click(backButton);
  expect(navigateFn).toHaveBeenCalledWith(-1); //한번만 호출되는지
});
