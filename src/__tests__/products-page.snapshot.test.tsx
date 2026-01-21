import { render, screen } from '@testing-library/react';
import Home from '../../app/page';
import { seedProducts } from '@/mocks/seed';

describe('Tela de produtos (snapshot)', () => {
  it('renderiza a lista inicial', async () => {
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: seedProducts }),
      } as unknown as Response);

    render(<Home />);

    // aguarda carregar itens vindos do MSW
    await screen.findByText('Webcam Full HD');

    // Snapshot menos frágil: valida apenas a lista de títulos visíveis.
    // Assim, mudanças de layout/Tailwind não quebram o teste.
    const productTitles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent?.trim())
      .filter(Boolean);

    expect(productTitles).toMatchSnapshot();

    fetchSpy.mockRestore();
  });
});
