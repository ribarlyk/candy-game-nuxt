import BaseButton from '../../src/components/BaseButton.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import setupRouter from '../../utils/routerSetup';

const { router } = setupRouter()


// describe('ErrorPage.vue', () => {
    let wrapper
    
    beforeEach(() => {
        // setActivePinia(createPinia())
        wrapper = mount(BaseButton, {
            props: {
                type: {
                    color: 
                        'red'
                }
            }
            // global: {
            //     plugin: [router]

            // }
        })
    })
    // it('render button', () => {
    //     const element = wrapper.find('button')
    //     expect(element.exists()).toBe(true)
    // })
    it('render slot wrapper', () => {
        const element = wrapper.find('button')
        expect(element.exists()).toBe(true)
        expect(element.classes('red')).toBe(true)
    })
// })