import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

import App from "../App"
import Game from '../pages/Game';
import Header from '../pages/Header';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"

describe('Testar elementos da pagina Game', () => {
    test('Verificar se elementos estão renderizando', () => {
        renderWithRouterAndRedux(<Header />);

        const profilePicture = screen.getByTestId("header-profile-picture");
        const playerName = screen.getByTestId("header-player-name");
        const headerScore = screen.getByTestId("header-score");

        expect(profilePicture).toBeInTheDocument();
        expect(playerName).toBeInTheDocument();
        expect(headerScore).toBeInTheDocument();
    });

    test('Verificar se elementos estão renderizando', async () => {
        renderWithRouterAndRedux(<Game />);

        const questionText = screen.getByTestId("question-text");
        const responseOption = screen.getByTestId("answer-options");
        const right = screen.getByTestId("correct-answer");
        const wrong = screen.getByTestId("wrong-answer");
        // const nextButton = screen.getByTestId("btn-next");

        expect(questionText).toBeInTheDocument();
        expect(responseOption).toBeInTheDocument();
        expect(right).toBeInTheDocument();
        expect(wrong).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    })
})