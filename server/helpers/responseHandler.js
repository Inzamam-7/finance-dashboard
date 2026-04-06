export const successResponse = (res, {statusCode, message, data} = {}) =>{
    return res.status(statusCode || 200).json({
        success:true,
        message: message || "Request successfull",
        data: data || null
    })
}