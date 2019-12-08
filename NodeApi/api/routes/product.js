const express=require('express');
const router=express.Router();
const multer=require('multer');
const checkAuth=require('../middleware/check-auth');


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false)
    }
};


const upload=multer({storage:storage,
    limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter
});


const ProductController=require('../controllers/product');

router.get('/',ProductController.get_product_all)

router.post('/',checkAuth,upload.single('productImage'),ProductController.create_product)

router.get('/:productId',ProductController.get_productby_id)


router.patch('/:productId',checkAuth,ProductController.update_productby_id)

router.delete('/:productId',checkAuth,ProductController.delete_product);

module.exports=router;