import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/index";
import '@testing-library/jest-dom'
// Mocking dependencies
jest.mock("../apicalls/users", () => ({
    LoginUser: jest.fn(() => Promise.resolve({ success: true, data: "mockToken", message: "Login successful" })),
}));

jest.mock("../redux/loadersSlice", () => ({
    ShowLoading: jest.fn(),
    HideLoading: jest.fn(),
}));

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../logger/logger", () => ({
    info: jest.fn(),
    error: jest.fn(),
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
describe("Login Component", () => {
    it("renders Login component", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        const loginText = screen.getByTestId('loginButton');
        expect(loginText).toHaveTextContent('Login');

        const loginText_2 = screen.getByTestId('loginButton_2');
        expect(loginText_2).toHaveTextContent('Login');
    });


});
