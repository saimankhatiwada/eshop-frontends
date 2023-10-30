import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { productModel } from '../../interfaces';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../apis/productApis';
import { useState } from 'react';
import { MiniLoader } from '../../components/ui';
import { toastNotify } from '../../helper';

interface props {
    product: productModel[];
}


function productList(props: props) {

    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
    const [deletProductId, setDeleteProductId] = useState<string>("");
    const [deletProductName, setDeleteProductName] = useState<string>("");
    const [deleteProduct] = useDeleteProductMutation();

    const handleProductDeleteInitiate = (id: string, name: string) => {
        setDeleteProductId(id);
        setDeleteProductName(name);
        setIsDeleteModal(true);
    };

    const handleDeleteProduct = async () => {
        setIsDeleteProcessing(true);
        await deleteProduct(deletProductId);
        toastNotify(`Delete success on ${deletProductName}`, "success");
        setDeleteProductId("");
        setDeleteProductName("");
        setIsDeleteModal(false);
        setIsDeleteProcessing(false);
    }

    const handleProductDeleteCancle = () => {
        toastNotify(`Delete cancled on ${deletProductName}`, "info");
        setDeleteProductId("");
        setDeleteProductName("");
        setIsDeleteModal(false);
    };

    return (
        <>
            {!isDeleteModal ?
                (<div className="relative overflow-x-auto shadow-md sm:rounded-lg p-12">
                    <table className="w-full text-sm text-left text-blue-500">
                        <thead className="text-xs text-blue-700 uppercase bg-blue-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Currency
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.product.map((item: productModel) => (
                                <tr key={item.id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img src={item.imageName} className='w-6 h-6' />
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.currency}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4 space-x-4">
                                        <Link to={`/product/${item.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            <EditIcon /> Edit
                                        </Link>

                                        <button onClick={() => handleProductDeleteInitiate(item.id, item.name)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 mr-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                            <DeleteIcon /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                    <div className="h-screen flex items-center justify-center">
                        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                    </svg>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete {deletProductName}</h3>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">Are you sure you want to Delete {deletProductName}? All of the data will be permanently removed. This action cannot be undone.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            {isDeleteProcessing ?
                                                (<button disabled onClick={() => handleDeleteProduct()} type="button" className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-1">
                                                            <MiniLoader /> Delete
                                                        </div>
                                                    </div>
                                                </button>)
                                                :
                                                (<button onClick={() => handleDeleteProduct()} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>)
                                            }

                                            <button onClick={() => handleProductDeleteCancle()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}

export default productList;