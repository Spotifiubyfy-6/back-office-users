import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import LogIn from '../components/LogIn'
import APIHandler from "../classes/APIHandler";

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
