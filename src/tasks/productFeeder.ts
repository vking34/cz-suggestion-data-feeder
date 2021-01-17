import pgPool from '../models/pg/index';
import MgCategoryModel from '../models/mongo/category';
import { PgProduct } from '../interfaces/product';
import axios from 'axios';

const HARNESS_ENDPOINT = process.env.HARNESS_ENDPOINT;
const sendEvent = async (event: any) => {
    try {
        const res = await axios.post(HARNESS_ENDPOINT, event);
        console.log(res.data);
    }
    catch (e) {
        console.log(e);
    }
}


export default async () => {
    const pageSize: number = 50;
    let count: number = 0;

    while (true) {
    // while (count < 50) {    // test
        try {
            const result = await pgPool.query(`SELECT id, category_id, created_at FROM products.product OFFSET ${count} LIMIT ${pageSize}`);
            if (result.rowCount === 0) break;

            const products: PgProduct[] = result.rows;
            for (let i = 0; i < products.length; i++) {
                let categories;
                const categoryId: string = products[i].category_id.toString();
                const productId: string = products[i].id.toString();
                const createdAt: any = products[i].created_at;
                try {
                    const categoryResult: any = await MgCategoryModel.findById(categoryId);
                    categories = categoryResult.categories;
                }
                catch (_e) {
                    categories = [categoryId]
                }

                const productCreationEvent = {
                    event: '$set',
                    entityType: 'item',
                    entityId: productId,
                    properties: {
                        category: categories
                    },
                    eventTime: createdAt.toISOString()
                }
                console.log(productCreationEvent);
                await sendEvent(productCreationEvent);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

}