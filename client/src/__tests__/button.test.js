import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button';

describe('Button Component Tests', () => {
    it('renders a button with the provided title', () => {
        const { getByText } = render(<Button title="Click me" />);
        expect(getByText('Click me')).toBeInTheDocument();
    });

    it('calls the onClick handler when the button is clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button title="Click me" onClick={handleClick} />);

        fireEvent.click(getByText('Click me'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies the correct styling based on variant and color', () => {
        const { getByText } = render(<Button title="Styled Button" variant="outlined" color="secondary" />);

        const styledButton = getByText('Styled Button');

        expect(styledButton).toHaveClass('border-secondary');
    });

    it('applies the correct styling for disabled button', () => {
        const { getByText } = render(<Button title="Disabled Button" disabled />);

        const disabledButton = getByText('Disabled Button');

        expect(disabledButton).toHaveClass('opacity-50 cursor-not-allowed');
    });
});
