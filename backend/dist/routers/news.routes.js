"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("../controllers/news.controller");
const newsRouter = express_1.default.Router();
newsRouter.route('/getAllNews').get((req, res) => new news_controller_1.NewsController().getAllNews(req, res));
newsRouter.route('/addComment').post((req, res) => new news_controller_1.NewsController().addComment(req, res));
newsRouter.route('/delete').post((req, res) => new news_controller_1.NewsController().delete(req, res));
newsRouter.route('/searchNews').get((req, res) => new news_controller_1.NewsController().searchNews(req, res));
newsRouter.route('/update').post((req, res) => new news_controller_1.NewsController().update(req, res));
exports.default = newsRouter;
//# sourceMappingURL=news.routes.js.map