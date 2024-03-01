import { render, screen, fireEvent} from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import Match from '../Match'
import { BrowserRouter } from 'react-router-dom'

const MockMatch = () => {
    return (
        <BrowserRouter>
            <Match
                match={{
                    match_name: 'Mecz',
                    match_date: '2024-02-28T10:00:00.000Z',
                    curr_num_players: 10,
                    num_players: 12
                }}
                width={100}
                showDate={true}
            />
        </BrowserRouter>
    )
}

const MockMatchWithoutDate = () => {
    return (
        <BrowserRouter>
            <Match
                match={{
                    match_name: 'Mecz',
                    match_date: '2024-02-28T10:00:00.000Z',
                    curr_num_players: 10,
                    num_players: 12
                }}
                width={100}
                showDate={false}
            />
        </BrowserRouter>
    )
}

describe('Match', () => {
    it('should have heading with match_name', () => {
        render(<MockMatch />)

        expect(screen.getByText('Mecz')).toBeInTheDocument()
    })

    it('should have match_date info', () => {
        render(<MockMatch />)

        expect(screen.getByText('28.02.2024')).toBeInTheDocument()
    })

    it('should have match_date hour info', () => {
        render(<MockMatch />)

        expect(screen.getByText('11:00')).toBeInTheDocument()
    })

    it('should have players info', () => {
        render(<MockMatch />)

        expect(screen.getByText('10 / 12')).toBeInTheDocument()
    })

    it('should not have match_date info is showDate quals to false', () => {
        render(<MockMatchWithoutDate />)

        expect(screen.queryByText('28.02.2024')).not.toBeInTheDocument()
    })
})