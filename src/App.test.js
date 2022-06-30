import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

describe("When App is rendered", () => {
  beforeEach(() => render(<App />));

  afterEach(cleanup);

  test("should render search input", () => {
    expect(screen.queryByTestId("search-input")).toBeInTheDocument();
  });

  test("should render empty search results box", () => {
    expect(screen.queryByTestId("empty-search-results")).toBeInTheDocument();
  });

  test("should NOT render search results box", () => {
    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
  });

  test("should render empty nominated movies result box", () => {
    expect(screen.queryByTestId("empty-nominated-movies")).toBeInTheDocument();
  });

  test("should NOT render nominated movies result box", () => {
    expect(screen.queryByTestId("nominated-movies")).not.toBeInTheDocument();
  });

  test("should NOT render notification", () => {
    expect(screen.queryByTestId("notification")).not.toBeInTheDocument();
  });
});
