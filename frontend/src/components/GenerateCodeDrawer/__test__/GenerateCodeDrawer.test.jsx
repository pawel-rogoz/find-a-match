import { render, screen, fireEvent} from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import GenerateCodeDrawer from '../GenerateCodeDrawer'
import { BrowserRouter } from 'react-router-dom'

const MockGenerateCodeDrawer = () => {
    return (
        <BrowserRouter>
            <GenerateCodeDrawer isOpen={true} onClose={() => {}} btnRef={null} matchId={1} />
        </BrowserRouter>
    )
}

describe('GenerateCodeDrawer', () => {
    it('Generate the code button is displayed after clicking on YES', () => {
        render(<MockGenerateCodeDrawer />)

        const buttonElement = screen.getByText('YES')
        fireEvent.click(buttonElement)
        expect(screen.getByRole('button', { name: 'Generate the code' })).toBeInTheDocument()
    })

    it('Alert is displayed after clicking NO button', () => {
        render(<MockGenerateCodeDrawer />)

        const buttonElement = screen.getByText('NO')
        fireEvent.click(buttonElement)
        expect(screen.getByTestId('alert')).toBeInTheDocument()
    })

    it('Code is displayed after clicking the generate button', () => {
        render(<MockGenerateCodeDrawer />)

        const buttonElement = screen.getByText('YES')
        fireEvent.click(buttonElement)
        const generateButton = screen.getByRole('button', { name: 'Generate the code' })
        fireEvent.click(generateButton)
        expect(screen.getByTestId('code')).toBeInTheDocument()
    })
})