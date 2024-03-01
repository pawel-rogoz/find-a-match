import { render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { it, expect, describe } from 'vitest'
import MatchButton from '../MatchButton'

const MockMatchButton = ({ date, data, players, setPlayers, userData, matchId }) => {
    return (
        <BrowserRouter>
            <MatchButton
                date={date}
                data={data}
                players={players}
                setPlayers={setPlayers}
                userData={userData}
                matchId={matchId}
            />
        </BrowserRouter>
    )
}

describe('MatchButton', () => {
    describe('Match has finished', () => {
        it('\'This match has finished\' button should be generated if user is not involved in match', () => {
            const mockData = {
                date: new Date('2024-03-01T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-02-28T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: null
                },
                players: [{completed: null, user_id: 1, user_name: "Jake"}],
                setPlayers: () => {},
                userData: { name: null, id: null},
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            )
            const buttonElement = screen.getByRole('button', { name: 'This match has finished' })
            expect(buttonElement).toBeInTheDocument()
        })

        it('\'Generate match code\' button should be generated if user is host and match_code is null', () => {
            const mockData = {
                date: new Date('2024-03-01T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-02-28T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: null
                },
                players: [{completed: null, user_id: 1, user_name: "Jake"}],
                setPlayers: () => {},
                userData: { name: 'Jake', id: 1},
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            ) 

            const buttonElement = screen.getByRole('button', { name: 'Generate match code' })
            expect(buttonElement).toBeInTheDocument()
        })

        it('\'See the match code\' button should be generated if user is host and match_code is not null', () => {
            const mockData = {
                date: new Date('2024-03-01T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-02-28T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: '000000'
                },
                players: [{completed: null, user_id: 1, user_name: "Jake"}],
                setPlayers: () => {},
                userData: { name: 'Jake', id: 1},
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            ) 

            const buttonElement = screen.getByRole('button', { name: 'See the match code' })
            expect(buttonElement).toBeInTheDocument()
        })

        it('\'We are waiting for host to generate the code\' button should be generated if user is not host, but took part in the match and match_code is null', () => {
            const mockData = {
                date: new Date('2024-03-01T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-02-28T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: null
                },
                players: [{ completed: null, user_id: 1, user_name: "Jake" }, { completed: null, user_id: 2, user_name: 'Steve' }],
                setPlayers: () => {},
                userData: { name: 'Steve', id: 2 },
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            ) 

            const buttonElement = screen.getByRole('button', { name: 'We are waiting for host to generate the code' })
            expect(buttonElement).toBeInTheDocument()
        })

        it('\'Entry match code\' button should be generated if user is not host, but took part in the match and match_code is not null', () => {
            const mockData = {
                date: new Date('2024-03-01T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-02-28T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: '000000'
                },
                players: [{ completed: null, user_id: 1, user_name: "Jake" }, { completed: null, user_id: 2, user_name: 'Steve' }],
                setPlayers: () => {},
                userData: { name: 'Steve', id: 2 },
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            ) 

            const buttonElement = screen.getByRole('button', { name: 'Entry match code' })
            expect(buttonElement).toBeInTheDocument()
            fireEvent.click(buttonElement)
            expect(screen.getByText('ENTRY MATCH CODE')).toBeInTheDocument()
            expect(screen.getByTestId('entry-code')).toBeInTheDocument()
        })
    })

    describe('Match is in the future', () => {
        it('\'Join match\' button should be generated if user is not involved in match', () => {
            const mockData = {
                date: new Date('2024-02-28T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-03-01T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: null
                },
                players: [{completed: null, user_id: 1, user_name: "Jake"}],
                setPlayers: () => {},
                userData: { name: 'Steve', id: 2},
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            )
            const buttonElement = screen.getByRole('button', { name: 'Join match' })
            expect(buttonElement).toBeInTheDocument()
        })

        it('\'Leave match\' button should be generated if user is involved in match', () => {
            const mockData = {
                date: new Date('2024-02-28T00:00:00.000Z'),
                data: {
                    match_date: new Date('2024-03-01T00:00:00.000Z'),
                    num_players: 10,
                    host_id: 1,
                    match_code: null
                },
                players: [{ completed: null, user_id: 1, user_name: "Jake" }, { completed: null, user_id: 2, user_name: "Steve" }],
                setPlayers: () => {},
                userData: { name: 'Steve', id: 2},
                matchId: 1
            }

            render(
                <MockMatchButton
                    date={mockData.date}
                    data={mockData.data}
                    players={mockData.players}
                    setPlayers={mockData.setPlayers}
                    userData={mockData.userData}
                    matchId={mockData.matchId}
                />
            )
            const buttonElement = screen.getByRole('button', { name: 'Leave match' })
            expect(buttonElement).toBeInTheDocument()
        })
    })

    describe('Integration with drawers tests', () => {
        describe('Match was in the past', () => {
            it('After click on \'Entry match code\' button EntryCodeDrawer should be opened', () => {
                const mockData = {
                    date: new Date('2024-03-01T00:00:00.000Z'),
                    data: {
                        match_date: new Date('2024-02-28T00:00:00.000Z'),
                        num_players: 10,
                        host_id: 1,
                        match_code: '000000'
                    },
                    players: [{ completed: null, user_id: 1, user_name: "Jake" }, { completed: null, user_id: 2, user_name: 'Steve' }],
                    setPlayers: () => {},
                    userData: { name: 'Steve', id: 2 },
                    matchId: 1
                }
    
                render(
                    <MockMatchButton
                        date={mockData.date}
                        data={mockData.data}
                        players={mockData.players}
                        setPlayers={mockData.setPlayers}
                        userData={mockData.userData}
                        matchId={mockData.matchId}
                    />
                ) 
    
                const buttonElement = screen.getByRole('button', { name: 'Entry match code' })
                fireEvent.click(buttonElement)
                expect(screen.getByTestId('entry-code')).toBeInTheDocument()
            })

            it('After click on \'See the match code\' button CodeDrawer should be opened', () => {
                const mockData = {
                    date: new Date('2024-03-01T00:00:00.000Z'),
                    data: {
                        match_date: new Date('2024-02-28T00:00:00.000Z'),
                        num_players: 10,
                        host_id: 1,
                        match_code: '000000'
                    },
                    players: [{completed: null, user_id: 1, user_name: "Jake"}],
                    setPlayers: () => {},
                    userData: { name: 'Jake', id: 1},
                    matchId: 1
                }
    
                render(
                    <MockMatchButton
                        date={mockData.date}
                        data={mockData.data}
                        players={mockData.players}
                        setPlayers={mockData.setPlayers}
                        userData={mockData.userData}
                        matchId={mockData.matchId}
                    />
                ) 
    
                const buttonElement = screen.getByRole('button', { name: 'See the match code' })
                fireEvent.click(buttonElement)
                expect(screen.getByTestId('show-code')).toBeInTheDocument()
            })

            it('After click on \'Generate match code\' button GenerateCodeDrawer should be opened', () => {
                const mockData = {
                    date: new Date('2024-03-01T00:00:00.000Z'),
                    data: {
                        match_date: new Date('2024-02-28T00:00:00.000Z'),
                        num_players: 10,
                        host_id: 1,
                        match_code: null
                    },
                    players: [{completed: null, user_id: 1, user_name: "Jake"}],
                    setPlayers: () => {},
                    userData: { name: 'Jake', id: 1},
                    matchId: 1
                }
    
                render(
                    <MockMatchButton
                        date={mockData.date}
                        data={mockData.data}
                        players={mockData.players}
                        setPlayers={mockData.setPlayers}
                        userData={mockData.userData}
                        matchId={mockData.matchId}
                    />
                ) 
    
                const buttonElement = screen.getByRole('button', { name: 'Generate match code' })
                fireEvent.click(buttonElement)
                expect(screen.getByTestId('generate-code')).toBeInTheDocument()
            })
        })
    })
})