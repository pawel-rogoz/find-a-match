import { render, screen } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import CodeDrawer from './../CodeDrawer'
import { useDisclosure } from '@chakra-ui/react'

const mockData = {
    match_code: '000000'
}

describe('CodeDrawer', () => {
    it('match_code is rendered correctly', () => {
        render(
            <CodeDrawer isOpen={true} onClose={() => {}} btnRef={null} data={mockData} />
        )
    
        expect(screen.getByText('000000')).toBeInTheDocument()
    })
    
    it('header is rendered correctly', () => {
        render(
            <CodeDrawer isOpen={true} onClose={() => {}} btnRef={null} data={mockData} />
        )
    
        expect(screen.getByText('MATCH CODE')).toBeInTheDocument()
    })
    
    it('drawer is visible when isOpen eqault to true', () => {
        render(
            <CodeDrawer isOpen={true} onClose={() => {}} btnRef={null} data={mockData} />
        )
    
        expect(screen.getByTestId('show-code')).toBeVisible()
    })
    
    it('drawer is not displayed when isOpen equals to false', () => {
        render(
            <CodeDrawer isOpen={false} onClose={() => {}} btnRef={null} data={mockData} />
        )
    
        expect(screen.queryByText('MATCH CODE')).not.toBeInTheDocument()
    })
})


// it('onOpen and onClose tests', () => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     console.log('dupa')
//     const mockData = {
//         match_code: '000000'
//     }
    
//     render(
//         <CodeDrawer isOpen={isOpen} onClose={onClose} btnRef={null} data={mockData} />
//     )

//     onClose()
//     expect(screen.queryByText('MATCH CODE')).not.toBeInTheDocument()
//     expect(screen.queryByText('000000')).not.toBeInTheDocument()

//     onOpen()
//     expect(screen.queryByText('MATCH CODE')).not.toBeInTheDocument()
//     expect(screen.queryByText('000000')).not.toBeInTheDocument()
// })
