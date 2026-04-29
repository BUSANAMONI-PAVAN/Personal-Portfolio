// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  beginPath: jest.fn(),
  clearRect: jest.fn(),
  closePath: jest.fn(),
  drawImage: jest.fn(),
  fill: jest.fn(),
  fillRect: jest.fn(),
  fillText: jest.fn(),
  lineTo: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  moveTo: jest.fn(),
  rect: jest.fn(),
  restore: jest.fn(),
  save: jest.fn(),
  setTransform: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
}));
