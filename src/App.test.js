import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio contact action", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /hire \/ contact me/i });
  expect(linkElement).toBeInTheDocument();
});
