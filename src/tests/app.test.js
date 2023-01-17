import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from "../App"
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"

const name = 'input-player-name';
const email = 'input-gravatar-email';
const play = "btn-play";
const config = "btn-settings";

describe('Testando pagina inicial', () => {
    test('testando rota "/"', () => {
        renderWithRouterAndRedux(<App />);

        const inputName = screen.getByTestId(name);
        const inputEmail = screen.getByTestId(email);

        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
    })
    test('testando button de validação', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        const inputName = screen.getByTestId(name);
        const inputEmail = screen.getByTestId(email);
        const btnPlay = screen.getByTestId(play)

        userEvent.type(inputName, 'test');
        userEvent.type(inputEmail, 'test@test.com');
        userEvent.click(btnPlay);

        expect(history.location.pathname).toBe('/trivia');
    })
    test('testando button de config', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnConfig = screen.getByTestId(config);

        userEvent.click(btnConfig);

        expect(history.location.pathname).toBe('/settings');
    })
})