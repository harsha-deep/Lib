// Register.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register/index';
import configureStore from 'redux-mock-store';

// Mocking apicalls/users
jest.mock('../apicalls/users', () => ({
    RegisterUser: jest.fn(() => ({ success: true, message: 'Mocked success message' })),
}));
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
describe('Register component', () => {
    it('should render the register form', () => {
        const mockStore = configureStore();
        let store;
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Check that the form elements are rendered
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByText('Already have an account? Click Here To Login.')).toBeInTheDocument();
    });

    it('should handle form submission and register successfully', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.submit(screen.getByText('Register'));

        // Wait for the asynchronous actions to complete
        await waitFor(() => {
            expect(jest.requireMock('../../apicalls/users').RegisterUser).toHaveBeenCalled();
            expect(screen.getByText('Already have an account? Click Here To Login.')).toBeInTheDocument();
        });
    });


});
