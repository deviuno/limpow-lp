import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import WriterVirtual from './WriterVirtual';
import { getWriterProfiles, generateTitles } from '../../lib/writerVirtual';
import { supabase } from '../../lib/supabase';

// Mock dependencies
vi.mock('../../lib/writerVirtual', () => ({
  getWriterProfiles: vi.fn(),
  generateTitles: vi.fn(),
  createArticle: vi.fn(),
  generateArticleContent: vi.fn(),
  createWriterProfile: vi.fn(),
  updateWriterProfile: vi.fn()
}));

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: mockCategories, error: null }))
      }))
    }))
  }
}));

// Mock data
const mockWriters = [
  {
    id: '1',
    name: 'Especialista Financeiro',
    expertise: ['finanças pessoais', 'investimentos'],
    style: 'formal',
    tone: 'profissional',
    typical_phrases: ['É fundamental compreender que...']
  }
];

const mockCategories = [
  { id: '1', name: 'Finanças Pessoais' },
  { id: '2', name: 'Investimentos' }
];

const mockTitles = [
  'Como limpar seu nome em 2024',
  '5 dicas para investir melhor',
  'Guia completo de finanças pessoais'
];

// Test setup
const renderComponent = () => {
  return render(
    <BrowserRouter>
      <WriterVirtual />
    </BrowserRouter>
  );
};

describe('WriterVirtual Component', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup default mock implementations
    getWriterProfiles.mockResolvedValue({ data: mockWriters, error: null });
    supabase.from().select().order.mockResolvedValue({ data: mockCategories, error: null });
    generateTitles.mockResolvedValue(mockTitles);
  });

  it('renders loading state initially', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders writers list after loading', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('Especialista Financeiro')).toBeInTheDocument();
    });
    
    expect(screen.getByText('finanças pessoais, investimentos')).toBeInTheDocument();
  });

  it('opens writer form when clicking "Novo Escritor"', async () => {
    renderComponent();
    
    await waitFor(() => {
      const button = screen.getByText('Novo Escritor');
      fireEvent.click(button);
    });
    
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Expertise')).toBeInTheDocument();
  });

  it('generates titles when using title generator', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Escritor Virtual')).toBeInTheDocument();
    });
    
    // Open title generator
    const generateButton = screen.getByText('Gerar');
    await user.click(generateButton);
    
    // Generate titles
    const generateTitlesButton = screen.getByText('Gerar', { selector: 'button' });
    await user.click(generateTitlesButton);
    
    // Verify titles are displayed
    await waitFor(() => {
      mockTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  it('allows selecting a writer', async () => {
    renderComponent();
    
    await waitFor(() => {
      const writerCard = screen.getByText('Especialista Financeiro').closest('div');
      fireEvent.click(writerCard);
    });
    
    // Verify writer is selected (check for visual feedback)
    const writerCard = screen.getByText('Especialista Financeiro').closest('div');
    expect(writerCard).toHaveClass('border-[#11CD80]');
  });

  it('shows error message when API call fails', async () => {
    // Mock API error
    getWriterProfiles.mockRejectedValue(new Error('Failed to load writers'));
    
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load writers')).toBeInTheDocument();
    });
  });

  it('validates required fields before generating article', async () => {
    renderComponent();
    
    await waitFor(() => {
      const generateButton = screen.getByText('Gerar Artigo');
      expect(generateButton).toBeDisabled();
    });
    
    // Add title
    const titleInput = screen.getByPlaceholderText('Para gerar mais de um artigo coloque os títulos um por linha');
    fireEvent.change(titleInput, { target: { value: 'Test Article' } });
    
    // Should still be disabled without writer selection
    expect(screen.getByText('Gerar Artigo')).toBeDisabled();
  });
});