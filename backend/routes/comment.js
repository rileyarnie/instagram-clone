const express = require("express")

const router = express.Router()
const commentControllers = require("../controllers/commentControllers") 

router.post('/:postId/create-comment', commentControllers.createComment)


module.exports = router