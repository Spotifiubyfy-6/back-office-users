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
    const component = render(<DataGridUsers rows={rows} />);
    component.getByRole('button', {name: 'deleteUser1'})
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
    const component = render(<DataGridUsers apiHandler={apiMock} rows={rows}/>);

    const button = component.getByRole('button', {name: 'deleteUser3'});
    fireEvent.click(button);
    await waitFor(() => expect(apiMock.deleteUser).toHaveBeenCalledTimes(1));
})