
type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return <input type="checkbox" className="w-4 h-4 ml-3 mr-3" checked={checked} onChange={onChange} />;
};

export default Checkbox;
