const { errors: {
    DuplicityError,
    ContentError,
    AuthError,
    ExistenceError,
    AuthorizationError
} } = require('com')

module.exports = callback => {
    return (req, res) => {
        try {
            callback(req, res)
                .catch(error => {
                    let status = 500

                    if (error instanceof DuplicityError)
                        status = 409
                    else if (error instanceof ExistenceError)
                        status = 404
                    else if (error instanceof AuthError)
                        status = 401
                    else if (error instanceof AuthorizationError)
                        status = 401

                    res.status(status).json({ error: error.message })
                })
        } catch (error) {
            let status = 500

            if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
                status = 406

            res.status(status).json({ error: error.message })
        }
    }
}