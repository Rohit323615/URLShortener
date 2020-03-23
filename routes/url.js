const express=require('express');
const router=express.Router();
const shortID=require('shortid');
const validURL=require('valid-url');
const config=require('config');

const URL=require('../models/url');


///post 

router.get('/shorten',(req,res)=>{
    res.render('home',{
        url:''
    });
})

router.post('/shorten',async (req,res)=>{

    const {longUrl}=req.body;
    const baseUrl=config.get('baseUrl');

    //check base url
    if(!validURL.isUri(baseUrl)){
        return res.status(401).json('invalid base url');
    }

    const urlCode=shortID.generate();

    //check long url
    if(validURL.isUri(longUrl)){
        try {
            let url=await URL.findOne({longUrl:longUrl});

            if(url){
                res.render('home',{
                    url:url.shortUrl
                });
            }else{
                const shortUrl=baseUrl+'/'+urlCode;
                url=new URL({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date:new Date()
                });
                await url.save();
                res.render('home',{
                    url:url.shortUrl
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('server error');
        }
    }else{
         res.status(401).json('invalid long Url');
    }


});





module.exports=router;