import { render, screen, fireEvent } from "@testing-library/react";
import Predict from "./pages/Predict";
import { MemoryRouter } from "react-router-dom";

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

  test("shows popup when Predict button is clicked", () => {// vérifie que le popup s'affiche correctement lorsque le bouton Predict est cliqué
    render(
      <MemoryRouter>
        <Predict />
      </MemoryRouter>
    );

    const predictButton = screen.getByRole("button", { name: /Predict/i });
    fireEvent.click(predictButton);

    const popupTitle = screen.getByRole("heading", { name: /Prediction/i, level: 2 });
    expect(popupTitle).toBeInTheDocument();

    expect(screen.getByText(/This is where the prediction result will appear!/i)).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();
  });


  test("closes popup when Close button is clicked", () => {// vérifie que le popup se ferme correctement lorsque le bouton Close est cliqué
    render(
      <MemoryRouter>
        <Predict />
      </MemoryRouter>
    );

    const predictButton = screen.getByRole("button", { name: /Predict/i });
    fireEvent.click(predictButton);

    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole("heading", { name: /Prediction/i, level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByText(/This is where the prediction result will appear!/i)).not.toBeInTheDocument();
  });

});
