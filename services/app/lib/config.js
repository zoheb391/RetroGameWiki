const get = key => {
    if (process.env[key] === undefined) {
        throw new Error(`${key} is not defined`)
    }
    return process.env[key]
}

export default get
