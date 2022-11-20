function randomChooser<T>(array: Array<T>) {
    let copy = array.slice(0);
    return function () {
        if (copy.length < 1) {
            copy = array.slice(0);
        }
        const index = Math.floor(Math.random() * copy.length);
        const item = copy[index];
        copy.splice(index, 1);
        return item;
    };
};
export function randomChoice<T>(array: Array<T>, num: number) {
    let chooser = randomChooser(array);
    let result: Array<T> = []
    for (let i = 0; i < num; ++i) result.push(chooser());
    return result;
};
