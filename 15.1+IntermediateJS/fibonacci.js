function fibonacciList(n) {
    const list = [];
    let a = 0, b = 1;
    for (let i = 0; i <= n; i++) {
        if (i === 0) list.push(0);
        else if (i === 1) list.push(1);
        else {
            const next = a + b;
            list.push(next);
            a = b;
            b = next;
        }
    }
    return list;
}

console.log(fibonacciList(10)); // [0,1,1,2,3,5,8,13,21,34,55]