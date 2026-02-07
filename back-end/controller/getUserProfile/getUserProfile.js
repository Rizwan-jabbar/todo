import User from "../../models/userSchema/userSchema.js"

const getMe  = async  ( req , res) => {
    

    try {

        const user = await User.findById(req.user.id).select('-password');
        
        if(!user){
            return res.status(404).json({isSuccess : false , message : 'user not found'});
        }

        return res.status(200).json({isSuccess : true , user});

    } catch (error) {
        
        return res.status(500).json({isSuccess : false , message : 'server error'});
    }
}

export default getMe