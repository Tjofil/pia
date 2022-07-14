"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/login').post((req, res) => new admin_controller_1.AdminController().login(req, res));
adminRouter.route('/changePass').post((req, res) => new admin_controller_1.AdminController().changePass(req, res));
adminRouter.route('/update').post((req, res) => new admin_controller_1.AdminController().update(req, res));
exports.default = adminRouter;
//# sourceMappingURL=admin.router.js.map