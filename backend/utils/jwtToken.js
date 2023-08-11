// create and send token and save in the cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // options for cookie

  // Setting the httpOnly attribute to true when creating cookies is a security measure that enhances the protection of your web application.
  // The httpOnly attribute ensures that the cookie can only be accessed by the server and not by JavaScript running in the browser. This is particularly
  // important for cookies that store sensitive information, such as authentication tokens, because it helps mitigate the risk of cross-site scripting (XSS) attacks.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_is_stateless_but_not_sessionless
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // sending or saving token in cookie
  try{
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  }catch(err){
    console.log(err);
  }
};

module.exports = sendToken;
