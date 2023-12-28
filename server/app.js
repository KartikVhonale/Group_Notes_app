const epxress = require('express');
const router = require('./router/router');
const dbConnect = require('./dbConfig')
const app = epxress();
const cors = require('cors');

app.use(cors());

app.use(epxress.json());

app.use('/auth', router);
app.use('/', router)

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`server is listen at port: `, PORT);
    dbConnect()
})