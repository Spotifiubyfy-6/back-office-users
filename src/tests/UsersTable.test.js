import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import UsersTable from "../components/Userstable";
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

test('UsersTable shows error when server is down', async () => {
    const apiMock = {
        getUsers: jest.fn(() => Promise.reject(new Error("500: error"))) //server not available
    };
    render(<UsersTable apiHandler={apiMock} />);
    await screen.findByText("Error: Server is not available. Try again later.");
})