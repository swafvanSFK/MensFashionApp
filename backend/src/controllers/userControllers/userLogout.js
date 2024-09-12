const userLogoutController = async (req,res) => {
    
    res.clearCookie('token')
    res.send({
        message : "User logout successfully",
        error:false,
        success : true,
        data : []
    })
}

export default userLogoutController