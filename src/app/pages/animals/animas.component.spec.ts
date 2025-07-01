import { AnimalsComponent } from './animals.component';

describe('AnimalsComponent', () => {
  it('se instancia y tiene datos estáticos', () => {
    const c = new AnimalsComponent();
    expect(c).toBeTruthy();
    expect((c as any).animals?.length ?? 0).toBeGreaterThan(0);
  });
});
