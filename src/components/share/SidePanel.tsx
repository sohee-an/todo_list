import { useState, useEffect } from 'react';
import { TUpdateTodo } from '../../types/TodoTypes';

type Props = {
  isVisible: boolean;
  formTitle: string;
  setSelectedTodo: boolean;
  onClose: () => void;
  item: TUpdateTodo;
  onSave?: (title: string, memo: string, cid: string) => void;
  onTodoSave?:(title:string,memo:string,cid:string)=>void
};

const SidePanel = ({
  formTitle,
  isVisible,
  onClose,
  item,
  setSelectedTodo,
  onSave,
  onTodoSave,
}: Props) => {
  const [title, setTitle] = useState(item.title);
  const [memo, setMemo] = useState(item.memo);

  useEffect(() => {
    setTitle(item.title);
  }, [item]);

  const handleSave = () => {
    if (setSelectedTodo) {
      onTodoSave && onTodoSave(title, memo, item.id);
    } else {
      onSave && onSave(title, memo, item.id);
    }

    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold"> {formTitle}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          X
        </button>
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700">카테고리 제목</label> */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 mb-4 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />

        <textarea
          rows={4}
          value={memo}
          placeholder="메모"
          onChange={(e) => setMemo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />
      </div>
      <button
        value={memo}
        onClick={handleSave}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        저장
      </button>
    </div>
  );
};

export default SidePanel;
