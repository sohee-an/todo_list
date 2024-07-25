import { ReactNode } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';

type ToggleProps = {
  icon?: ReactNode;
  className?: string;
  onClick: () => void;
};

const Toggle = ({ icon, className, onClick }: ToggleProps) => {
  return (
    <div className={` ${className}`}>
      <div onClick={onClick} className="cursor-pointer">
        {icon || <FaEllipsisVertical data-testid="menuToggle" />}
      </div>
    </div>
  );
};

export default Toggle;
