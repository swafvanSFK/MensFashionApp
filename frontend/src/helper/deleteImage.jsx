
const deleteImage = async (publicId) => {
    const deleteUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_NAME}/image/destroy`;

    const formData = new FormData();
    formData.append('public_id', publicId);

    const response = await fetch(deleteUrl, {
        method: 'POST',
        body: formData,
    });

    return response.json();
}

export default deleteImage