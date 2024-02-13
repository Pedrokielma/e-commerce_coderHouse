import mongoose from 'mongoose';
import MONGO_URL from "../../utils/consts.js";

export default {
    connect: () => {
        // console.log('epa', MONGO_URL)
        return mongoose.connect(MONGO_URL)
            .then(() => {
                console.log('DB connected');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
