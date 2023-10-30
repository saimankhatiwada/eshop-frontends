import { useGetProductByIdQuery, useUpdateProductMutation } from "../../apis/productApis";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MiniLoader, PageLoading } from "../../components/ui";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { inputHelper, toastNotify } from "../../helper";
import { useEffect, useState } from "react";

const productData = {
  name: "",
  description: "",
  amount: "",
  currency: "",
  quantity: ""
};


function ProductDetails() {

  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(productId);
  const [isSaveChanges, setIsSaveChanges] = useState(false);
  const [imageToBeSTored, setImageToBeStored] = useState<any>();
  const [imageToBeDisplayed, setImageToBeDisplayed] = useState<string>("");
  const [productInputs, setProductInputs] = useState(productData);
  const [updateProduct] = useUpdateProductMutation();

  const cancelEdit = () => {
    toastNotify(`Edit canceled on ${data.name}`, "info");
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
        setImageToBeStored("");
        toastNotify("File must be less than 10 MB", "error");
        return;
      }
      else if (isFileTypeValid.length === 0) {
        setImageToBeStored("");
        toastNotify("File type not supported", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStored(file);
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageToBeDisplayed(imageUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaveChanges(true);
    if (!imageToBeSTored) {
      toastNotify("Please upload an file", "error");
      setIsSaveChanges(false);
      return;
    }

    const formData = new FormData();
    formData.append("ProductId", data.id);
    formData.append("Name", productInputs.name);
    formData.append("Description", productInputs.description);
    formData.append("Amount", productInputs.amount);
    formData.append("Currency", productInputs.currency);
    formData.append("Quantity", productInputs.quantity);
    formData.append("File", imageToBeSTored);

    let response = await updateProduct(formData);

    if (response) {
      toastNotify(`Edited ${data.name}`, "success");
      setIsSaveChanges(false);
      navigate("/product");
    }

  };

  useEffect(() => {
    if (data) {
      const tempData = {
        name: data.name,
        description: data.description,
        amount: data.amount,
        currency: data.currency,
        quantity: data.quantity
      };
      setProductInputs(tempData);
      setImageToBeDisplayed(data.imageName);
    }
  }, [data]);

  if (isLoading) {
    return (
      <PageLoading />
    );
  }


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
              <img src={imageToBeDisplayed} className="w-96 h-96" />
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
                    <button onClick={() => cancelEdit()} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1">
                      <CancelIcon /> Cancel
                    </button>
                    <>
                      {isSaveChanges ?
                        (<button disabled type="submit" className="text-white bg-blue-400 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <MiniLoader /> Save Changes
                            </div>
                          </div>
                        </button>
                        )
                        :
                        (<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1">
                          <SaveIcon /> Save Changes
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

export default ProductDetails;