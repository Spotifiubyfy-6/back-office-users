import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {findByText, fireEvent, render, waitFor} from '@testing-library/react'
import LogIn from '../components/LogIn'
import APIHandler from "../classes/APIHandler";
import APIHandlerConstants from "../classes/APIHandlerConstants";
import {act} from "react-dom/test-utils";
import returnData from "../classes/APIHandlerConstants";

test('LogIn components are rendered correctly', () => {
    const component = render(<LogIn/>);
    component.getByLabelText('Username');
    component.getByLabelText('Password');
    component.getByText('Log in');
})

test('LogIn shows error message when trying to log in without inserting text to any text fields', () => {
    const component = render(<LogIn/>);
    const button = component.getByText('Log in');
    fireEvent.click(button);

    component.getByText('Fill both username and password fields');
})

test('LogIn text fields are updated as expected', () => {
    const component = render(<LogIn/>);

    const inputUsername = component.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    expect(inputUsername.value).toBe('a');

    const inputPassword = component.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});
    expect(inputPassword.value).toBe('b');
})

test('Error message is not shown when textfields have input and button is clicked', async () => {
    const apiMock = {
        logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const component = render(<LogIn apiHandler={apiMock}/>);

    const inputUsername = component.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = component.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = component.getByText('Log in');
    fireEvent.click(button);
    await waitFor(() => expect(() => component.getByText('Fill both username and password fields')).toThrow());
})

test('apiHandler login method is called once when textfields have input and button is clicked', async () => {
    const apiMock = {
        logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const component = render(<LogIn apiHandler={apiMock}/>);

    const inputUsername = component.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = component.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = component.getByText('Log in');
    fireEvent.click(button);
    await waitFor(() => expect(apiMock.logIn).toHaveBeenCalledTimes(1));
})

test('setLoginState method is called once when textfields have input, apirequest is successful ' +
    'and button is clicked', async () => {
    const apiMock = {
        logIn: jest.fn(() => Promise.resolve(returnData.SUCCESS))
    };
    const setLogInMock = jest.fn();
    const component = render(<LogIn apiHandler={apiMock} setLoginState={setLogInMock}/>);

    const inputUsername = component.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = component.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = component.getByText('Log in');
    fireEvent.click(button);
    await waitFor(() => expect(setLogInMock).toHaveBeenCalledTimes(1));
})

test('When an incorrect username/password is given, error message is shown', async () => {
    const apiMock = {
        logIn: jest.fn(() => Promise.reject(new Error('Error: wrong username or password')))
    };
    const component = render(<LogIn apiHandler={apiMock} />);

    const inputUsername = component.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = component.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = component.getByText('Log in');
    fireEvent.click(button);
    component.findByText('Error: wrong username or password');
})

test('When an username is not an admin, error message is shown', async () => {
    const apiMock = {
        logIn: jest.fn(() => Promise.reject(new Error('Error: username is not an admin')))
    };
    const component = render(<LogIn apiHandler={apiMock} />);

    const inputUsername = component.getByRole('textbox', {name: 'usernameTextField'});
    fireEvent.change(inputUsername, {target: {value: 'a'}});
    const inputPassword = component.getByRole('textbox', {name: 'passwordTextField'});
    fireEvent.change(inputPassword, {target: {value: 'b'}});

    const button = component.getByText('Log in');
    fireEvent.click(button);
    component.findByText('Error: username is not an admin');
})