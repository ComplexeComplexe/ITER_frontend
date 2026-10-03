import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import ToolsExplorer from '../ToolsExplorer';
import { getToolDirectory, TOOL_CATEGORY_LABELS } from '@/data/toolDirectory';
vi.mock('@/lib/analytics/consent', () => ({ currentConsent: () => ({ analytics: true }) }));
afterEach(() => { cleanup(); window.dataLayer = []; });
describe('tool discovery without indexable filter combinations', () => {
  it('renders every published review before interaction and filters cash synonyms without changing the URL', () => {
    render(<ToolsExplorer tools={getToolDirectory('fr')} categories={TOOL_CATEGORY_LABELS.fr} locale="fr" />);
    expect(screen.getAllByRole('link')).toHaveLength(20);
    const before = window.location.href;
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'cash' } });
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(window.location.href).toBe(before);
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser' }));
    expect(screen.getAllByRole('link')).toHaveLength(20);
  });
  it('announces empty results and never sends search text into analytics', () => {
    render(<ToolsExplorer tools={getToolDirectory('fr')} categories={TOOL_CATEGORY_LABELS.fr} locale="fr" />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'private@example.com' } });
    fireEvent.blur(input);
    expect(screen.getByRole('status')).toHaveTextContent('0 fiches');
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(JSON.stringify(window.dataLayer)).not.toContain('private@example.com');
    expect(window.dataLayer).toEqual([{ event: 'tools_explorer', action: 'search', value: 'non-empty' }]);
  });
});
