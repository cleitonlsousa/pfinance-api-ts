import { connect } from "mongoose";


export default async function conn() {
    connect(process.env.URI_MONGO ?? '').then((data) => {
        console.log('MongoDB Connection Succeeded', data.version);
    }).catch((err) => {
        console.log('Error in DB connection:', err.message);
    })
}