import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import NavigationVue from "../../src/components/Navigation.vue"
import setupRouter from '../../utils/routerSetup';
import { useUserStore } from '../../src/stores/UserStore';

const { router } = setupRouter()

describe('Navigation.vue', () => {
    let wrapper
    let store
    console.log(NavigationVue)
    beforeEach(() => {
        wrapper = shallowMount(NavigationVue, {
            global: {
                plugin: [createTestingPinia(), router]
            }
        })
        store = useUserStore()
    })

    it('to render auth container', () => {
        const authContainer = wrapper.find('.auth-container')
        expect(authContainer.exists()).toBe(true)
    })
    it('to not render user container', () => {
        // store.token = 'asdff'
        // await localVue.nextTick()
        const userContainer = wrapper.find('.user-container')
        expect(userContainer.exists()).toBe(false)
    })
})