import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg"
import User from "./User/User";

function Header() {
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <NavLink to="/">
                        <img src={logo} className='w-12 h-12' />
                    </NavLink>
                    <div className='hidden space-x-8 lg:flex'>
                        <NavLink to='/' className='text-blue-500 hover:text-blue-700'>
                            Dashboard
                        </NavLink>
                        <NavLink to='/product' className='text-blue-500 hover:text-blue-700'>
                            Products
                        </NavLink>
                        <NavLink to='#' className='text-blue-500 hover:text-blue-700'>
                            Orders
                        </NavLink>
                    </div>
                </div>
                <div className='hidden items-center space-x-6 text-blue-500 lg:flex'>
                    <div className='hover:text-blue-700'>
                        <User />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;