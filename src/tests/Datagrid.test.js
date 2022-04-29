import returnData from "../classes/APIHandlerConstants";
import {fireEvent, render, waitFor} from "@testing-library/react";
import DataGridUsers from "../components/Datagrid";
import React from "react";
import {screen} from '@testing-library/dom'
import debug from "debug";

test('Datagrid renders given a set of rows (delete button included)', () => {
    const rows = [
        {"id": 1, "user_type": "admin2", "username": "andres", "email": 'andres@gmail.com', "is_active": "true"},
    ];
    render(<DataGridUsers rows={rows} />);
    screen.getByRole('button', {name: 'deleteUser1'})
})

test('APIHandler method delete is called once after delete button is clicked', async () => {
    const apiMock = {
        deleteUser: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'listener', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = screen.getByRole('button', {name: 'deleteUser3'});
    fireEvent.click(button);
    await waitFor(() => expect(apiMock.deleteUser).toHaveBeenCalledTimes(1));
})

test('APIHandler method delete is not called if chosen to delete user is an admin and error is shown',
    async () => {
    const apiMock = {
        deleteUser: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = screen.getByRole('button', {name: 'deleteUser2'});
    fireEvent.click(button);
    await waitFor(() => expect(apiMock.deleteUser).toHaveBeenCalledTimes(0));
    await screen.findByText("Error: You cannot delete an admin");
})

test('If server is down when calling api delete method, error message is shown on screen',
    async () => {
        const apiMock = {
            deleteUser: jest.fn(() => Promise.reject(new Error("500")))
        };
        const rows = [
            { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
            { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
            { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
        ];
        render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

        const button = screen.getByRole('button', {name: 'deleteUser3'});
        fireEvent.click(button);
        await screen.findByText("Error: Server is not available. Try again later.");
    })

