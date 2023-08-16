import { createTestingPinia } from '@pinia/testing'
import fetchMock from 'jest-fetch-mock';
import Login from '../../src/components/Login.vue';
import { mount } from '@vue/test-utils';
import setupRouter from '../../utils/routerSetup';
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../src/stores/UserStore';

const { router } = setupRouter();

const wrapper = mount(Login, {
    global: {
        plugins: [createTestingPinia(), router],
    },
});

fetchMock.enableMocks();
const store = useUserStore()


describe('UserStore.ts', () => {
    beforeEach(() => {

        setActivePinia(createPinia())
    })

    it('username to be empty string', () => {
        expect(store.username).toBe('')
    })

    it('token to be empty string', () => {

        expect(store.token).toBe('')
    })

    it('host to be http://localhost:3000/', () => {

        expect(store.host).toBe('http://localhost:3000/')
    })
});

describe('useUserStore actions', () => {
    beforeEach(() => {
        useUserStore().$reset();
    });

    it('should log in user successfully', async () => {
        const username = 'testuser';
        const password = 'testpassword';
        const mockUser = {
            username: 'testuser',
            token: 'mockedtoken',
            points: 100,
        };

        fetchMock.mockOnce(JSON.stringify(mockUser));
        const result = await useUserStore().loginUser(username, password);

        expect(result).toEqual(mockUser);
        expect(useUserStore().username).toEqual(mockUser.username);
        expect(useUserStore().token).toEqual(mockUser.token);
        expect(localStorage.getItem('userToken')).toEqual(mockUser.token);
    });
    it('should register user succesfully', async () => {
        const username = 'test'
        const pass = 'test123'
        const repass = 'test123'
        const mockRespond = {
            message: 'Success'
        }

        fetchMock.mockOnce(JSON.stringify(mockRespond))
        const result = await useUserStore().registerUser(username, pass, repass)
        expect(result).toEqual(mockRespond)

    })
    it('should logout user succesfully', async () => {

        const host = "http://localhost:3000/"
        const mockRespond = {
            message: 'Success'
        }
        fetchMock.mockOnce(JSON.stringify(mockRespond))
        const result = await useUserStore().logoutUser()

        expect(result).toEqual(mockRespond)
        expect(useUserStore().username).toBe('')
        expect(useUserStore().token).toBe('')
        expect(useUserStore().host).toBe(host)
        expect(localStorage.removeItem('userToken')).toBe(undefined);
    })
});
