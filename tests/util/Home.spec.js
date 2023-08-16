import Home from '../../src/components/Home.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import setupRouter from '../../utils/routerSetup';

const { router } = setupRouter()


describe('Home.vue', () => {
    let wrapper
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(Home, {
            global: {
                plugin: [router]

            }
        })
    })
    it('render home container', () => {
        const element = wrapper.find('.home-container')
        expect(element.exists()).toBe(true)
    })
})