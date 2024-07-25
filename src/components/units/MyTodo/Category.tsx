import React, { SetStateAction, Dispatch, useState } from 'react';
import CategoryButton from '../../share/CategoryButton';
import Todo from './Todo';
import SidePanel from '../../share/SidePanel';
import useUserId from '../../../hook/useUserId';
import { TCategory, TTodo } from '../../../types/TodoTypes';
import FirebaseActions from '../../../api/Todo';
import { uid } from 'uid';

type Props = {
  item: TCategory;
  onClick: () => void;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

const Category = ({ item, onClick, setRefetch }: Props) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TTodo>();
  const [inputState, setInputState] = useState(false);
  const [value, setValue] = useState('');
  const userId = useUserId();

  const handleRefetch = () => {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setInputState(false);
    setValue('');
    if (!userId) return;

    const newTodo = {
      id: uid(),
      memo: '',
      title: value,
      selected: false,
    };

    try {
      await FirebaseActions.updateTodo(userId, item.cid, newTodo);
      setRefetch((pre) => !pre);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleClick = () => {
    setInputState(true);
  };

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleCheckboxChange = async (checkboxValue: boolean, id: string) => {
    if (!userId) return;

    try {
      const data = await FirebaseActions.getDocument(userId);
      if (data) {
        const categoryIndex = data.todos.findIndex(
          (cat: TCategory) => cat.cid === item.cid
        );

        if (categoryIndex > -1) {
          const updatedTodos = [...data.todos];
          const category = updatedTodos[categoryIndex];
          const todoIndex = category.item.findIndex(
            (todo: TTodo) => todo.id === id
          );

          if (todoIndex > -1) {
            category.item[todoIndex].selected = checkboxValue;

            await FirebaseActions.updateDocument(userId, {
              todos: updatedTodos,
            });
            setRefetch((pre) => !pre);
          }
        }
      }
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleTodoSave = async (
    updateTitle: string,
    updateMemo: string,
    id: string
  ) => {
    if (!userId) return;

    try {
      const data = await FirebaseActions.getDocument(userId);
      if (data) {
        const categoryIndex = data.todos.findIndex(
          (cat: TCategory) => cat.cid === item.cid
        );

        if (categoryIndex > -1) {
          const todoIndex = data.todos[categoryIndex].item.findIndex(
            (todo: TTodo) => todo.id === id
          );

          if (todoIndex > -1) {
            data.todos[categoryIndex].item[todoIndex].title = updateTitle;
            data.todos[categoryIndex].item[todoIndex].memo = updateMemo;

            await FirebaseActions.updateDocument(userId, { todos: data.todos });
            setRefetch((pre) => !pre);
          }
        }
      }
    } catch (error) {
      console.error('Error saving todo: ', error);
    }
  };

  const handlePanelClose = () => {
    setIsPanelVisible(false);
  };

  const handleEdit = (id: string) => {
    const todoToEdit = item.item.find((todo: TTodo) => todo.id === id);
    if (todoToEdit) {
      setSelectedTodo(todoToEdit);
      setIsPanelVisible(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!userId) return;

    try {
      await FirebaseActions.deleteTodo(userId, item.cid, id);
      setRefetch((pre) => !pre);
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  return (
    <div className="mb-6">
      <CategoryButton key={item.cid} name={item.title} onClick={onClick} />
      <button onClick={handleClick}>+</button>
      <div>
        {inputState && (
          <form onSubmit={handleSubmit}>
            <input
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="할일을 적으세요"
              className="mb-4 rounded-lg p-2 "
            />
          </form>
        )}
      </div>
      <div>
        {!!item.item &&
          item.item.map((todo: TTodo) => {
            return (
              <Todo
                key={todo.id}
                item={todo}
                onChange={handleCheckboxChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
      </div>
      {!!selectedTodo && (
        <SidePanel
          formTitle="할일 수정"
          isVisible={isPanelVisible}
          onClose={handlePanelClose}
          item={selectedTodo}
          setSelectedTodo={true}
          onTodoSave={handleTodoSave}
        />
      )}
    </div>
  );
};

export default Category;
