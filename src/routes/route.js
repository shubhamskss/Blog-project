const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")
const BlogsController=require("../controller/BlogsController");
const BlogsModel = require('../models/BlogsModel');
const middleware=require("../middleware/middleware")




router.post("/BASE_URL/authors",AuthorController.authOrs)
router.post("/blogs",BlogsController.Blogs)
router.get("/blogs",middleware.mid1,BlogsController.getBlogsData)
router.put("/blogs/:blogId",middleware.authorisation,BlogsController.updateBlogs)
router.delete("/blogs/:blogId",middleware.authorisation,BlogsController.deleteBlogs)
router.delete("/blogs",middleware.authorisation,BlogsController.deleteBlogsqp)
router.post("/login",AuthorController.loginuser)








module.exports=router;