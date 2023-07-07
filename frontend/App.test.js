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
})