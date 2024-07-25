import { useEffect, useState } from 'react';
import DateSelector from '../components/units/MyTodo/DateSelector';
import SidePanel from '../components/share/SidePanel';
import { uid } from 'uid';
import Category from '../components/units/MyTodo/Category';
import useUserId from '../hook/useUserId';
import { TCategory, TUpdateTodo } from '../types/TodoTypes';
import FirebaseActions from '../api/Todo';

const TodoList = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [categorys, setCategorys] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TUpdateTodo>();
  const [refetch, setRefetch] = useState(false);
  const userId = useUserId();

  const handleCategoryClick = (category: TCategory) => {
    const updatedCategory = {
      ...category,
      id: category.cid,
    };
    setSelectedCategory(updatedCategory);
    setIsPanelVisible(true);
  };

  const handlePanelClose = () => {
    setIsPanelVisible(false);
  };

  const handleCategorySave = async (
    updateTitle: string,
    updateMemo: string,
    id: string
  ) => {
    if (!userId) return;

    try {
      const data = await FirebaseActions.getDocument(userId);
      if (data) {
        const categoryIndex = data.todos.findIndex(
          (cat: TCategory) => cat.cid === id
        );

        if (categoryIndex > -1) {
          data.todos[categoryIndex].title = updateTitle;
          data.todos[categoryIndex].memo = updateMemo;

          await FirebaseActions.updateDocument(userId, { todos: data.todos });
          setRefetch((pre) => !pre);
        }
      }
    } catch (error) {
      console.error('Error saving category: ', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!userId) return;

      try {
        const data = await FirebaseActions.getDocument(userId);
        if (data) {
          setCategorys(data.todos || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchCategories();
  }, [userId, refetch]);

  const handleClick = async () => {
    if (!userId) return;

    const newCategory = {
      userid: userId,
      cid: uid(),
      title: '카테고리1',
      memo: '메모',
      item: [],
    };

    try {
      await FirebaseActions.addCategory(userId, newCategory);
      setCategorys((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  return (
    <div>
      <DateSelector />
      <div className="mt-8 ml-8 mr-8">
        <button
          className="mb-4 bg-gray-200 p-2 rounded-lg text-gray-500"
          onClick={handleClick}
        >
          카테고리를 등록해주세요
        </button>
        {categorys.length !== 0 &&
          categorys.map((item: TCategory) => (
            <Category
              key={item.cid}
              item={item}
              onClick={() => handleCategoryClick(item)}
              setRefetch={setRefetch}
            />
          ))}
      </div>
      {!!selectedCategory && (
        <SidePanel
          formTitle="카테고리 수정"
          isVisible={isPanelVisible}
          onClose={handlePanelClose}
          item={selectedCategory}
          onSave={handleCategorySave}
          setSelectedTodo={false}
        />
      )}
    </div>
  );
};

export default TodoList;
