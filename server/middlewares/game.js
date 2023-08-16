function uniqId() {
    const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g',]
    const nums = ['1', '2', '3', '4', '5', '6', '7']

    let id = ''

    for (let i = 0; i < alpha.length; i++) {
        let random = Math.ceil(Math.random() * 6)
        if (i % 2 === 0) {
            id += alpha[random]
        } else {
            id += nums[random]
        }
    }
    return id
}

function boardGenerator() {
    let colors = ['yellow', 'green', 'orange', 'red', 'blue', 'purple']
    let board = []
    let width = 10
    const grid = width * width
    for (let i = 0; i < grid; i++) {
        const indexColor = Math.floor(Math.random() * colors.length)
        board.push({
            color: colors[indexColor],
            index: i,
            key: uniqId()
        })
    }
    return board
}


const color = ['yellow', 'green', 'orange', 'red', 'blue', 'purple']
function moveRowBelowQueue(board, width) {
    let indexesArray = []
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
        checkLine(board, indexesArray[i])
    }
    console.log(indexesArray)
    return indexesArray
}

const emptyIndexes = []
let points = 0

function checkLine(board, index) {
    const rowIndexes = []
    const colIndexes = []
    const width = 10
    const row = Math.floor(index / width)
    const col = index % width
    const temp = board[index].color

    for (let i = col - 1; i >= 0; i--) {
        const neighbourIndexOne = row * width + i

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
    let line = []
    if (rowIndexes.length > 1) {
        line.push(...rowIndexes)
        rowIndexes.forEach((x) => {
            if (!emptyIndexes.includes(x)) {
                emptyIndexes.push(x)
            }
            points++
        })
    }
    if (colIndexes.length > 1) {
        line.push(...colIndexes)

        colIndexes.forEach((x) => {
            if (emptyIndexes.includes(x)) {
                emptyIndexes.push(x)
            }
            points++

        })
    }

    swapColorsWhenLineIsCreated(board, rowIndexes, colIndexes, index)
    fistRowLineChecker(board)
    // if (line.length >= 2) {
    //     line.push(index)
    //     return line.sort((a, b) => a - b)
    // }
    console.log(points, 'points')
    return points
}


function swapColorsWhenLineIsCreated(board, rowIndexes, colIndexes, index) {
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
    return board
}
function fistRowLineChecker(board) {
    const colors = ['orange', 'yellow', 'red', 'purple', 'green', 'blue']
    const colorsTwo = ['red', 'blue', 'purple', 'green', 'orange', 'yellow']
    for (let i = 0; i < 10; i++) {
        let currentIndex = 0
        if ((board[i]?.color === board[i + 1]?.color && board[i + 1]?.color === board[i + 2]?.color)) {
            currentIndex = (currentIndex + 1) % colors.length
            board[i].color = colors[currentIndex]
            colors.reverse()
        }
        if ((board[i]?.color === board[i + 10]?.color && board[i]?.color === board[i + 20]?.color)) {
            currentIndex = (currentIndex + 1) % colorsTwo.length
            board[i].color = colorsTwo[currentIndex]
            colorsTwo.reverse()
        }

    }
}

function genericLinesChecker(board) {
    for (let i = 0; i < board.length; i++) {
        checkLine(board, i)
    }
}
function swapColors(board, x, y) {
    let firstIndex = x;
    let secondIndex = y
    let tempColor = board[firstIndex].color;
    board[firstIndex].color = board[secondIndex].color
    board[secondIndex].color = tempColor

}

export {
    boardGenerator, moveRowBelowQueue, checkLine, genericLinesChecker, swapColors
}