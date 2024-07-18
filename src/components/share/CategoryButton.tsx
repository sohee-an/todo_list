type Props = {
  name: string;
  color: string;
};

const CategoryButton = ({ name, color }: Props) => {
  return (
    <div>
      <button
        className={`mb-4 mr-2 bg-gray-400 text-${color}-200 px-3 py-1 rounded-full`}
      >
        {name}
      </button>
      <button>+</button>
    </div>
  );
};

export default CategoryButton;
