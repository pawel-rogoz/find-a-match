import { render, screen, fireEvent} from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import DateDrawer from '../DateDrawer'

describe('DateDrawer', () => {
    it('DateMin should be rendered as a value for first input', () => {
        render(<DateDrawer
            isOpen={true}
            onClose={() => {}}
            btnRef={null}
            dateMin={new Date('2024-02-28T00:00:00.000Z')}
            setDateMin={() => {}}
            dateMax={new Date('2024-03-01T23:59:59.999Z')}
            setDateMax={() => {}}
            setIsFirstRender={() => {}}
        />)

        expect(screen.getByDisplayValue('2024-02-28')).toBeInTheDocument()
    })

    it('DateMax should be rendered as a value for second input', () => {
        render(<DateDrawer
            isOpen={true}
            onClose={() => {}}
            btnRef={null}
            dateMin={new Date('2024-02-28T00:00:00.000Z')}
            setDateMin={() => {}}
            dateMax={new Date('2024-03-01T22:59:59.000Z')}
            setDateMax={() => {}}
            setIsFirstRender={() => {}}
        />)

        expect(screen.getByDisplayValue('2024-03-01')).toBeInTheDocument()
    })
})