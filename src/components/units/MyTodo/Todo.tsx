import { useState } from 'react';
import Checkbox from '../../share/Checkbox';
import { FaEllipsisVertical } from 'react-icons/fa6';
import Toggle from '../../share/Toggle';

type Props = {
  item: {
    id: string;
    title: string;
    memo: string;
    selected: boolean;
  };
  onChange: (checkboxvalue: boolean, id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const Todo = ({ item, onChange, onEdit, onDelete }: Props) => {
  const [isChecked, setIsChecked] = useState(item.selected);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleChange = () => {
    onChange(!item.selected, item.id);
    setIsChecked(!isChecked);
  };

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    onEdit(item.id);
    setMenuVisible(false);
  };

  const handleDelete = () => {
    onDelete(item.id);
    setMenuVisible(false);
  };

  return (
    <div className=" flex justify-start items-center mb-2">
      <div className="min-w-[13rem] flex items-center">
        <Checkbox onChange={handleChange} checked={isChecked} />
        <span>{item.title}</span>
      </div>
      <div className="relative">
        <Toggle onClick={handleMenuToggle} />
       
        {menuVisible && (
          <div className="absolute   left-4 mt-2 w-20 bg-white border rounded shadow-md z-10">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
