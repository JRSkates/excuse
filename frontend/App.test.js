import App from './App' ;
import React from 'react';
import { Share } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import axios from 'axios';

jest.mock('axios')

// jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => {
//   const { TouchableHighlight } = require('react-native');
//   const MockTouchable = (props) => {
//     return <TouchableHighlight {...props} />;
//   };
//   MockTouchable.displayName = 'TouchableOpacity';
//   return MockTouchable;
// });

jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');
  return {
    ...ActualReactNative,
    Share: {
      share: jest.fn(),
    },
    StyleSheet: {
      ...ActualReactNative.StyleSheet,
      create: jest.fn((styles) => styles),
    },
  };
});

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

  it('should allow the user to share an excuse', async () => {
    const mockData = { excuse: "I am late"}
    axios.get.mockResolvedValue({ data: mockData })

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    
    fireEvent.press(generateExcuseButton)
    const excuseText = await waitFor(() => screen.getByText('I am late'));
    expect(excuseText).toBeTruthy();

    const shareButton = screen.getByText('Share');

    fireEvent.press(shareButton);

    expect(Share.share).toHaveBeenCalled();
    expect(Share.share).toHaveBeenCalledWith({
      message: 'I am late',
    });

  });
})