import DateSelector from '../components/MyTodo/DateSelector';
import CategoryButton from '../components/share/CategoryButton';

const TodoList = () => {
  return (
    <div>
      <DateSelector />
      <div className='mt-8 ml-8 mr-8'>
        <CategoryButton name="카테고리1" color="red" />
        <CategoryButton name="카테고리2" color="white" />
      </div>
    </div>
  );
};

export default TodoList;
