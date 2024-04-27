import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { user, user_empty } from '../assets'
import { useAdminContext } from '../../../AdminContextProvider';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isAdminLoggedIn, loggedInAdmin } = useAdminContext()

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {isAdminLoggedIn ? loggedInAdmin.names : ""}
          </span>
          <span className="block text-xs">{isAdminLoggedIn ? "Admin" : "Not logged in!"}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={isAdminLoggedIn ? user : user_empty} alt="User" />
        </span>

        <FaChevronDown />

      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        {isAdminLoggedIn ? (
          <Link to={"/admin/login?logout=true"}>
            <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <FaSignOutAlt />
              Log Out
            </button>
          </Link>) : (
          <Link to={"/admin/login"}>
            <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <FaSignInAlt />
              Log in
            </button>
          </Link>
        )
        }
      </div>
    </div>
  );
};
export default DropdownUser;