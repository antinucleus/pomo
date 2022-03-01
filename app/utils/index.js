function CreateInputBase(pluses, minuses, number) {
    this.pluses = pluses;
    this.minuses = minuses
    this.number = number
}

function RandomNumberCreator(length) {
    const createdNumber = []
    this.createNumber = function () {
        while (createdNumber.length < length) {
            let randomNumber = Math.floor(Math.random() * 10)
            if (createdNumber[0] === 0 && randomNumber !== 0) createdNumber[0] = randomNumber
            if (!createdNumber.includes(randomNumber)) createdNumber.push(randomNumber)
        }
    }
    Object.defineProperty(this, 'createdNumber', {
        get: function () {
            return createdNumber
        }
    })
}

function delay(milliseconds) {
    const delay = new Promise(resolve => setTimeout(resolve, milliseconds || 200))
    return delay
}



export {
    CreateInputBase,
    RandomNumberCreator,
    delay
}