import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateSelector from '../../../../../components/units/MyTodo/DateSelector';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

describe('DateSelector Component', () => {
  it('오늘 날짜가 잘나오는가 ', () => {
    render(<DateSelector />);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    expect(
      screen.getByText(`${currentYear}년 ${currentMonth}월 ${currentDay}일`)
    ).toBeInTheDocument();
  });

it('changes to the previous week when the left arrow is clicked', () => {
  render(<DateSelector />);
  const leftArrow = screen.getByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // Check that the dates of the week have changed
  const today = new Date();
  today.setDate(today.getDate() - 7);
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const datesOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayIndex + i);
    datesOfWeek.push(date.getDate());
  }

  datesOfWeek.forEach((date) => {
    expect(
      screen.getAllByText(new RegExp(`${date}`, 'i')).length
    ).toBeGreaterThan(0);
  });
});

it('changes to the next week when the right arrow is clicked', () => {
  render(<DateSelector />);
   const rightArrow = screen.getByTestId('right-arrow');
  fireEvent.click(rightArrow);

  
  const today = new Date();
  today.setDate(today.getDate() + 7);
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const datesOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayIndex + i);
    datesOfWeek.push(date.getDate());
  }

  datesOfWeek.forEach((date) => {
    expect(
      screen.getAllByText(new RegExp(`${date}`, 'i')).length
    ).toBeGreaterThan(0);
  });
});

  it('오늘 이라는 버튼을 누르면 오늘 날짜가 화면이 보이는가 ', () => {
    render(<DateSelector />);
    const todayButton = screen.getByRole('button', { name: /오늘/i });
    fireEvent.click(todayButton);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    expect(
      screen.getByText(`${currentYear}년 ${currentMonth}월 ${currentDay}일`)
    ).toBeInTheDocument();
  });
});
