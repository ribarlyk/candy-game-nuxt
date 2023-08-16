import fetchMock from 'jest-fetch-mock';
import { setActivePinia, createPinia } from 'pinia'
import { useScoresStore } from '../../src/stores/ScoresStore';


fetchMock.enableMocks();


describe('ScoresStore.ts', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('test saveResult fetch', async () => {
        const data = '12.02.2023'
        const points = 100
        const token = 'testtoken'
        const mockData = {
            data,
            points,
            token
        }
        fetchMock.mockOnce(JSON.stringify(mockData))
        const result = await useScoresStore().saveResult(data, points, token)

        expect(result).toEqual(mockData)
    })

    it('test getResult fetch', async () => {
        const token = 'testtoken'
        const host = "http://localhost:3000/"
        const mockData = 'testscore'

        fetchMock.mockOnce(JSON.stringify(mockData))
        const result = await useScoresStore().getResult(token)

        expect(result).toEqual(mockData)
        expect(useScoresStore().host).toBe(host)
        expect(useScoresStore().scores).toBe(mockData)
    })
})