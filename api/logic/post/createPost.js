const { validators: { validateId, validateUrl, validateText } } = require('com')
const { User, Post } = require('../../data/models')

/**
 * 
 * @param {string} userId user's id
 * @param {string} image post's image
 * @param {string} text post's caption
 * @returns {Promise<>} 
 */

module.exports = (userId, image, text) => {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new Error(`user with id ${userId} not found`)

        await Post.create({
            author: userId,
            image,
            text,
        })
    })()
}