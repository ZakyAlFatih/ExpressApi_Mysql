const response = (statusCode,data,messege,res)=>{
    res.json(statusCode, [
    { 
        payload:data,
        messege,
        metadata:{
            prev:"",
            next:"",
            current:""
        }
    }
    ])
}

module.exports = response
