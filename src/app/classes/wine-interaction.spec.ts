import { WineInteraction } from './wine-interaction';

describe('WineInteraction', () => {
  it('should create an instance', () => {
    expect(new WineInteraction(1, "2022-03-01", "Vila Real", "Fermentação", 20, 80, "Outro", "José das couves", [{name: "Açúcar", quantity: 200}])).toBeTruthy();
  });
});
