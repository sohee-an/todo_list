import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryButton from '../../../components/share/CategoryButton';

describe('CategoryButton Component', () => {
  it('props로 건네준 name이 잘 보이는지 ', () => {
    render(<CategoryButton name={'test'} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('test');
  });
});
