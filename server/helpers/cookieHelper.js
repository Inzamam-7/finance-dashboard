const options = {
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
}

export const setCookies = (res, token) => {
    res.cookie("token", token, options);
};

export const clearCookies = (res) =>{
    res.clearCookie("token", options);
}