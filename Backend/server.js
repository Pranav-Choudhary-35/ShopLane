import app from './src/app.js'
import Mongoose from './src/config/database.js';
import { config } from '../Backend/src/config/config.js';

//connect database
Mongoose();


app.listen(config.PORT,()=>{
console.log(`app is running on ${config.PORT}`);

});

