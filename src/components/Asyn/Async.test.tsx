import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { Async } from '.';

describe('Exemplo para componentes com comportamentos assíncronos', () => {
  it('it render correctly', async () => {
    render(<Async />)
    expect(screen.getByText('Hello World')).toBeInTheDocument();

    // Playground com sugestões de como fazer testes
    //screen.logTestingPlaygroundURL()

    //Esperando elemento ser removido
    await waitForElementToBeRemoved(screen.queryByText('Botão 2'), {
      timeout: 3000
    })

    //Ajuste para esperar algo acontecer em tela
    await waitFor(() => {
      return expect(screen.getByText('Botão 1')).toBeInTheDocument()
    }, { timeout: 3000 })
  }, 5000)
})