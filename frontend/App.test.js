import App from "./App";
import React from "react";
import { jest } from '@jest/globals';
import { Share, SwitchChangeEvent} from "react-native";
import {
  render,
  fireEvent,
  screen,
  waitFor
} from "@testing-library/react-native";
import axios from "axios";

jest.mock("axios");


describe("App", () => {
  it("should return an excuse to the frontend when the button is pressed", async () => {
    const mockData = { excuse: "I am late" };
    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);
    const generateExcuseButton = screen.getByText("Generate Excuse");

    fireEvent.press(generateExcuseButton);

    const excuseText = await waitFor(() => screen.getByText("I am late"));
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

  it("should have an input field", () => {
    render(<App />);
    const inputField = screen.getByLabelText("Excuse type input field");

    expect(inputField).toBeTruthy();
  });

  it("given some input, it should include that input in the body of the request when the button is pressed", async () => {
    render(<App />);

    const inputField = screen.getByLabelText("Excuse type input field");
    const generateExcuseButton = screen.getByText("Generate Excuse");
    // inputs text
    fireEvent.changeText(inputField, 'my sons birthday');
    // presses button
    fireEvent.press(generateExcuseButton);

    expect(axios.get).toHaveBeenLastCalledWith('https://excuse-s1se.onrender.com/excuse', { 
      params:{
        eventType: 'my sons birthday',
        "toggle": false
      }
    })
  });

  it("it clears the input field on button press", async () => {
    render(<App />);

    const inputField = screen.getByLabelText("Excuse type input field");
    const generateExcuseButton = screen.getByText("Generate Excuse");
    // inputs text
    fireEvent.changeText(inputField, 'my sons birthday');
    // presses button
    fireEvent.press(generateExcuseButton); 
    console.log(inputField.props);
    await waitFor(() => expect(inputField.props.defaultValue).toBe(""));

  });

  it('should display the share button after an excuse is generated', async () => {
    const mockData = { excuse: "I am late"}
    axios.get.mockResolvedValue({ data: mockData })

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    
    fireEvent.press(generateExcuseButton)
    await waitFor(() => screen.getByText('I am late'));

    const shareButton = screen.getByText('Share');

    expect(shareButton).toBeTruthy();

  });
  
  it('should allow the user to share an excuse', async () => {
    const mockData = { excuse: "I am late" };
    axios.get.mockResolvedValue({ data: mockData });
  
    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
  
    fireEvent.press(generateExcuseButton);
    await waitFor(() => screen.getByText('I am late'));
  
    const shareButton = screen.getByText('Share');
    console.log(shareButton);
  
    const shareSpy = jest.spyOn(Share, 'share');
  
    fireEvent.press(shareButton);
  
    expect(shareSpy).toHaveBeenCalled();
    expect(shareSpy).toHaveBeenCalledWith({
      message: 'I am late',
    });
  
    shareSpy.mockRestore();
  });
  it('on press, button goes into loading state, and after the excuse loads, the original button is displayed again', async () => {
    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    fireEvent.press(generateExcuseButton);

    expect(screen.getByText("Submitting")).toBeTruthy();

    await waitFor(() => expect(screen.getByText("Generate Excuse")).toBeTruthy());
  });
  

  it('should toggle the toggle button', async () => {

    const mockData = { excuse: "I am late"}
    axios.get.mockResolvedValue({ data: mockData })

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    
    fireEvent.press(generateExcuseButton)
    await waitFor(() => screen.getByText('I am late'));

    const toggleSwitch = screen.getByTestId('switch');

    fireEvent(toggleSwitch, 'onValueChange', true);

    expect(toggleSwitch.props.value).toBe(true);
    
  });
  it('should display the copy button after an excuse is generated', async () => {
    const mockData = { excuse: "I am late"}
    axios.get.mockResolvedValue({ data: mockData })

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
    
    fireEvent.press(generateExcuseButton)
    await waitFor(() => screen.getByText('I am late'));

    const copyButton = screen.getByText('Copy');

    expect(copyButton).toBeTruthy();

  });

  it('should copy the excuse to clipboard using useClipboard', async () => {
    const mockData = { excuse: "I am late" };
    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);
    const generateExcuseButton = screen.getByText('Generate Excuse');
  
    fireEvent.press(generateExcuseButton);
    await waitFor(() => screen.getByText('I am late'));
  
    const copyButton = screen.getByText('Copy');

    fireEvent.press(copyButton);

    expect(screen.getByText('Copied!')).toBeTruthy()

    await waitFor(() => expect(screen.getByText('Copy')).toBeTruthy(), { timeout: 2500 });

    });
});
