import { render, fireEvent, screen } from '@testing-library/react';
import List from './List';

describe('Test List component', () => {
    const item1 = { id: 1, name: 'Item 1', isComplete: true };
    const item2 = { id: 2, name: 'Item 2', isComplete: false };

    it('renders all items', () => {
        render(<List items={[item1, item2]} onChange={jest.fn()} />);

        const item1Element = screen.getByText(/Item 1/i);
        expect(item1Element).toBeInTheDocument();

        const item2Element = screen.getByText(/Item 2/i);
        expect(item2Element).toBeInTheDocument();
    });

    it('adds complete class to isComplete items', () => {
        render(<List items={[item1, item2]} onChange={jest.fn()} />);

        const item1Div = screen.getByText(/Item 1/i).closest("div");
        expect(item1Div.className).toBe('item complete');

        const item2Div = screen.getByText(/Item 2/i).closest("div");
        expect(item2Div.className).toBe('item');
    });

    describe('Test interaction', () => {
        let onChange;
        let mock;

        beforeEach(() => {
            mock = jest.fn();
            onChange = item => isChecked => mock(item, isChecked);
        });
        test('clicking an isComplete item will mark it incomplete', () => {
            render(<List items={[item1, item2]} onChange={onChange} />);

            fireEvent.click(screen.getByText(/Item 1/i));
            expect(mock).toBeCalledWith(item1, false);
        });

        test('clicking an incomplete item will mark it as complete', () => {
            render(<List items={[item1, item2]} onChange={onChange} />);

            fireEvent.click(screen.getByText(/Item 2/i));
            expect(mock).toBeCalledWith(item2, true);
        });
    });
});
