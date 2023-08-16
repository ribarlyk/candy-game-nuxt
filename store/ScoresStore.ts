import { defineStore } from 'pinia'
import { HOST } from "../utils/HOST"
import { useToast } from "vue-toastification";
import { useUserStore } from "./UserStore"

type ResultData = {
    _id: string,
    date: string,
    username: string,
    points: number,

}

type Scores = {
    scores: ResultData[]
}

const toast: any = useToast()

export const useScoresStore = defineStore('ScoresStore', {
    actions: {
        async saveResult(date: string, points: number, token: string) {
            try {
                const response = await fetch(HOST + 'results/saveresult', {
                    method: "POST",
                    mode: "cors",
                    
                    headers: {
                        authorization: "Bearer " + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date, points })
                })
                const dataResponse = await response.json()
                if (response.ok) {
                    return dataResponse

                } else {
                    const user = useUserStore()
                    user.logoutUser()
                    await navigateTo('/login')
                    toast('Token expired', {
                        position: "bottom-left",
                        timeout: 5000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: false,
                        closeButton: "button",
                        icon: "fas fa-rocket",
                        rtl: false,
                        type: 'error'
                    });
                    throw new Error(dataResponse.message)
                }
            } catch (err:any) {
                throw new Error(err.message)
            }

        },
        async getResult(token: string) {
            try {
                const response = await fetch(HOST + 'results/getresult', {
                    method: "GET",
                    mode: "cors",

                    headers: {
                        authorization: "Bearer " + token,
                    },
                })

                const score = await response.json()
                if (response.ok) {
                    this.scores = score

                } else {
                    const user = useUserStore()
                    user.logoutUser()
                    await navigateTo('/login')
                    toast('Token expired', {
                        position: "bottom-left",
                        timeout: 5000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: false,
                        closeButton: "button",
                        icon: "fas fa-rocket",
                        rtl: false,
                        type: 'error'
                    });
                    throw new Error(score.message)
                }
            } catch (err:any) {
                throw new Error(err.message)
            }

        }
    },
    state: (): Scores => ({
        scores: [],
    })
})