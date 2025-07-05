import {render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Predict from "./pages/Predict";
import App from "./App";

describe("Predict component", () => {
  test("renders form inputs and button", () => { //vérifie que le composant Predict se charge correctement les inputs et le bouton
    render(
      <MemoryRouter>
        <Predict />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Welcome to the Predict Page/i);
    expect(screen.getByPlaceholderText(/Enter HP base/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter MP base/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Attack base/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Armor base/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Magic Resist base/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Range type 'melee' or 'ranged'/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Movement Speed base/i)).toBeInTheDocument();

    const predictButton = screen.getByRole("button", { name: /Predict/i });
    expect(predictButton).toBeInTheDocument();
  });

  test("shows popup when Predict button is clicked", async () => {// vérifie que le popup s'affiche correctement lorsque le bouton Predict est cliqué
     global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ prediction: "some prediction" }),
    })
    );
    
    render(
      <MemoryRouter>
        <Predict />
      </MemoryRouter>
    );

    const predictButton = screen.getByRole("button", { name: /Predict/i });
    fireEvent.click(predictButton);

    const popupTitle = await screen.findByRole("heading", { name: /Prediction/i, level: 2 });
    expect(popupTitle).toBeInTheDocument();



    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();

    global.fetch.mockRestore();
  });


  test("closes popup when Close button is clicked", async () => {// vérifie que le popup se ferme correctement lorsque le bouton Close est cliqué
    
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ prediction: "some prediction" }),
    })
    );
    
    render(
      <MemoryRouter>
        <Predict />
      </MemoryRouter>
    );

    const predictButton = screen.getByRole("button", { name: /Predict/i });
    fireEvent.click(predictButton);

    const popupTitle = await screen.findByRole("heading", { name: /Prediction/i, level: 2 });
    expect(popupTitle).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(screen.queryByRole("heading", { name: /Prediction/i, level: 2 })).not.toBeInTheDocument();

    global.fetch.mockRestore();

  });

});

describe("Integration: App routing", () => {
  test("Rend la page Home sur la route /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to our Project to improve your comprehension of League of Legends/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome to our Project to improve your comprehension of League of Legends");
  });

  test("Rend la page Predict sur la route /Predict", () => {
    render(
      <MemoryRouter initialEntries={["/Predict"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to the Predict Page/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome to the Predict Page");
  });

  test("Rend le composant Header sur toutes les pages", () => {
    render(
      <MemoryRouter initialEntries={["/Predict"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
