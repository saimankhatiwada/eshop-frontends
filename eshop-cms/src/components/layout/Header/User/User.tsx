import { useState } from "react";
import logo from "../../../../assets/logo.svg"

function User() {

    const [showUserDropdown, setUserDropdowm] = useState(false);

    return (
        <>
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setUserDropdowm(!showUserDropdown)}>
                        <img src={logo} className="w-8 h-8" />
                        <svg className="-mr-1 h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {showUserDropdown &&
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            <a href="#" className="text-blue-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Profile</a>
                            <a href="#" className="text-blue-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Settings</a>
                        </div>
                        <div className="py-1" role="none">
                            <a href="#" className="text-blue-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">Logout</a>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default User;