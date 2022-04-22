import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import LogIn from '../components/LogIn'

test('LogIn components are rendered correctly', () => {
    const component = render(<LogIn/>);
    component.getByLabelText('Username');
    component.getByLabelText('Password');
    component.getByText('Log in');
})

test('LogIn button handler is called once when the button is pressed', () => {
    const mockHandler = jest.fn();
    const component = render(<LogIn requestLogIn={mockHandler}/>);
    const button = component.getByText('Log in');
    fireEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
})

test('LogIn shows error message when trying to log in without inserting text to any text fields', () => {
    const mockHandler = jest.fn();
    const component = render(<LogIn requestLogIn={mockHandler}/>);
    const button = component.getByText('Log in');
    fireEvent.click(button);

    component.getByText('Fill both username and password fields');
}) //should pass

test('LogIn fetches user data accordingly', () => {

}) //need refactor first