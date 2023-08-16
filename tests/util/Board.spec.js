import { mount, createLocalVue } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import Board from '../../src/components/Board.vue';
import setupRouter from '../../utils/routerSetup';

const { router } = setupRouter();
const localVue = createLocalVue()

describe('Board.vue', () => {
    let wrapper

    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(Board, {
            global: {
                plugins: [router],
            },
            slots: {
                default: 'Main Content'
            },
            localVue
        });
    })
    it('test welcome msg', () => {
        expect(wrapper.text()).toContain("Welcome Start Game")
    })

    it('render points false', () => {
        expect(wrapper.find('.points').exists()).toBe(false)
    })

    it('render board false', () => {
        expect(wrapper.find('.board').exists()).toBe(false)
    })

    it('trigger button renders board', async () => {
        await wrapper.find('.start-button').trigger('click')
        expect(wrapper.get('.board').exists()).toBe(true)
    })

    it('render points paragraph', async () => {
        await wrapper.find('.start-button').trigger('click')
        expect(wrapper.text()).toContain('Welcome Points: 0')
    })

    // it('starts the game', async () => {
        // await wrapper.find('.start-button').trigger('click')

        // wrapper.vm.emit('asd')
        // await localVue.nextTick()
    // })

})
