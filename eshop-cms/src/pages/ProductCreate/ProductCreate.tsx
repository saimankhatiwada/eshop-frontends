import { useCreateProductMutation } from "../../apis/productApis";
import { Link, useNavigate } from "react-router-dom";
import { MiniLoader } from "../../components/ui";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { inputHelper, toastNotify } from "../../helper";
import { useState } from "react";

const productData = {
    name: "",
    description: "",
    amount: "",
    currency: "",
    quantity: ""
};

function ProductCreate() {

    const navigate = useNavigate();
    const [isSaveChanges, setIsSaveChanges] = useState(false);
    const [fileToBeStored, setfileToBeStored] = useState<any>();
    const [fileToBeDisplayed, setfileToBeDisplayed] = useState<string>("https://placehold.co/600x400?text=eshop");
    const [productInputs, setProductInputs] = useState(productData);
    const [createProduct] = useCreateProductMutation();

    const cancelCreate = () => {
        toastNotify("Product creation cancled", "info");
        navigate("/product");
    }

    const handleProductInput = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const tempData = inputHelper(e, productInputs);
        setProductInputs(tempData);
    }

    const handleFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const fileType = file.type.split("/")[1];
            const validTypes = ["jpeg", "jpg", "png", "svg", "webp"];

            const isFileTypeValid = validTypes.filter((e) => {
                return e === fileType;
            });

            if (file.size > 10000 * 1024) {
                setfileToBeStored("");
                toastNotify("File must be less than 10 MB", "error");
                return;
            }
            else if (isFileTypeValid.length === 0) {
                setfileToBeStored("");
                toastNotify("File type not supported", "error");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            setfileToBeStored(file);
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                setfileToBeDisplayed(imageUrl);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaveChanges(true);
        if (!fileToBeStored) {
            toastNotify("Please upload an file", "error");
            setIsSaveChanges(false);
            return;
        }

        const formData = new FormData();
        formData.append("Name", productInputs.name);
        formData.append("Description", productInputs.description);
        formData.append("Amount", productInputs.amount);
        formData.append("Currency", productInputs.currency);
        formData.append("Quantity", productInputs.quantity);
        formData.append("File", fileToBeStored);

        let response = await createProduct(formData);

        if (response) {
            toastNotify("Product creation success", "success");
            setIsSaveChanges(false);
            navigate("/product");
        }

    };

    return (
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} >
            <div className="relative container mx-auto p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-20">
                        <div>
                            <h3 className="text-3xl text-blue-500">Edit Product</h3>
                            <p className="text-sm text-blue-500">You are currently editing a product. Please make the necessary changes and save your edits when you're done</p>
                        </div>
                    </div>
                    <div className='items-center space-x-6 text-blue-500 lg:flex'>
                        <Link to={"/product"} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <ArrowBackIcon /> Back
                        </Link>
                    </div>
                </div>
                <div className="relative container mx-auto p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <img src={fileToBeDisplayed} className="w-96 h-96" />
                            <div className="flex flex-col">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="font-semibold text-blue-500">Name</label>
                                        <input value={productInputs.name} onChange={handleProductInput} name="name" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-semibold text-blue-500">Description</label>
                                        <textarea value={productInputs.description} onChange={handleProductInput} name="description" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-20">
                                            <div className="space-y-1">
                                                <label className="font-semibold text-blue-500">Amount</label>
                                                <input value={productInputs.amount} onChange={handleProductInput} name="amount" type="number" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-semibold text-blue-500">Currency</label>
                                                <select value={productInputs.currency} onChange={handleProductInput} name="currency" id="currency" className="bg-gray-50 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                    <option selected>Choose currency</option>
                                                    <option value="NPR">Nepali Rupee</option>
                                                    <option value="USD">United State Dollar</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-semibold text-blue-500">Quantity</label>
                                                <input value={productInputs.quantity} onChange={handleProductInput} name="quantity" type="number" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-semibold text-blue-500">Upload File</label>
                                        <input onChange={handleFileChanged} className="block p-2.5 w-full text-sm text-blue-900 border border-blue-300 rounded-lg cursor-pointer bg-blue-50 focus:outline-none" type="file" />
                                    </div>
                                    <div className="space-x-4">
                                        <button onClick={() => cancelCreate()} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1">
                                            <CancelIcon /> Cancel
                                        </button>
                                        <>
                                            {isSaveChanges ?
                                                (<button disabled type="submit" className="text-white bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-1">
                                                            <MiniLoader /> Create
                                                        </div>
                                                    </div>
                                                </button>
                                                )
                                                :
                                                (<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1">
                                                    <SaveIcon /> Create
                                                </button>
                                                )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </form >
    );
}

export default ProductCreate;