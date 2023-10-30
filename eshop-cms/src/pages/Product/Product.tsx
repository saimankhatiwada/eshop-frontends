import AddIcon from "@mui/icons-material/Add";
import ProductList from "./productList";
import { useGetProductsQuery } from "../../apis/productApis";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "../../storage/redux/productSlice";
import { PageLoading } from "../../components/ui";
import { Link } from "react-router-dom";

function Product() {

    const dispatch = useDispatch();
    const { data, isLoading } = useGetProductsQuery(null);

    useEffect(() => {
        if (!isLoading) {
            dispatch(setProduct(data));
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <PageLoading />
        );
    }

    return (
        <div className="relative container mx-auto p-6">
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-20">
                        <h3 className="text-3xl text-blue-500">Products</h3>
                    </div>
                    <div className='items-center space-x-6 text-blue-500 lg:flex'>
                        <Link to={"/product/create"} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <AddIcon /> Create Product
                        </Link>
                    </div>
                </div>
                {data.length > 0 && 
                    <ProductList product={data} />
                }
            </div>

        </div>
    );
}

export default Product;