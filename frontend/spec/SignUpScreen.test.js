import SignUp from "../src/screens/SignUpScreen";
import React from "react";
import { jest } from "@jest/globals";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import axios from "axios";

jest.mock("axios");

describe("SignUpScreen", () => {
  it("renders username field", () => {
    render(<SignUp />);

    const usernameInput = screen.getByPlaceholderText("username");

    expect(usernameInput).toBeTruthy();
  })
  it("renders email field", () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText("email");

    expect(emailInput).toBeTruthy();
  })
  it("renders password field", () => {
    render(<SignUp />);

    const passwordInput = screen.getByPlaceholderText("password");

    expect(passwordInput).toBeTruthy();
  })

	it("renders a sign up button", () => {
    render(<SignUp />);

    const signUpButton = screen.getByText("Sign Up");

    expect(signUpButton).toBeTruthy();
  })


	it("should call the /users endpoint when sign up button is clicked then navigates to HomeScreen", async () => {
		const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate };

    render(<SignUp navigation={mockNavigation}/>);

    axios.post.mockResolvedValue({ message: 'OK' });

    const usernameInput = screen.getByPlaceholderText("username");
   	const emailInput = screen.getByPlaceholderText("email");
   	const passwordInput = screen.getByPlaceholderText("password");

   	fireEvent.changeText(usernameInput, "username");
   	fireEvent.changeText(emailInput, "email@test.com");
   	fireEvent.changeText(passwordInput, "mypassword");

   	const signUpButton = screen.getByText("Sign Up");
   	fireEvent.press(signUpButton)

   	expect(axios.post).toHaveBeenLastCalledWith("https://excuse-s1se.onrender.com/users",
   	{
     email: "email@test.com",
     password: "mypassword",
     username: "username"
   })

	 await Promise.resolve()

	 expect(mockNavigate).toHaveBeenLastCalledWith("Excuse")
  })

})