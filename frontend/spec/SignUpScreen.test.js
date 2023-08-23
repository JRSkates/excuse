import SignUp from "../src/screens/SignUpScreen";
import React from "react";
import { jest } from "@jest/globals";
import { Share, SwitchChangeEvent } from "react-native";
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


	xit("calls the /users endpoint", () => {
    render(<SignUp />);

		// test here
  })
})