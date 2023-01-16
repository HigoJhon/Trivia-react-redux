import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from "../App"
import Game from '../pages/Game';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"

describe('Testar elementos da pagina Game', () => {
    test('Verificar se elementos estão renderizando', () => {
        renderWithRouterAndRedux(<Game />);

        const inputName = screen.getByTestId(name);
        const inputEmail = screen.getByTestId(email);

        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
    })
})