
const url = `https://api.cloudinary.com/v1_1/dmbvakswx/image/upload`

const uploadImage = async (image) => {
    
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "entry_project");

    const dataResponse = await fetch(url, {
        method: 'post',
        body: formData,
    });
    
    const result = await dataResponse.json();
    
    return { secure_url: result.secure_url, public_id: result.public_id };
}

export default uploadImage;
