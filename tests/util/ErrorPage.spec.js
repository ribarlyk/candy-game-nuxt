import ErrorPage from '../../src/components/ErrorPage.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import setupRouter from '../../utils/routerSetup';

const { router } = setupRouter()


describe('ErrorPage.vue', () => {
    let wrapper
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(ErrorPage, {
            global: {
                plugin: [router]

            }
        })
    })
    it('render error container', () => {
        const element = wrapper.find('.error-container')
        expect(element.exists()).toBe(true)
    })
})