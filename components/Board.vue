<template>
    <div class="container flex gap-5 w-full my-12 mx-auto justify-center items-center">
     
        <p class="text-2xl font-thin"> Welcome <span class="font-extrabold">{{ username }}</span></p>
        <p  v-if="gameStarted" class="points text-2xl font-thin">Points: <span class="font-extrabold">{{ calculatedPoints }}</span></p>
        <button @click="handleGetBoard" class="start-button hover:cursor-pointer h-8 w-26 p-1 bg-indigo-600 text-white rounded-lg border-0" v-if="!gameStarted" data-test="startbtn">Start Game</button>
    </div>
    <div class="board w-800px h-800px my-0 mx-auto flex flex-wrap border border-black shadow-lg shadow-blue-500/50" v-if="gameStarted">
        <div class="row-in-board" v-for="(cell, index) in board" :key="cell.key" data-test="cell">
            <base-button :type="cell" @click="handleCandyClick($event, index)" />
        </div>
    </div>
</template>

<script setup>
import { computed, watch, onUnmounted, ref } from "vue"
import { storeToRefs } from 'pinia'
import { useBoardStore ,useUserStore,useScoresStore} from '../store'


const { board, indecesForSwap, colors, points, indexesFormingLine, width, returnedIndexes, doubleCount } = storeToRefs(useBoardStore())
const { genericLinesChecker, isSecondIndexValid, checkLine, swapColors, moveRowBelowQueue, getBoard, writeMoves, updateBackend } = useBoardStore()
const { saveResult } = useScoresStore()
const { token, username } = storeToRefs(useUserStore())
const movesCounter = ref(0)
const gameStarted = ref(false)

const calculatedPoints = computed(() => {
    return Math.ceil(points.value / 2)
})

const emptyCells = computed(() => returnedIndexes.value.length >= 1);
let moveTimer = null;

watch(emptyCells, (newValue) => {
    if (newValue) {
        moveTimer = setInterval(() => {
            returnedIndexes.value = moveRowBelowQueue(colors.value, board.value, indexesFormingLine, 10);
            updateBackend()
        }, 500)
    } else {
        clearInterval(moveTimer)
        moveTimer = null
    }
});

onUnmounted(() => {
    let date = getDate()
    if (doubleCount.value) {
        saveResult(date, doubleCount.value, token.value)
    }
    movesCounter.value = 0
    points.value = 0
    board.value = []
    // clearInterval(moveTimer) // ako go ima prechi na trugvaneto sled login pri expired token

})

function handleGetBoard(e) {

    getBoard()
    gameStarted.value = true
    setTimeout(() => {
        genericLinesChecker(board.value, indexesFormingLine.value)
        returnedIndexes.value = moveRowBelowQueue(colors.value, board.value, indexesFormingLine.value, width.value)
    }, 300)
}
let element
let tempElement
function handleCandyClick(event, index) {
    tempElement ? tempElement.classList.remove('pump') : null
    indecesForSwap.value.push(index)
    element = event.target
    element.classList.add('pump')
    tempElement = element
    const isIndecesValid = isSecondIndexValid(board.value, indecesForSwap.value)

    if (indecesForSwap.value.length === 2 && isIndecesValid) {
        swapColors(board.value, indecesForSwap.value)
        
        for (let i = 0; i < indecesForSwap.value.length; i++) {
           checkLine(board.value, indecesForSwap.value[i], indexesFormingLine)
        }
        const [x, y] = indecesForSwap.value
        movesCounter.value++


        writeMoves(username.value, movesCounter.value, x, y)

        returnedIndexes.value = indecesForSwap.value
        indecesForSwap.value = []
    } else if (!isIndecesValid && indecesForSwap.value.length === 2) {
        element.classList.remove('pump')
        indecesForSwap.value = []
    }
}

</script>

