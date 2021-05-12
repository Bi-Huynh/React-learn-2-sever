import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import * as Database from './config/db.js';
import { router as todoRouter } from './src/Todo/index.mjs';
import { router as musicRouter } from './src/Music/index.mjs';
// import { router as homeRouter } from './src/Home';

const app = express();
const port = 8080;

Database.connect();

app.use(cors());
app.use(fileUpload());
// app.use(express.static('public'));

app.use(
    express.urlencoded({
        extended: true,
    })
);
// sử dụng middleware để mã hóa req.body
// có thể sử dụng được nó tại express từ - v 4.16, nếu sử dụng - v cũ hơn thì phải cài npm body - parser để mã hóa req.body
app.use(express.json());
// thêm thằng json để có thể submit những dữ liệu không phải html như XMLHttp, fetch,....
// dùng để gửi code từ js lên để submit

app.use(methodOverride('_method'));
// override method này là để override lại các phương thức trong mongoose
// sử dụng nó để có thể sử dụng thư viện override dùng trong soft delete (xóa mềm => không xóa hẳng đi)

app.use('/todos', todoRouter);
app.use('/musics', musicRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
