import App from './App' ;
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import axios from 'axios';

jest.mock('axios')

describe('App', () => {
  it('should return an excuse to the frontend when the button is pressed', async () => {
    const mockData = { excuse: "I am late"}
    axios.get.mockResolvedValue({ data: mockData })

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    
    fireEvent.press(generateExcuseButton)

    const excuseText = await waitFor(() => screen.getByText('I am late'));
    expect(excuseText).toBeTruthy();
  })

  it('should return a message if there is an API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Excuse Generator is sick of your lies right now, try again shortly...'));

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    
    fireEvent.press(generateExcuseButton)

    const errorMessage = await waitFor(() => screen.getByText('Excuse Generator is sick of your lies right now, try again shortly...'));
    expect(errorMessage).toBeTruthy();
  })
})