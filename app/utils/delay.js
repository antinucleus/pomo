function delay(milliseconds) {
    const delay = new Promise(resolve => setTimeout(resolve, milliseconds || 200));
    return delay;
}


export {delay};