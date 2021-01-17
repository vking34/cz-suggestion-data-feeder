import convertCategories from './categoryConvertor';
import feedProducts from './productFeeder';


export default async () => {
    try {
        await convertCategories();
        await feedProducts();
    }
    catch (e) {
        console.log(e);
    }
}