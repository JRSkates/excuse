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
    //const { getByPlaceholderText } = render(<SignUp />);
    render(<SignUp />);

    const usernameInput = screen.getByPlaceholderText("username");

    expect(usernameInput).toBeTruthy();
  })
})