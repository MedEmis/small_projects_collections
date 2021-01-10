import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test("it works", () => {
	const { getByText, getByLabelText } = render(<App />);
  
	getByText("TODOS");
	getByLabelText("What needs to be done?");
	getByText("Add #1");
  });
