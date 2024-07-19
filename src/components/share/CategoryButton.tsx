import { ref, set } from 'firebase/database';
import { uid } from 'uid';
import { db } from '../../config/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type Props = {
  name: string;
  // color: string;
  onClick: () => void;
};

const CategoryButton = ({ name, onClick }: Props) => {
  

 

  return (
   
      <button
        onClick={onClick}
        className={`mb-4 mr-2 bg-gray-400 text-black px-3 py-1 rounded-full`}
      >
        {name}
      </button>
    
  );
};

export default CategoryButton;
