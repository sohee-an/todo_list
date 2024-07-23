import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SidePanel from '../../../components/share/SidePanel';

describe('SidePanel Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnTodoSave = jest.fn();

  const defaultProps = {
    formTitle: 'Test Form',
    isVisible: true,
    onClose: mockOnClose,
    category: { id: '1', memo: 'Test memo', title: 'Test title' },
    setSelectedTodo: false,
    onSave: mockOnSave,
    onTodoSave: mockOnTodoSave,
  };

  it('sidepanel이 화면에 잘 보이는가', () => {
    render(<SidePanel {...defaultProps} />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('props title, memo가 화면에 잘 보이는가 ', () => {
    render(<SidePanel {...defaultProps} />);
    expect(screen.getByDisplayValue('Test title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test memo')).toBeInTheDocument();
  });

  it('x 버튼을 누르면 onClose가 실행이 되는가 ', () => {
    render(<SidePanel {...defaultProps} />);
    fireEvent.click(screen.getByText('X'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('카테고리를 수정했을 때 ', () => {
    render(<SidePanel {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue('Test title'), {
      target: { value: 'New title' },
    });
    fireEvent.change(screen.getByDisplayValue('Test memo'), {
      target: { value: 'New memo' },
    });
    fireEvent.click(screen.getByText('저장'));
    expect(mockOnSave).toHaveBeenCalledWith('New title', 'New memo', '1');
  });

  it('카테고리의 하위의 투두를 수정할 때', () => {
    render(<SidePanel {...defaultProps} setSelectedTodo={true} />);
    fireEvent.change(screen.getByDisplayValue('Test title'), {
      target: { value: 'New title' },
    });
    fireEvent.change(screen.getByDisplayValue('Test memo'), {
      target: { value: 'New memo' },
    });
    fireEvent.click(screen.getByText('저장'));
    expect(mockOnTodoSave).toHaveBeenCalledWith('New title', 'New memo', '1');
  });
});
