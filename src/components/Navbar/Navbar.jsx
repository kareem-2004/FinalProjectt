import React, { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let{cartCount,setcartCount} = useContext(CartContext)
  let navigate = useNavigate()
  function signout(){
    localStorage.removeItem("userToken");
    setuserLogin(null)
    navigate("/login")
  }
  return (
    <>
      <nav className="bg-slate-300  border-gray-200 fixed right-0 left-0 top-0 z-50">
        <div className="flex flex-wrap justify-center lg:justify-between gap-3 items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse "
            >
              <img
                src={logo}
                width={"120px"}
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>
                <ul className="flex gap-3">
                  <li>
                    <Link to="" className="text-slate-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="products" className="text-slate-600">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="categories" className="text-slate-600">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="brands" className="text-slate-600">
                      Brands
                    </Link>
                  </li>
                </ul>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-5">
            <li>
                    <Link to="cart" className="text-slate-600 relative">
                    Cart
                     <div className= "bg-emerald-500 absolute top-[-12px] right-[-12px] size-5 rounded-full text-white flex items-center justify-center">{cartCount}</div>
                     <span><i class="fa-solid fa-cart-shopping"></i></span>
                    </Link>
                  </li>
                <Link to="wishlist">
                <li>
                  Whishlist<i className="fa-solid fa-heart mx-2 hover:text-emerald-400 "></i>
                  </li>
                </Link>
            </ul>
            {userLogin != null ? (
              <span onClick={signout} className="cursor-pointer">Signout</span>
            ) : (
              <>
                <Link to="login">Login</Link>
                <Link to="register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
