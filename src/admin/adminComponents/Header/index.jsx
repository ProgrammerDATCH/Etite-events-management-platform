import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import {logo} from '../assets'
import DarkModeSwitcher from './DarkModeSwitcher';
import { Humberger } from './Humberger';

const Header = (props) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between sm:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">

          <button aria-controls="sidebar" onClick={(e) => { e.stopPropagation(); props.setSidebarOpen(!props.sidebarOpen); }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden">
            <Humberger isOpen={props.sidebarOpen} />
          </button>
          <Link className="block flex-shrink-0 lg:hidden" to="/admin">
            <img src={logo} alt="Logo" className='w-10' />
          </Link>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
