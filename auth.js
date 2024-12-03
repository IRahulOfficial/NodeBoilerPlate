const router = require("express").Router();


//Main Api Code ----------------------------------

router.get("/login" , (req ,res ) => {
    res.send("ok")
})

module.exports = router;