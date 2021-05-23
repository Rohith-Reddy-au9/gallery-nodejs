const express = require('express')

const router = express.Router()
const { auth } = require('../middleware/auth')
const fileupload= require('express-fileupload');

router.use(express.urlencoded({ extended: true }))
router.use(fileupload({
    useTempFiles: true
}))

const { imgUpload, imageDetailsbyUser, deleteimg, UpdateImg, allimageDetails } = require('../controller/image')

router.get('/all-images', allimageDetails)

// private routes 
router.post('/image-upload', auth, imgUpload)
router.get('/image-details', auth, imageDetailsbyUser)
router.delete("/image-delete/:id",auth, deleteimg)
router.put("/image-update/:id", auth, UpdateImg)


module.exports = router