<!-- Backend ****************************************-->

<!-- why that project is scalable and modular also support dry principle -->

<!--1. Error handling *********************** -->

<!-- So Here we are using Error handler class for Internal error that is implemented in middleware/error.js -->

<!-- centralized Error handling for Db operation or async error by this we don't need to use try catch block everywhere that is implemented in middleware/error.js -->


<!--2. Uncaught error handling ****************-->

<!-- Wrong Mongoose ObjectId error (When we are passing Wrong Id in Url or params)  -->


<!--3. Product Search , filter , pagination ***************** -->

<!-- In utils folder - > apiFeatures, I'm adding search, filter and pagination .Using search we are passing query String and by this query string we can find out all the products by matching characters and same with filter . -->


<!--4. Backend User & password Authentication **********************-->

<!-- So here we are Using Bcryptjs for hashing the password , JWt for token creation and refresh token also for security , using validator package for validating the email  -->

<!-- Adding functionality of reset password *********************** -->

<!-- So here we are sending email when user is reset password for that we are using nodemailer-->

<!-- Creating order model and adding functionality for order and here some routes are also manage or track by admin **********************************-->

<!-- Creating order part is challenging because is associated with the product like product stock and all so handling all those edge cases and successfully implementing the order functionality of product  -->



