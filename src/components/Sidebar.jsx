import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ username }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username'); // Remover el nombre de usuario del localStorage
    navigate('/login');
  };

  const menus = [
    { name: "Pedidos", link: "/", icon: FiShoppingCart },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`bg-[#0e0e0e] min-h-screen flex flex-col justify-between ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Link
          to="/usuario"
          className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md mb-4`}
        >
          <div>{React.createElement(FaUserCircle, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `600ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {username}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            {username}
          </h2>
        </Link>
        <div className="border-t border-gray-700 my-4"></div>
        <Link
          to="#"
          onClick={handleLogout}
          className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md mb-4`}
        >
          <div>{React.createElement(FiLogOut, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `600ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            Cerrar sesión
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            Cerrar sesión
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
