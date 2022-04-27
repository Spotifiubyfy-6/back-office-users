import {fireEvent, render, waitFor} from "@testing-library/react";
import UsersTable from "../components/UsersTable";
import APIHandlerConstants from "../classes/APIHandlerConstants";
import React from "react";
import returnData from "../classes/APIHandlerConstants";

test('ApiHandler method getUsers is only called once when creating a new UsersTable', async () => {
    const apiMock = {
        getUsers: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    render(<UsersTable apiHandler={apiMock} />);
    await waitFor(() => expect(apiMock.getUsers).toHaveBeenCalledTimes(1));
})