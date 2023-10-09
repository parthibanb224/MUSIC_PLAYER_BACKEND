const FavoriteRouter = require('express').Router();
const FavoriteModel = require('../models/Favorite.models');

FavoriteRouter.get('/:id', (req, res, next) => {
    const userName = req.params.id;
    FavoriteModel.find({ userName })
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Favorite music fetch successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message: "Favorite music fetch failed",
                Error: err
            })
        })
})

FavoriteRouter.post('/add/:id', (req, res, next) => {
    const fullName = req.params.id;
    const data = req.body;
    const newFavorite = FavoriteModel({ ...data, userName: fullName });
    newFavorite.save()
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Favorite music Added Successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                message: "Favorite music Added Failed"
            })
        })
})

FavoriteRouter.delete('/delete/:fullName/:name', async(req,res,next) => {
    const matchedDocument = await FavoriteModel.findOne({"name":req.params.name,"userName":req.params.fullName});
    await FavoriteModel.findOneAndRemove({name:matchedDocument.name})
        .then(response => {
            return res.status(200).json({
                success: true,
                message: "deleted Successfully"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: "deleted failed"
            })
        })
})

module.exports = FavoriteRouter;