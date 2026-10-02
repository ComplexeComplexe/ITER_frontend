import { describe, expect, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ToolCard from '../ToolCard';

describe('tool card navigation', () => {
  it('has one navigable target without a category anchor nested inside it', () => {
    const { container } = render(<ToolCard name="Pennylane" slug="pennylane" logo="" category="Comptabilité" categorySlug="logiciels-comptabilite" shortDescription="Un logiciel de comptabilité." phase={1} />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/ressources/outils/pennylane');
    expect(container.querySelector('a a')).toBeNull();
    expect(screen.getByText('Comptabilité')).toBeInTheDocument();
    cleanup();
  });
});
