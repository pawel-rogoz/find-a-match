import { render, screen, fireEvent} from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import EntryCodeDrawer from '../EntryCodeDrawer'

describe('EntryCodeDrawer', () => {
    it('should change value of input on change', () => {
        render(<EntryCodeDrawer
            isOpen={true}
            onClose={() => {}}
            btnRef={null}
            data={{match_code: '000000'}}
            matchId='82'
        />)
        const inputElement = screen.getByPlaceholderText(/0{6}/)
        fireEvent.change(inputElement, { target: { value: "999999"}})
        expect(inputElement.value).toBe("999999")
    })
})