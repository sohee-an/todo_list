import { useState } from 'react';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const DateSelector = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentDayIndex =
    currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

  const [selectedDay, setSelectedDay] = useState<number>(currentDayIndex);

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

  const datesOfWeek = getDatesOfWeek(currentDate);

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 m-6">{`${currentYear}년 ${currentMonth}월 ${currentDay}일`}</h2>
      <div className="flex mb-4">
        {daysOfWeek.map((day, index) => {
          const isToday = datesOfWeek[index] === currentDay;
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
