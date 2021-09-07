import { render, fireEvent, screen } from '@testing-library/react';
import NewItem from './NewItem';

describe('Test NewItem component', () => {
    let onSubmit;
    let setName;
    beforeEach(() => {
        onSubmit = jest.fn(e => e.preventDefault());
        setName = jest.fn();
    });

    it('renders error when applicable', () => {
        render(<NewItem name="" setName={setName} error="some error" onSubmit={onSubmit} />);

        const error = screen.getByText(/some error/i);
        expect(error).toBeInTheDocument();
    });

    it('submits correctly', () => {
        const result = render(<NewItem name="" setName={setName} onSubmit={onSubmit} />);

        const newItemField = result.container.querySelector('#new-item-field');
        expect(newItemField).toBeInTheDocument();

        const saveButton = result.container.querySelector('[data-test-id="save-button"]');
        expect(saveButton).toBeInTheDocument();

        fireEvent.change(newItemField, { target: { value: 'test' } });
        expect(setName).toBeCalledWith('test');

        fireEvent.click(saveButton);
        expect(onSubmit).toHaveBeenCalled();
    });
});
