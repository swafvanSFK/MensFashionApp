import cloudinary from 'cloudinary'
import cloudinaryInstance from '../../config/cloudinaryConfig.js'

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
  
//   export const cloudinaryInstance = cloudinary.v2;

const deleteImageController = async (req,res) => {    

    const {public_id } = req.body
    console.log(public_id);

    if(!public_id) {
        return res.status(400).json({message : "Public ID is required"})
    }

    const result = await cloudinaryInstance.uploader.destroy(public_id)

    if(result.result) {
        return res.status(200).json({message : "Image deleted successfully",public_id : public_id});
    }else{
        return res.status(400).json({message : "Failed to delete image"})
    }

}

export default deleteImageController
