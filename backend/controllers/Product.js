const Product = require("../models/productSchema")
const Category = require("../models/categorySchema");



exports.fetchFilteredProducts = async (req, res) => {
    try {
        // const { filter, sort, pagination } = req.body;
        // let filteredProducts = await Product.find({});
        // // Apply filters
        // if (filter && Object.keys(filter).length > 0) {
        //     for (const key in filter) {
        //         filteredProducts = filteredProducts.filter((product) =>
        //             filter[key].includes(product[key])
        //         );
        //     }
        // }
        const { filter, sort, pagination } = req.body;
        // console.log("Received filter:", filter);
        // console.log("Received sort:", sort);
        // console.log("Received pagination:", pagination);
        // let filteredProducts = await Product.find({});

        let query = {};

        // Apply filters
        if (filter && filter.category && Array.isArray(filter.category)) {
            const lowerCaseCategories = filter.category.map(name => name.toLowerCase());
            const categoryObjectIds = await Category.find({ name: { $in: lowerCaseCategories } }).select('_id');
            const categoryIds = categoryObjectIds.map(item => item._id);
            query.category = { $in: categoryIds };
        }
        // console.log("Filter Query:", query);
        let filteredProducts = await Product.find(query);



        // Apply sorting
        if (sort && Object.keys(sort).length > 0) {
            filteredProducts.sort((a, b) => {
                if (a[sort._sort] < b[sort._sort]) {
                    return sort._order === "asc" ? -1 : 1;
                }
                if (a[sort._sort] > b[sort._sort]) {
                    return sort._order === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        // Calculate pagination
        const startIndex = (req.body.pagination._page - 1) * req.body.pagination._limit;
        const endIndex = startIndex + req.body.pagination._limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        res.json({
            products: paginatedProducts,
            totalItems: filteredProducts.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

exports.fetchAllProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({})
        // const allProducts = await Product.find({})
        res.send(allProducts)
    } catch (error) {
        res.status(404).json({ error: "Fetching All Products Error..." })
    }
}
exports.fetchProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const productByid = await Product.findById(productId)
        res.send(productByid);
    } catch (error) {
        res.status(404).json({ error: "Fetching Products By Id Error..." })
    }
}