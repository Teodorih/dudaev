import { render, screen } from '@testing-library/react';
import App from './App';
import FilterableCustomTable from './TablePage'
import React from 'react'
import WindowPage from './WindowPage';

import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('render table', () => {
  render(<FilterableCustomTable />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
