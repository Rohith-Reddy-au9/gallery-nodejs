const cloudinary = require("cloudinary")
const Dummy = require("../model/dummy")
const dotenv = require("dotenv")
dotenv.config()

cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.allimageDetails =  async (req, res) => {
    try {
      let user = await Dummy.find();
      res.json(user);
    } catch (err) {
      res.send(err);
      console.log(err);
    }
}

exports.imageDetailsbyUser =  async (req, res) => {
  const { id } = req.user
    try {
      let user = await Dummy.find({image_by: id});
      res.json(user);
    } catch (err) {
      console.log(err);
    }
}

exports.imgUpload  = async (req, res) => {
  const {title, description, is_private } = req.body
  const imgFile = req.files.image
  const { id } = req.user
  try {
    const img = await cloudinary.uploader.upload(imgFile.tempFilePath)
    const imgdata = new Dummy ({
      title,
      description,
      image :img.url,
      is_private,
      image_by: id
    })
    await imgdata.save()
    res.json(imgdata)
    // console.log(imgdata)
  } catch (error) {
    console.log(error)
  }
}

exports.deleteimg = async (req, res) => {
  const postid = req.params.id
  const { id } = req.user

  try {
      const post = await Dummy.findById(postid)
      await post.delete()
      res.json({message:"deleted successfully"})
  } catch (err) {
    console.log("err", err)
      res.json({message:err.message})
  }
}

exports.UpdateImg = async (req, res) => {
  const {title, description, is_private } = req.body
  const { id } = req.user
  let postid = req.params.id
  try {
    let postupdate = await Dummy.findById(postid)
    if(postupdate){
      postupdate.title = title,
      postupdate.description = description,
      postupdate.is_private = is_private
      await postupdate.save()
    } else {
      res.status(400).json({ message: "post not available" });
      console.log("no imge")

    }
    res.json({ message: "post updated" });
    console.log("post updated")

  } catch (error) {
    console.log(error)
  }
}



