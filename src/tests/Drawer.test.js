import {fireEvent, render} from "@testing-library/react";
import {screen} from "@testing-library/dom";
import React from "react";
import Drawer from "../components/Drawer";
import {MemoryRouter} from "react-router-dom";

test('Drawer log out button deletes token key when clicked', () => {
    render(<MemoryRouter><Drawer/></MemoryRouter>);
    localStorage.setItem('token', 'value'); //token created
    const button = screen.getByText('Log out');
    fireEvent.click(button);
    expect(localStorage.getItem('token')).toBe(null);
})