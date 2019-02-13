const express = require('express');
const db = require('./db.js');
const router = express.Router();



// If the request body is missing the title or contents property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If the information about the post is valid:
// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.

// If there's an error while saving the post:
// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.


router.post('/', async (req, res) => {
const { title, contents } = req.body
const addition = { title, contents }

if (!title || !contents ) {
    return res.status(400).json( { errorMessage: "Please provide title and contents for the post." } )
}
try {
    const posts = await db.insert(addition);
    res.status(201).json(posts);
} catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
}
})

// When the client makes a GET request to /api/posts:

//     If there's an error in retrieving the posts from the database:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The posts information could not be retrieved." }.

// When the client makes a GET request to /api/posts/:id:

//     If the post with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The post with the specified ID does not exist." }.

//     If there's an error in retrieving the post from the database:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The post information could not be retrieved." }.


router.get('/', async (req, res) => {
try {
const posts = await db.find(req.query);
res.status(200).json(posts);
} catch (error) {
res.status(500).json({
    error: "The posts information could not be retrieved."
})
}
})

router.get('/:id', async (req, res) => {
const { id } = req.params
try {
const found = await db.findById(id)
    if (found) {
        res.status(200).json(found)
    }
    else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
} catch (error) {
    res.status(500).json({
        error: "The post information could not be retrieved." 
    })
}
})

// router.delete('/:id', async (req, res) => {
// try {

// } catch (error) {

// }
// })

// router.put('/:id', async (req, res) => {
// try {

// } catch (error) {

// }
// })

module.exports = router;