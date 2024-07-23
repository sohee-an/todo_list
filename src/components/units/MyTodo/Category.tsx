import React, { SetStateAction, Dispatch, useState } from 'react';
import CategoryButton from '../../share/CategoryButton';
import Todo from './Todo';
import { db } from '../../../config/firebase';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { uid } from 'uid';
import SidePanel from '../../share/SidePanel';

type NewType = {
  item: {
    cid: string;
    memo: string;
    title: string;
    item: TTodo[] | [];
  };
  onClick: () => void;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

type Props = NewType;

export type TTodo = {
  id: string;
  memo: string;
  title: string;
  selected: boolean;
};

const Category = ({ item, onClick, setRefetch }: Props) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [inputState, setInputState] = useState(false);

  const [value, setValue] = useState('');
  const handleRefetch = () => {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setInputState(false);
    setValue('');
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }

    const newTodo = {
      id: uid(),
      memo: '',
      title: value,
      selected: false,
    };

    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const categoryIndex = data.todos.findIndex(
          (cat: any) => cat.cid === item.cid
        );

        if (categoryIndex > -1) {
          const updatedTodos = [...data.todos];
          const category = updatedTodos[categoryIndex];
          if (!category.item) {
            category.item = [];
          }
          category.item.push(newTodo);

          await updateDoc(docRef, {
            todos: updatedTodos,
          });
        } else {
          await updateDoc(docRef, {
            todos: arrayUnion({
              ...item,
              item: [newTodo],
            }),
          });
        }
      } else {
        await setDoc(docRef, {
          todos: [
            {
              ...item,
              item: [newTodo],
            },
          ],
        });
      }
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
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }

    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const categoryIndex = data.todos.findIndex(
          (cat: any) => cat.cid === item.cid
        );

        if (categoryIndex > -1) {
          const updatedTodos = [...data.todos];
          const category = updatedTodos[categoryIndex];
          const todoIndex = category.item.findIndex(
            (todo: TTodo) => todo.id === id
          );

          if (todoIndex > -1) {
            category.item[todoIndex].selected = checkboxValue;

            await updateDoc(docRef, {
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
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }

    console.log('up', updateTitle);
    console.log('memo', updateMemo);

    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const categoryIndex = data.todos.findIndex(
        (cat: any) => cat.cid === item.cid
      );

      if (categoryIndex > -1) {
        const todoIndex = data.todos[categoryIndex].item.findIndex(
          (todo: TTodo) => todo.id === id
        );

        if (todoIndex > -1) {
          data.todos[categoryIndex].item[todoIndex].title = updateTitle;
          data.todos[categoryIndex].item[todoIndex].memo = updateMemo;

          await updateDoc(docRef, {
            todos: data.todos,
          });
          setRefetch((pre) => !pre);
        }
      }
    }
  };

  const handlePanelClose = () => {
    setIsPanelVisible(false);
  };

  const handleEdit = (id: string) => {
    const todoToEdit = item.item.find((todo: TTodo) => todo.id === id);
    if (todoToEdit) {
      console.log('dd', todoToEdit);
      setSelectedCategory(todoToEdit);
      setIsPanelVisible(true);
    }
  };

  const handleDelete = async (id: string) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }

    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const categoryIndex = data.todos.findIndex(
          (cat: any) => cat.cid === item.cid
        );

        if (categoryIndex > -1) {
          const updatedTodos = [...data.todos];
          const category = updatedTodos[categoryIndex];
          const todoIndex = category.item.findIndex(
            (todo: TTodo) => todo.id === id
          );

          if (todoIndex > -1) {
            category.item.splice(todoIndex, 1);

            await updateDoc(docRef, {
              todos: updatedTodos,
            });
            setRefetch((pre) => !pre);
          }
        }
      }
    } catch (error) {
      console.error('Error deleting document: ', error);
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
        {item.item &&
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
      <SidePanel
        formTitle="할일 수정"
        isVisible={isPanelVisible}
        onClose={handlePanelClose}
        category={selectedCategory}
        setSelectedTodo={true}
        onTodoSave={handleTodoSave}
      />
    </div>
  );
};

export default Category;
