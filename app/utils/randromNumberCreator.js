function RandomNumberCreator(length) {
    let createdNumber = [];
    this.createNumber = function () {
        while (createdNumber.length < length) {
            let randomNumber = Math.floor(Math.random() * 10);
            if (createdNumber[0] === 0 && randomNumber !== 0) createdNumber[0] = randomNumber;
            if (!createdNumber.includes(randomNumber)) createdNumber.push(randomNumber);
        }
    };
    Object.defineProperty(this, 'createdNumber', {
        get: function () {
            return createdNumber;
        },
    });
}

export {RandomNumberCreator};