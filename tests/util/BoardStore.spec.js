import fetchMock from 'jest-fetch-mock';
import { setActivePinia, createPinia } from 'pinia'
import { useBoardStore } from '../../src/stores/BoardStore';
import { createTestingPinia } from '@pinia/testing';
fetchMock.enableMocks();

let store

describe('BoardStore.spec.js', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        store = useBoardStore()

    })


    it('test getBoard fetch', async () => {
        const mockBoard = {
            board: [{ color: 'test' }]
        }

        fetchMock.mockOnce(JSON.stringify(mockBoard))
        const result = await useBoardStore().getBoard()

        // expect(result).toEqual(mockBoard);
        expect(useBoardStore().board).toEqual(mockBoard.board)
    })

    it('test writeMoves fetch', async () => {
        const username = 'testuser'
        const movesCounter = 9
        const x = 'testuser'
        const y = 'testuser'
        const line = []

        const mockData = 'writed'

        fetchMock.mockOnce(JSON.stringify(mockData))
        const result = await useBoardStore().writeMoves(username, movesCounter, x, y, line)

        expect(result).toBe(mockData)
    })

    it('test checkLine fn', () => {
        const mockBoard = [{ color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }, { color: 'blue' }]
        const mockFn = jest.fn(store.checkLine(mockBoard, 1));


    })

})