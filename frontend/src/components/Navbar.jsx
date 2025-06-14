import { Link } from 'react-router-dom';
import useAuthStore  from '../context/useAuthStore.jsx';
import { User, Cloud, Settings, CircleDashed } from 'lucide-react';
// import useLogout from "../hooks/useLogout";
const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full z-40 backdrop-blur-lg bg-base-100/80'>
     <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">LearnCloud</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <CircleDashed className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <Cloud className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <CircleDashed className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <Cloud className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;