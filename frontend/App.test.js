import App from './App' ;
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import axios from 'axios';

jest.mock('axios')

describe('App', () => {
  it('should return an excuse to the frontend when the button is pressed', async () => {
    const mockData = { excuse: "I am late"}
    axios.get.mockResolvedValue({ data: mockData })

    const { getByText } = render(<App />);

    fireEvent.press(getByText("Generate excuse"));

    const excuseText = await waitFor(() => getByText('I am late'));
    expect(excuseText).toEqual("I am late");
    expect(excuseText).toBeTruthy();
  })    
})