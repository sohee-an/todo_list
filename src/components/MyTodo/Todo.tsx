import React, { useState } from 'react';
import { TTodo } from './Category';
import Checkbox from '../share/Checkbox';
import { useSubmit } from 'react-router-dom';

type Props = {
  item: {
    id: string;
    title: string;
    memo: string;
    selected: boolean;
  };
  onChange: (checkboxvalue: boolean, id: string) => void;
};
const Todo = ({ item, onChange }: Props) => {
  const [isChecked, setIsChecked] = useState(item.selected);
  const handleChange = () => {
    onChange(!item.selected, item.id);
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex justify-start items-center mb-2">
      <Checkbox onChange={handleChange} checked={isChecked} />
      {item.title}
    </div>
  );
};

export default Todo;
