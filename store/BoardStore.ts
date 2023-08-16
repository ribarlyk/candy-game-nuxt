import { defineStore } from "pinia";
import {useToast}  from "vue-toastification";
import { useUserStore } from "./UserStore";
import { HOST } from "../utils/HOST";
import nuxtStorage from 'nuxt-storage';

type BoardCell = {
    color: string,
    index: number,
    key: string
}

type State = {
    board: BoardCell[],
    indecesForSwap: number[],
    colors: string[],
    points: number,
    indexesFormingLine: number[],
    width: number,
    returnedIndexes: number[]
    emptyIndexes: number[]
    lines: number[]
}
const toast: any = useToast()

export const useBoardStore = defineStore('BoardStore', {
    actions: {
        async getBoard() {
            try {
                const response = await fetch(HOST + "board/start", {
                    headers: {
                         mode: "cors",
                        
                        authorization: "Bearer " + nuxtStorage.localStorage.getData('userToken'),
                    },
                })

                if (response.ok) {
                    const board = await response.json()
                    this.board = board.board
                } else {
                    throw new Error('token expired')
                }


            } catch (err) {
                const user = useUserStore()
                user.logoutUser()
                await navigateTo("/login");

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

            }

        },
        async updateBackend() {
            try {
                const response = await fetch(HOST + "board/update", {
                    mode: "cors",

                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + nuxtStorage.localStorage.getData('userToken'),

                    }
                })
            } catch (err) {
                console.log(err)
            }
        },
        async writeMoves(username: string, movesCounter: number, x: number, y: number, line: []) {
            try {
                const response = await fetch(HOST + "board/playermoves", {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + nuxtStorage.localStorage.getData('userToken'),

                    },
                    body: JSON.stringify({ username, movesCounter, x, y, line })
                })
                if (response.ok) {
                    const data = await response.json()
                    const { message, points } = data
                    this.points = points
                    console.log(data)

                } else {
                    throw new Error('token expired')
                }
            } catch (err) {
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
            }


        },
        genericLinesChecker(board: BoardCell[]) {
            
            for (let i = 0; i < board.length; i++) {
                this.checkLine(board, i)
            }
        },
        checkLine(board: BoardCell[], index: number) {
            const rowIndexes: number[] = []
            const colIndexes: number[] = []
            const width = 10
            const row = Math.floor(index / width)
            const col = index % width
            const temp = board[index].color

            for (let i = col - 1; i >= 0; i--) {
                const neighbourIndexOne: number = row * width + i

                if (board[neighbourIndexOne]?.color === temp && !colIndexes.includes(neighbourIndexOne)) {
                    colIndexes.push(neighbourIndexOne)
                } else {
                    break
                }

            }

            for (let i = col + 1; i < width; i++) {

                const neighbourIndexOne = row * width + i

                if (board[neighbourIndexOne]?.color === temp && !colIndexes.includes(neighbourIndexOne)) {
                    colIndexes.push(neighbourIndexOne)
                } else {
                    break
                }

            }
            for (let i = row + 1; i < width; i++) {

                const neighbourIndexOne = i * width + col

                if (board[neighbourIndexOne]?.color === temp && !rowIndexes.includes(neighbourIndexOne)) {
                    rowIndexes.push(neighbourIndexOne)
                } else {
                    break
                }

            }

            for (let i = row - 1; i >= 0; i--) {

                const neighbourIndexOne = i * width + col

                if (board[neighbourIndexOne]?.color === temp) {
                    rowIndexes.push(neighbourIndexOne)

                } else {
                    break
                }

            }
            let line: number[] = []
            if (rowIndexes.length > 1) {
                line.push(...rowIndexes)
                rowIndexes.forEach((x: number) => {
                    if (!this.emptyIndexes.includes(x)) {
                        this.emptyIndexes.push(x)
                    }
                    // this.points++
                })
            }
            if (colIndexes.length > 1) {
                line.push(...colIndexes)

                colIndexes.forEach((x: number) => {
                    if (!this.emptyIndexes.includes(x)) {
                        this.emptyIndexes.push(x)
                    }
                    // this.points++

                })
            }


            this.swapColorsWhenLineIsCreated(board, rowIndexes, colIndexes, index)
            this.fistRowLineChecker(board)
            if (line.length >= 2) {
                line.push(index)
                return line.sort((a, b) => a - b)
            }
            this.lines = this.emptyIndexes
            return this.emptyIndexes

        },
        swapColorsWhenLineIsCreated(board: BoardCell[], rowIndexes: number[], colIndexes: number[], index: number) {
            if (rowIndexes.length >= 2) {
                rowIndexes.forEach(x => {
                    board[index].color = 'line'
                    board[x].color = 'line'
                })
            }
            if (colIndexes.length >= 2) {
                colIndexes.forEach(x => {
                    board[index].color = 'line'
                    board[x].color = 'line'
                })
            }
        },
        fistRowLineChecker(board: BoardCell[]) {
            const color = ['orange', 'yellow', 'red', 'purple', 'green', 'blue']
            const colorsTwo = ['red', 'blue', 'purple', 'green', 'orange', 'yellow']

            for (let i = 0; i < 10; i++) {
                let currentIndex = 0
                if ((board[i]?.color === board[i + 1]?.color && board[i + 1]?.color === board[i + 2]?.color)) {
                    currentIndex = (currentIndex + 1) % color.length
                    board[i].color = color[currentIndex]
                    color.reverse()
                }
                if ((board[i]?.color === board[i + 10]?.color && board[i]?.color === board[i + 20]?.color)) {
                    currentIndex = (currentIndex + 1) % colorsTwo.length
                    board[i].color = colorsTwo[currentIndex]
                    colorsTwo.reverse()
                }
            }
        },
        isSecondIndexValid(board: BoardCell[], data: number[]) {
            let [firstIndex, secondIndex] = data
            if (!secondIndex) return false
      
            let result: boolean
            result =
              firstIndex + 1 === secondIndex ||
              firstIndex - 1 === secondIndex ||
              firstIndex + 10 === secondIndex ||
              firstIndex - 10 === secondIndex
      
            let secondResult =
             (board[firstIndex]?.color === board[firstIndex - 9]?.color && board[firstIndex]?.color === board[firstIndex - 11]?.color && firstIndex -secondIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex -9]?.color &&  board[secondIndex]?.color === board[secondIndex - 11]?.color && secondIndex - firstIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex - 12]?.color && board[firstIndex]?.color === board[firstIndex - 11]?.color && firstIndex -secondIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex - 9]?.color && board[firstIndex]?.color === board[firstIndex - 8]?.color && firstIndex -secondIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex -12]?.color &&  board[secondIndex]?.color === board[secondIndex - 11]?.color && secondIndex - firstIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex -9]?.color &&  board[secondIndex]?.color === board[secondIndex - 8]?.color && secondIndex - firstIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex  +8]?.color && board[firstIndex]?.color === board[firstIndex +9]?.color && secondIndex-firstIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex  +8]?.color && board[secondIndex]?.color === board[secondIndex +9]?.color && firstIndex-secondIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex  +11]?.color && board[firstIndex]?.color === board[firstIndex +12]?.color && secondIndex-firstIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex  +11]?.color && board[secondIndex]?.color === board[secondIndex +12]?.color && firstIndex-secondIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex  +9]?.color && board[firstIndex]?.color === board[firstIndex +11]?.color && secondIndex-firstIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex  +9]?.color && board[secondIndex]?.color === board[secondIndex +11]?.color && firstIndex-secondIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex  +2]?.color && board[secondIndex]?.color === board[secondIndex +3]?.color && firstIndex-secondIndex === 1) ||
             (board[firstIndex]?.color === board[firstIndex  +2]?.color && board[firstIndex]?.color === board[firstIndex +3]?.color && secondIndex-firstIndex === 1) ||
             (board[secondIndex]?.color === board[secondIndex  -2]?.color && board[secondIndex]?.color === board[secondIndex -3]?.color  && secondIndex-firstIndex === 1) ||
             (board[firstIndex]?.color === board[firstIndex  -2]?.color && board[firstIndex]?.color === board[firstIndex -3]?.color && firstIndex-secondIndex === 1) ||
             (board[firstIndex]?.color === board[firstIndex + 9]?.color && board[firstIndex]?.color === board[firstIndex + 19]?.color && firstIndex-secondIndex === 1) ||
             (board[secondIndex]?.color === board[secondIndex + 9]?.color && board[secondIndex]?.color === board[secondIndex + 19]?.color && secondIndex-firstIndex === 1) ||
             (board[firstIndex]?.color === board[firstIndex - 11]?.color && board[firstIndex]?.color === board[firstIndex -21]?.color && firstIndex-secondIndex === 1) ||
             (board[secondIndex]?.color === board[secondIndex -11]?.color && board[secondIndex]?.color === board[secondIndex -21]?.color && secondIndex-firstIndex === 1) ||
             (board[firstIndex]?.color === board[firstIndex -9]?.color && board[firstIndex]?.color === board[firstIndex - 19]?.color && secondIndex-firstIndex === 1) ||
             (board[secondIndex]?.color === board[secondIndex - 9]?.color && board[secondIndex]?.color === board[secondIndex - 19]?.color && firstIndex-secondIndex === 1) ||
             (board[firstIndex]?.color === board[firstIndex + 11]?.color && board[firstIndex]?.color === board[firstIndex +21]?.color && secondIndex-firstIndex === 1) ||
             (board[secondIndex]?.color === board[secondIndex + 11]?.color && board[secondIndex]?.color === board[secondIndex +21]?.color && firstIndex-secondIndex === 1) ||
             (board[secondIndex]?.color === board[secondIndex + 20]?.color && board[secondIndex]?.color === board[secondIndex +30]?.color && firstIndex-secondIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex + 20]?.color && board[firstIndex]?.color === board[firstIndex +30]?.color && secondIndex-firstIndex >2) ||
             (board[secondIndex]?.color === board[secondIndex - 20]?.color && board[secondIndex]?.color === board[secondIndex -30]?.color && secondIndex-firstIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex - 20]?.color && board[firstIndex]?.color === board[firstIndex -30]?.color && firstIndex-secondIndex >2) ||
             (board[firstIndex]?.color === board[firstIndex - 9]?.color && board[firstIndex]?.color === board[firstIndex +11]?.color && secondIndex-firstIndex ===1) ||
             (board[secondIndex]?.color === board[secondIndex - 9]?.color && board[secondIndex]?.color === board[secondIndex +11]?.color && firstIndex-secondIndex ===1) ||
             (board[firstIndex]?.color === board[firstIndex + 9]?.color && board[firstIndex]?.color === board[firstIndex -11]?.color && firstIndex-secondIndex ===1) ||
             (board[secondIndex]?.color === board[secondIndex + 9]?.color && board[secondIndex]?.color === board[secondIndex -11]?.color && secondIndex-firstIndex ===1) 
            
            return result && secondResult
          },
        swapColors(board: BoardCell[], indexes: number[],) {
            const [firstIndex, secondIndex] = indexes
            let tempColor = board[firstIndex].color;
            board[firstIndex].color = board[secondIndex].color
            board[secondIndex].color = tempColor

        },
        moveRowBelowQueue(color: string[], board: BoardCell[], indexes: number[], width: number) {
            let indexesArray: number[] = []
            for (let i = 0; i < width * width; i++) {
                let index = i
                if (board[index].color === 'line' && !indexesArray.includes(index)) {
                    indexesArray.push(index)
                }

                if (board[i].color === 'line' && i - width >= 0) {
                    board[i].color = board[i - width].color
                    board[i - width].color = 'line'
                }
            }

            let currentIndex = 0
            for (let i = 0; i < 10; i++) {

                if (board[i].color === 'line') {
                    // let randomIndex = Math.floor(Math.random() * color.length)
                    currentIndex = (currentIndex + 1) % color.length
                    console.log(currentIndex, 'mrbq')
                    board[i].color = color[currentIndex]
                    color.reverse()
                }
            }

            for (let i = 0; i < indexesArray.length; i++) {
                this.checkLine(board, indexesArray[i])
            }


            indexes = indexesArray

            return indexesArray
        },
        updatePoints() {
            this.points = 0
        }

    },

    getters: {
        doubleCount: (state) => Math.round(state.points / 2)
    },

    state: (): State => ({
        board: [],
        indecesForSwap: [],
        colors: ['yellow', 'green', 'orange', 'red', 'blue', 'purple'],
        points: 0,
        indexesFormingLine: [],
        width: 10,
        returnedIndexes: [],
        emptyIndexes: [],
        lines: [],
    }),

})