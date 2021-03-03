export const getPoints = (gameMode: string) => {
    let points: number
    switch (gameMode) {
        case 'Легкая':
            points = 1
            break
        case 'Средняя':
            points = 2
            break
        case 'Тяжелая':
            points = 8
            break
        case 'Ад':
            points = 16
            break
        default:
            points = 2
    }
    return points
}

//Тасование Фишера — Йетса:
export function shuffle(array: Array<number>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}