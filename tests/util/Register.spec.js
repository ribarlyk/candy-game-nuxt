import Register from '../../src/components/Register.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import setupRouter from '../../utils/routerSetup';

const { router } = setupRouter();

describe('Login.vue', () => {
    let wrapper
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(Register, {
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
        expect(element.length).toEqual(3)
    })

    it('login input', async () => {
        const element = wrapper.find('#register')
        await element.setValue('testemail')
        expect(element.element.value).toBe('testemail')
    })
    it('password input', async () => {
        const element = wrapper.find('#pass')
        await element.setValue('testpass')
        expect(element.element.value).toBe('testpass')
    })
    it('password input', async () => {
        const element = wrapper.find('#repass')
        await element.setValue('testrepass')
        expect(element.element.value).toBe('testrepass')
    })
   
    it('footer render', () => {
        const element = wrapper.find('p')
        expect(element.text()).toContain(`Already have an account ? Login here .`)
    })
})