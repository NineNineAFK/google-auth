const express = require("express")


const router= express.Router()

router.get("/", (req, res)=>{
    res.render("home")
})



//router.post("/submit-review", submitReview)

module.exports = router;