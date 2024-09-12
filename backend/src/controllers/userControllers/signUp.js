import { signUpJoi } from '../../validations/userJoiValidation.js'
import userModel from '../../models/userModel.js'
import bcrypt from 'bcryptjs'

const signUpController = async (req, res) => {
    
    const {error} = await signUpJoi.validateAsync(req.body)

    if(error){
        console.error('Validation error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const {userName, email, password} = req.body;

    const isExist = await userModel.findOne({email})
    if (isExist) {
        return res.status(400).send({message : "User already exists"})}

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUserData = new userModel({
        userName,
        email,
        password : hashPassword
    })

    await newUserData.save()
    
    res.status(201).send({
        message : "User created successfully",
        error : false,
        success : true,
    })
}

export default signUpController