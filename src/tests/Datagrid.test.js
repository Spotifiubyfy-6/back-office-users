import returnData from "../classes/APIHandlerConstants";
import {fireEvent, render, waitFor} from "@testing-library/react";
import DataGridUsers from "../components/Datagrid";
import React from "react";
import {screen} from '@testing-library/dom'
import debug from "debug";

Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: jest.fn() }
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Datagrid renders given a set of rows (delete button included)', () => {
    const rows = [
        {"id": 1, "user_type": "admin2", "username": "andres", "email": 'andres@gmail.com', "is_active": "true"},
    ];
    render(<DataGridUsers rows={rows} />);
    screen.getByRole('button', {name: 'deleteUser1'})
})

test('APIHandler method delete is called once after delete button is clicked and page is reloaded',
    async () => {
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
    expect(window.location.reload).toHaveBeenCalledTimes(1);
})

test('Admins do not have delete button', async () => {
    const apiMock = {
        deleteUser: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    expect(() => screen.getByRole('button', {name: 'deleteUser1'})).toThrow();
    expect(() => screen.getByRole('button', {name: 'deleteUser2'})).toThrow();
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

test('APIHandler method setAsAdmin is called once after setAdmin button is clicked and page is' +
    ' reloaded', async () => {
    const apiMock = {
        setAsAdmin: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'listener', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = screen.getByRole('button', {name: 'setUser2AsAdmin'});
    fireEvent.click(button);
    await waitFor(() => expect(apiMock.setAsAdmin).toHaveBeenCalledTimes(1));
    expect(window.location.reload).toHaveBeenCalledTimes(1);
})

test('If server is down when calling api setAdmin method, error message is shown on screen',
    async () => {
        const apiMock = {
            setAsAdmin: jest.fn(() => Promise.reject(new Error("500")))
        };
        const rows = [
            { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
            { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
            { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
        ];
        render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

        const button = screen.getByRole('button', {name: 'setUser3AsAdmin'});
        fireEvent.click(button);
        await screen.findByText("Error: Server is not available. Try again later.");
    })

test('Admins do not have setAdmin button', async () => {
    const apiMock = {
        deleteUser: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    expect(() => screen.getByRole('button', {name: 'setUser1AsAdmin'})).toThrow();
    expect(() => screen.getByRole('button', {name: 'setUser2AsAdmin'})).toThrow();
})

test('Both listener and admin have a view profile button.', async () => {
    const apiMock = {
        getUserInfoWithId: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    screen.getByRole('button', {name: 'viewUser1'});
    screen.getByRole('button', {name: 'viewUser3'});
})

test('When a viewUserButton is clicked, the ApiHandler method getUserInfoWithId is called', async () => {
    const apiMock = {
        getUserInfoWithId: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = screen.getByRole('button', {name: 'viewUser1'});
    fireEvent.click(button);
    expect(apiMock.getUserInfoWithId).toHaveBeenCalledTimes(1);
})

test('When a viewUserButton is clicked but server is down, error message is shown on screen', async () => {
    const apiMock = {
        getUserInfoWithId: jest.fn(() => Promise.reject(new Error("500")))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = screen.getByRole('button', {name: 'viewUser1'});
    fireEvent.click(button);
    await screen.findByText("Error: Server is not available. Try again later.");
})

test('When a viewUserButton is clicked, button GoBack is shown on screen', async () => {
    const apiMock = {
        getUserInfoWithId: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const rows = [
        { id: 1, user_type: 'admin', username: 'admin', email: 'admin@gmail.com'},
        { id: 2, user_type: 'admin', username: 'pedro', email: 'pedro@gmail.com'},
        { id: 3, user_type: 'listener', username: 'paco', email: 'paco@gmail.com'},
    ];
    render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = screen.getByRole('button', {name: 'viewUser1'});
    fireEvent.click(button);
    await screen.findByText("Go Back");
})