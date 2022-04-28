import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {findByText, fireEvent, render, waitFor} from '@testing-library/react'
import LogIn from '../components/LogIn'
import APIHandler from "../classes/APIHandler";
import APIHandlerConstants from "../classes/APIHandlerConstants";
import {act} from "react-dom/test-utils";
import { screen, configure } from '@testing-library/react'
import returnData from "../classes/APIHandlerConstants";

test('LogIn components are rendered correctly', () => {
    render(<LogIn/>);
    screen.getByLabelText('Username');
    screen.getByLabelText('Password');
    screen.getByText('Log in');
})

test('LogIn shows error message when trying to log in without inserting text to any text fields', () => {
    render(<LogIn/>);
    const button = screen.getByText('Log in');
    fireEvent.click(button);

    screen.getByText('Error: Fill both username and password fields');
})

test('LogIn text fields are updated as expected', () => {
    render(<LogIn/>);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    expect(inputUsername.value).toBe('a');

    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});
    expect(inputPassword.value).toBe('b');
})

test('Error message is not shown when textfields have input and button is clicked', async () => {
    const apiMock = {
        isAdmin: jest.fn(() => Promise.resolve({data: "false"})),
        logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    render(<LogIn apiHandler={apiMock}/>);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = screen.getByText('Log in');
    fireEvent.click(button);
    await waitFor(() => expect(() => screen.getByText('Error: Fill both username and password fields')).toThrow());
})

test('apiHandler isAdmin method is called once when textfields have input and button is clicked' +
    'but since user is not an admin, corresponding error message is shown', async () => {
    const apiMock = {
        isAdmin: jest.fn(() => Promise.resolve({data: "false"}))
    };
    render(<LogIn apiHandler={apiMock}/>);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = screen.getByText('Log in');
    fireEvent.click(button);

    await waitFor(() => expect(apiMock.isAdmin).toHaveBeenCalledTimes(1));
    await screen.findByText("Error: User is not an admin");
})

test('isAdmin apiHandler method is called but since user is not an admin logIn method is not called',
    async () => {
        const apiMock = {
            isAdmin: jest.fn(() => Promise.resolve({data: "false"})), //not an admin
            logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS))
        };
        render(<LogIn apiHandler={apiMock}/>);

        const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
        fireEvent.change(inputUsername, {target: {value: 'a'}});
        const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
        fireEvent.change(inputPassword, {target: {value: 'b'}});

        const button = screen.getByText('Log in');
        fireEvent.click(button);
        await waitFor(() => expect(apiMock.logIn).toHaveBeenCalledTimes(0));
})

test('when username is not a registered user, an error is shown in screen',async () => {
        const apiMock = {
            isAdmin: jest.fn(() => Promise.reject(new Error("404: Not Found"))), //not registered
        };
        render(<LogIn apiHandler={apiMock}/>);

        const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
        fireEvent.change(inputUsername, {target: {value: 'a'}});
        const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
        fireEvent.change(inputPassword, {target: {value: 'b'}});

        const button = screen.getByText('Log in');
        fireEvent.click(button);
        await screen.findByText("Error: Username is not registered.");
})

test('when server is down and isAdmin apiHandler method is called, server down error is shown on ' +
    'screen',async () => {
    const apiMock = {
        isAdmin: jest.fn(() => Promise.reject(new Error("500: error"))), //server down
    };
    render(<LogIn apiHandler={apiMock}/>);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = screen.getByText('Log in');
    fireEvent.click(button);
    await screen.findByText("Error: Server is not available. Try again later.");
})

test('logIn apihandler method is called once if the user is an admin',async () => {
        const apiMock = {
            isAdmin: jest.fn(() => Promise.resolve({data: "true"})), //is an admin
            logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS))
        };
        render(<LogIn apiHandler={apiMock}/>);

        const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
        fireEvent.change(inputUsername, {target: {value: 'a'}});
        const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
        fireEvent.change(inputPassword, {target: {value: 'b'}});

        const button = screen.getByText('Log in');
        fireEvent.click(button);
        await waitFor(() => expect(apiMock.logIn).toHaveBeenCalledTimes(1));
})

test('When an incorrect username/password is given, error message is shown', async () => {
    const apiMock = {
        isAdmin: jest.fn(() => Promise.resolve({data: "true"})), //is an admin
        logIn: jest.fn(() => Promise.reject(new Error('Error: wrong username or password')))
    };
    render(<LogIn apiHandler={apiMock} />);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = screen.getByText('Log in');
    fireEvent.click(button);
    await screen.findByText('Error: Incorrect password.');
})

test('When server is down when calling logIn api method, corresponding error is shown on screen', async () => {
    const apiMock = {
        isAdmin: jest.fn(() => Promise.resolve({data: "true"})), //is an admin
        logIn: jest.fn(() => Promise.reject(new Error("500: error"))) //server is down
    };
    render(<LogIn apiHandler={apiMock} />);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = screen.getByText('Log in');
    fireEvent.click(button);
    await screen.findByText('Error: Server is not available. Try again later.');
})

test('When user is admin and log in is successful, setState', async () => {
    const apiMock = {
        isAdmin: jest.fn(() => Promise.resolve({data: "true"})), //is an admin
        logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS)) //server is down
    };
    const setLoggedInMock = jest.fn();
    render(<LogIn apiHandler={apiMock} setLoginState = {setLoggedInMock}/>);

    const inputUsername = screen.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = screen.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = screen.getByText('Log in');
    fireEvent.click(button);
    await waitFor(() => expect(setLoggedInMock).toHaveBeenCalledTimes(1));
})