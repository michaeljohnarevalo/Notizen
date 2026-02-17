import ratelimit from "../config/upstash.js"


const rateLimiter = async (req, res,next)=>{
    try{

        const {success} = await ratelimit.limit("my-;imit-key")
        if(!success) {
            return res.status(429).json({
                message:"Tooo many reques"
            })
        }

        next()

    }catch(error){
        console.log("Rate limi erroo", error)
        next(error)
    }

}

export default rateLimiter