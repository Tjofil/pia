"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const news_1 = __importDefault(require("../models/news"));
class NewsController {
    constructor() {
        this.getAllNews = (req, res) => {
            news_1.default.find({}, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json(news);
            });
        };
        this.addComment = (req, res) => {
            let idN = req.body.idN;
            let commentText = req.body.commentText;
            news_1.default.findOne({ 'id': idN }, (err, news) => {
                if (err)
                    console.log(err);
                else {
                    if (news) {
                        let comment = {
                            text: commentText
                        };
                        news_1.default.updateOne({ 'caption': news.caption }, { $push: { 'comments': comment } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json({ 'message': 'ok' });
                            }
                        });
                    }
                    else {
                        res.json({ 'message': 'error' });
                    }
                }
            });
        };
        this.delete = (req, res) => {
            let idN = req.body.idN;
            news_1.default.deleteOne({ 'id': idN }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.update = (req, res) => {
            let id = req.body.id;
            let newCaption = req.body.caption;
            // NewsModel.updateOne({'id' : id}, {$set : {'caption' : newCaption}}, (err, resp) => {
            //     if (err) console.log(err)
            //     else res.json({'message' : 'updated'})
            // })
            news_1.default.updateOne({ 'id': id }, { $set: { "comments.$[comment].text": "News comment text" } }, { arrayFilters: [{
                        "comment.text": "Comment 3"
                    }] }, (err, esp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
    // searchNews = (req : express.Request, res: express.Response) => {
    //     let searchParam = req.query.param;
    //     NewsModel.find({'caption' : {$regex : searchParam}}, (err, news)=>{
    //         if (err) console.log(err)
    //         else res.json(news)
    //     })
    // }
    searchNews(req, res) {
        let searchParam = req.query.param;
        news_1.default.find({ 'caption': { $regex: searchParam } }, (err, news) => {
            if (err)
                console.log(err);
            else
                res.json(news);
        });
    }
}
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map