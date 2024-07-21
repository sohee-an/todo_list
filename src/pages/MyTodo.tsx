import { useEffect, useState } from 'react';
import DateSelector from '../components/MyTodo/DateSelector';
import CategoryButton from '../components/share/CategoryButton';
import SidePanel from '../components/share/SidePanel';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { uid } from 'uid';
import { db } from '../config/firebase';
import Category from '../components/MyTodo/Category';

type TCategory = {
  id: string;
  memo: string;
  name: string;
  userid: string;
};

const TodoList = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [categorys, setCategorys] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | any>({});
  const [refetch, setRefetch] = useState(false);

  const handleCategoryClick = (category: any) => {
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
      const categoryIndex = data.todos.findIndex((cat: any) => cat.cid === id);

      if (categoryIndex > -1) {
        data.todos[categoryIndex].title = updateTitle;
        data.todos[categoryIndex].memo = updateMemo;

        await updateDoc(docRef, {
          todos: data.todos,
        });
        setRefetch((pre) => !pre);
      }
    }
  };
  useEffect(() => {
    const fetchTestValue = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return;
      }

      try {
        const docRef = doc(db, 'todos', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setCategorys(data.todos || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchTestValue();
  }, [refetch]);

  const handleClick = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }

    const newCategory = {
      userid: userId,
      cid: uid(),
      title: '카테고리1',
      memo: '메모',
    };

    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        // 문서가 존재하는 경우 배열 필드에 새 객체 추가
        await updateDoc(docRef, {
          todos: arrayUnion(newCategory),
        });
      } else {
        // 문서가 존재하지 않는 경우 배열 필드 생성
        await setDoc(docRef, {
          todos: [newCategory],
        });
      }

      setCategorys((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error('Error adding document: ', error);
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
          categorys.map((item: any) => (
            <Category
              key={item.cid}
              item={item}
              onClick={() => handleCategoryClick(item)}
              setRefetch={setRefetch}
            />
          ))}
      </div>
      <SidePanel
        formTitle="카테고리 수정"
        isVisible={isPanelVisible}
        onClose={handlePanelClose}
        category={selectedCategory}
        onSave={handleCategorySave}
        setSelectedTodo={false}
      />
    </div>
  );
};

export default TodoList;
