const express = require('express');
const router = express.Router();
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path');
const { uploadFile, getFileStream } = require('../ultils/s3')
const request = require('request');

router.post('/upload', upload.single('file'), async (req, res, next) => {
    // Nhận tệp từ middleware multer lưu trữ tạm thời vào upload
    const file = req.file
    // console.log(file);
    // Tải lên hình ảnh lên Amazon S3 sử dụng hàm uploadFile
    const result = await uploadFile(file)
    // Xóa tệp tạm thời sau khi đã tải lên thành công
    await unlinkFile(file.path)
    // console.log("result", result)
    // const description = req.body.description
    res.status(200).json({
        status: 'success',
        data: result
    })
});

// fix lỗi 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
router.post('/get-remote-image', (req, res) => {
    const imageUrl = req.body.url;
    // Gửi yêu cầu để lấy dữ liệu hình ảnh từ URL
    request.get(imageUrl, { encoding: null }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const base64Image = Buffer.from(body).toString('base64');
            // Tạo Data URI và gửi về cho client
            const dataUri = `data:image/*;base64,${base64Image}`;
            res.send(dataUri);
        } else {
            res.status(500).send('Error fetching image');
        }
    });
});

module.exports = router;