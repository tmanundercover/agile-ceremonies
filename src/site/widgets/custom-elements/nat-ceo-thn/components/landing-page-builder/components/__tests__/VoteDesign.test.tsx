import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {VoteDesign} from '../VoteDesign';

describe('VoteDesign', () => {
    const mockOnVote = jest.fn();

    beforeEach(() => {
        mockOnVote.mockClear();
    });

    it('renders all vote buttons', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        expect(screen.getByTestId('vote-up')).toBeInTheDocument();
        expect(screen.getByTestId('vote-meh')).toBeInTheDocument();
        expect(screen.getByTestId('vote-down')).toBeInTheDocument();
    });

    it('calls onVote with correct vote type when buttons are clicked', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        fireEvent.click(screen.getByTestId('vote-up'));
        expect(mockOnVote).toHaveBeenCalledWith('up');

        fireEvent.click(screen.getByTestId('vote-meh'));
        expect(mockOnVote).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByTestId('vote-down'));
        expect(mockOnVote).toHaveBeenCalledTimes(1);
        expect(mockOnVote).not.toHaveBeenCalledWith(null);

        fireEvent.click(screen.getByTestId('vote-up'));
        expect(mockOnVote).toHaveBeenCalledWith(null);

        const buttons = ['vote-up', 'vote-meh', 'vote-down'].map(
            testId => screen.getByTestId(testId)
        );

        buttons.forEach(button => {
            expect(button).toBeEnabled();
        });

        expect(mockOnVote).toHaveBeenCalledTimes(2);
    });

    it('disables other buttons when up vote is selected', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        fireEvent.click(screen.getByTestId('vote-up'));

        expect(screen.getByTestId('vote-up')).toBeEnabled();
        expect(screen.getByTestId('vote-meh')).toBeDisabled();
        expect(screen.getByTestId('vote-down')).toBeDisabled();
        expect(mockOnVote).toHaveBeenCalledWith('up');
    });

    it('disables other buttons when meh vote is selected', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        fireEvent.click(screen.getByTestId('vote-meh'));

        expect(screen.getByTestId('vote-up')).toBeDisabled();
        expect(screen.getByTestId('vote-meh')).toBeEnabled();
        expect(screen.getByTestId('vote-down')).toBeDisabled();
        expect(mockOnVote).toHaveBeenCalledWith('meh');
    });

    it('disables other buttons when down vote is selected', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        fireEvent.click(screen.getByTestId('vote-down'));

        expect(screen.getByTestId('vote-up')).toBeDisabled();
        expect(screen.getByTestId('vote-meh')).toBeDisabled();
        expect(screen.getByTestId('vote-down')).toBeEnabled();
        expect(mockOnVote).toHaveBeenCalledWith('down');
    });

    it('enables all buttons when no vote is selected', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        expect(screen.getByTestId('vote-up')).toBeEnabled();
        expect(screen.getByTestId('vote-meh')).toBeEnabled();
        expect(screen.getByTestId('vote-down')).toBeEnabled();
    });

    it('displays correct labels for each button', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        expect(screen.getByText('Love it!')).toBeInTheDocument();
        expect(screen.getByText('Meh...')).toBeInTheDocument();
        expect(screen.getByText('Nope')).toBeInTheDocument();
    });

    it('applies correct styles based on vote type', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        const upButton = screen.getByTestId('vote-up');
        const mehButton = screen.getByTestId('vote-meh');
        const downButton = screen.getByTestId('vote-down');

        expect(upButton).toHaveStyle({color: '#22C55E'});
        expect(mehButton).toHaveStyle({color: '#94A3B8'});
        expect(downButton).toHaveStyle({color: '#EF4444'});
    });

    it('renders with provided data-testid', () => {
        const testId = 'custom-vote-design';
        render(<VoteDesign onVote={mockOnVote} data-testid={testId}/>);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });


    it('maintains proper hover styles for interactive elements', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        const voteButtons = ['vote-up', 'vote-meh', 'vote-down'].map(
            testId => screen.getByTestId(testId)
        );

        voteButtons.forEach(button => {
            expect(button).toHaveStyle({transition: 'transform 0.2s'});
            expect(getComputedStyle(button).cursor).toBe('pointer');
        });
    });

    it('displays thank you message after voting', () => {
        render(<VoteDesign onVote={mockOnVote} data-testid="vote-design"/>);

        // Message should not be visible initially
        expect(screen.queryByText('Thank you for your feedback!')).not.toBeInTheDocument();

        // Test with each vote type
        const voteTypes = ['vote-up', 'vote-meh', 'vote-down'];

        voteTypes.forEach((voteType) => {
            // Click vote button
            fireEvent.click(screen.getByTestId(voteType));
            expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();

            // Click again to deselect
            fireEvent.click(screen.getByTestId(voteType));
            expect(screen.queryByText('Thank you for your feedback!')).not.toBeInTheDocument();
        });
    });
});
