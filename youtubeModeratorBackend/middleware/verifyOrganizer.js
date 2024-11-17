// Middleware to check if the user is logged in
const verifyOrganizer = async (req, res, next) => {
    console.log("Authentication is processing");
  
    if (req.user) {
      console.log("Authentication successful");
      next(); // Proceed to the next middleware or route handler
    } else {
      console.log("authentication not successfull");
      res.sendStatus(401); // Unauthorized access if user is not logged in
    }
  };

module.exports=verifyOrganizer;