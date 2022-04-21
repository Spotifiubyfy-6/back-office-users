import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import LogIn from '../components/LogIn'

test('LogIn components are rendered correctly', () => {
    const component = render(<LogIn/>);
    component.getByLabelText('Username');
    component.getByLabelText('Password');
    component.getByText('Log in');
})
