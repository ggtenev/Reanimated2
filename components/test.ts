const last = <T>(arr:Array<T>) => {
return arr[arr.length - 1]
}

const l = last([1,2,3,4])
const l2 = last(['1',2,() => {},{a:1}])