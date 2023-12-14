import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/index";
import '@testing-library/jest-dom'
import Register from "../pages/Register";


jest.mock("../redux/loadersSlice", () => ({
    ShowLoading: jest.fn(),
    HideLoading: jest.fn(),
}));

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
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
                <Register />
            </BrowserRouter>
        );
        const loginText = screen.getByTestId('loginButton');
        expect(loginText).toHaveTextContent('Name');

        const loginText_2 = screen.getByTestId('loginButton_2');
        expect(loginText_2).toHaveTextContent('Library');
    });


});
