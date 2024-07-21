import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '../../../components/share/Checkbox';
import { vitest } from 'vitest';

describe('Checkbox Component', () => {
  it('체크박스가 잘 보이는가', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('체크박스가 props가 true일때 ', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('체크박스가 props가 false일때 ', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('체크박스가 클릭되면 상태가 변경되는지 확인', () => {
    let isChecked = false;
    const handleChange = () => {
      isChecked = !isChecked;
    };

    render(<Checkbox checked={isChecked} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    // 클릭하여 상태 변경
    fireEvent.click(checkbox);
    expect(isChecked).toBe(true);

    // 다시 클릭하여 상태 변경
    fireEvent.click(checkbox);
    expect(isChecked).toBe(false);
  });
});
