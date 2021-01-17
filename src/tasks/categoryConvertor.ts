import pgPool from '../models/pg/index';
import { PgCategory, MgCategory } from '../interfaces/category';
import MgCategoryModel from '../models/mongo/category';


export default () => {
    return new Promise(async (resolve, reject) => {
        const pageSize: number = 100;
        let count: number = 0;

        while (true) {
            try {
                const result = await pgPool.query(`SELECT id, parent_id, level FROM products.category OFFSET ${count} LIMIT ${pageSize}`)
                if (result.rowCount === 0) break;
                // console.log(result.rows);
                const categories = result.rows;
                categories.forEach(async (category: PgCategory) => {
                    let convertedCategory: MgCategory;
                    let cID = category.id.toString();
                    convertedCategory = {
                        _id: cID,
                        categories: [cID]
                    }
                    if (category.level === 2) {
                        let c1 = category.parent_id.toString();
                        convertedCategory.categories.push(c1)
                    }
                    else if (category.level === 3) {
                        let c2 = category.parent_id.toString();
                        convertedCategory.categories.push(c2);
                        const c2Record = await pgPool.query(`SELECT id, parent_id, level FROM products.category WHERE id = ${category.parent_id}`);
                        let c1 = '' + c2Record.rows[0].parent_id;
                        convertedCategory.categories.push(c1)
                    }
                    console.log(convertedCategory);
                    MgCategoryModel.create(convertedCategory).catch((_e) => {});
                })

                count += result.rowCount;
            }
            catch (e) {
                console.error(e);
                reject(e)
            }
        }

        resolve(true);
    })

}