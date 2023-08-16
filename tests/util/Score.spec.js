import {  mount } from '@vue/test-utils';
import setupRouter from '../../utils/routerSetup';
import Score from '../../src/components/Score.vue';
import { createTestingPinia } from '@pinia/testing'
import { useScoresStore } from '../../src/stores/ScoresStore';

const { router } = setupRouter()

describe('Score.vue', () => {
    let wrapper
    let store
    beforeEach(() => {

        wrapper = mount(Score, {
            global: {
                plugin: [createTestingPinia(), router]

            }
        })
        store = useScoresStore()
    })
    it('render table should be not visible', () => {
        const element = wrapper.find('.table-container')
        expect(element.exists()).toBe(false)
    })

    it('render spinner should be visible', () => {
        const element = wrapper.find('.spinner-container')
        expect(element.exists()).toBe(true)
    })

    it('render table elements should be visible', async () => {
        store.scores = {
            message: 'Points received', result: [{
                _id: "64c3870c3121a4efcb36d2df356",
                date: "28-7-2023 12:15",
                points: 344,
                username: "Pavel"
            }, {
                _id: "64c3870c1a4efcb36d2df356",
                date: "28-7-2023 12:14",
                points: 3454,
                username: "Pavel"
            }]
        }

        await store.getResult()

        expect(store.getResult).toHaveBeenCalledTimes(2)

        const element = wrapper.find('.table-container')
        expect(element.exists()).toBe(true)

        const spinner = wrapper.find('.spinner-container')
        expect(spinner.exists()).toBe(false)

        const header = wrapper.get('h1')
        expect(header.text()).toContain('Games History')

        const th = wrapper.findAll('th')
        expect(th.length).toBe(3)

        const td = wrapper.findAll('td')
        expect(td.length).toBe(6)

        expect(td[0].text()).toContain("28-7-2023 12:15")
        expect(td[1].text()).toContain("Pavel")
        expect(td[2].text()).toContain("344")

    })


})