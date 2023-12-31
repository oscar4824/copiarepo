"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalController = void 0;
const generalDatabase_1 = __importDefault(require("../database/generalDatabase"));
class GeneralController {
    listarRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield generalDatabase_1.default.listarRoles();
                return res.json(roles);
            }
            catch (error) {
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
    listarCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield generalDatabase_1.default.listarCategorias();
                return res.json(categorias);
            }
            catch (error) {
                return res.status(500).json({ mensaje: "Ocurrió un error" });
            }
        });
    }
}
exports.generalController = new GeneralController();
