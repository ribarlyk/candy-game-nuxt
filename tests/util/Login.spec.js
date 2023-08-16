import Login from '../../src/components/Login.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import setupRouter from '../../utils/routerSetup';

const { router } = setupRouter();

describe('Login.vue', () => {
    let wrapper
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(Login, {
            global: {
                plugins: [router],
            },
        })
    })

    it('render the component ', () => {
        const component = wrapper.find('.container').exists()
        expect(component).toBe(true)
    })

    it('render form fields', () => {
        const element = wrapper.findAll('.group')
        expect(element.length).toEqual(2)
    })

    it('login input', async () => {
        const element = wrapper.find('#userLogin')
        await element.setValue('testemail')
        expect(element.element.value).toBe('testemail')
    })
    it('password input', async () => {
        const element = wrapper.find('#passLogin')
        await element.setValue('testpass')
        expect(element.element.value).toBe('testpass')
    })
    it('submit button', async () => {
        await wrapper.find('button').trigger('submit')
        expect(wrapper.emitted()).toHaveProperty('submit')
    })
    // it('emits the input ', async () => {

    //     await wrapper.find('#userLogin').setValue('testemail')
    //     // await wrapper.find('#passLogin').setValue('testpass')

    //     await wrapper.find('form').trigger('submit')

    //     expect(wrapper.emitted('submit')[0][0]).toBe('testemail')
    //     // expect(wrapper.emitted('submit')[0][1]).toBe('testpass')
    // })
    it('footer render', () => {
        const element = wrapper.find('p')
        expect(element.text()).toContain(`Don't have an account ? Register here .`)
    })
})