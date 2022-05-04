import {fireEvent, render, waitFor} from "@testing-library/react";
import DataGridUsers from "../components/Datagrid";
import {screen} from "@testing-library/dom";
import React from "react";
import Drawer from "../components/Drawer";
import {MemoryRouter} from "react-router-dom";

Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: jest.fn() }
});

test('LogOut button deletes token from storage and reloads page.', () => {
    localStorage.setItem('token', 'value');
    render(<MemoryRouter> <Drawer/> </MemoryRouter>);
    const button = screen.getByText('Log out');
    fireEvent.click(button);
    expect(localStorage.getItem('token')).toBe(null);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
})