export default function uniqId(): string {
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