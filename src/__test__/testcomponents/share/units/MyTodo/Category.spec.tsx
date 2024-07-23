import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Category, {
  TTodo,
} from '../../../../../components/units/MyTodo/Category';
import { useState } from 'react';

const sampleItem = {
  cid: 'category1',
  memo: 'Sample memo',
  title: 'Sample title',
  item: [],
};

const MockCategory = () => {
  const [refetch, setRefetch] = useState(false);
  return (
    <Category item={sampleItem} onClick={() => {}} setRefetch={setRefetch} />
  );
};

describe('Category Component', () => {
  it('`+` 버튼을 누르면 인풋이 나타나는지 확인', () => {
    render(<MockCategory />);
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);
    const inputElement = screen.getByPlaceholderText('할일을 적으세요');
    expect(inputElement).toBeInTheDocument();
  });

  it('폼을 제출하면 새로 적은 할 일이 화면에 보이는지 확인', async () => {
    render(<MockCategory />);
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const inputElement = screen.getByPlaceholderText('할일을 적으세요');
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.submit(inputElement);

    const newTaskElement = await screen.findByText('New Task');
    expect(newTaskElement).toBeInTheDocument();
  });
});
