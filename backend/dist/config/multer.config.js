"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: (0, path_1.join)(__dirname, '../../../frontend/src/Components/Images/'),
        filename: (req, file, callback) => {
            const fileExtName = (0, path_1.extname)(file.originalname);
            const randomName = (0, uuid_1.v4)();
            callback(null, `${randomName}${fileExtName}`);
        },
    }),
};
//# sourceMappingURL=%20multer.config.js.map