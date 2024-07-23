import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const DateSelector = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentDayIndex =
    currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

  const [selectedDay, setSelectedDay] = useState<number>(currentDayIndex);
  const [startDate, setStartDate] = useState<Date>(currentDate);

  /**
   * 현재 주의 각 날짜를 계산하는 함수
   *  */
  const getDatesOfWeek = (startDate: Date) => {
    const dates = [];
    const dayIndex = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1;
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() - dayIndex + i);
      dates.push(date.getDate());
    }
    return dates;
  };

  const datesOfWeek = getDatesOfWeek(startDate);

  const handlePrevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const handleToday = () => {
    setStartDate(currentDate);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4 m-6">{`${currentYear}년 ${currentMonth}월 ${currentDay}일`}</h2>
        <div className="flex space-x-4 justify-center items-center">
          <button onClick={handleToday} className="bg-gray-200 p-2 rounded-lg">
            오늘
          </button>
          <FaAngleLeft
            onClick={handlePrevWeek}
            className="cursor-pointer"
            data-testid="left-arrow"
          />
          <FaAngleRight
            onClick={handleNextWeek}
            className="cursor-pointer"
            data-testid="right-arrow"
          />
        </div>
      </div>

      <div className="flex mb-4">
        {daysOfWeek.map((day, index) => {
          const isToday =
            startDate.getFullYear() === currentDate.getFullYear() &&
            startDate.getMonth() === currentDate.getMonth() &&
            datesOfWeek[index] === currentDay;
          const isSelected = selectedDay === index;

          return (
            <div
              key={day}
              className="flex-1 text-center font-semibold cursor-pointer"
              onClick={() => setSelectedDay(index)}
            >
              <span
                className={`inline-block px-2 py-1 rounded-full ${
                  isToday
                    ? isSelected
                      ? 'bg-black text-white'
                      : 'bg-gray-400 text-white'
                    : isSelected
                    ? 'bg-black text-white'
                    : ''
                }`}
              >
                {day} ({datesOfWeek[index]})
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DateSelector;
