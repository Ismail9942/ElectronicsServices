import React from "react";
import { useAuth } from "../auth/AtuhProvider";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Profile = () => {
  const { user, userLogOut } = useAuth();
  return (
    <div>
      {user && user?.email ? (
        <div className="flex items-center gap-4">
          <div className="avatar" data-tooltip-id="avatar-tooltip">
            <div className="ring-error ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img className="z-10 w-full h-full" src={`${user?.photoURL}`} />
            </div>
          </div>
          <Tooltip className="z-10" id="avatar-tooltip">
            {user.displayName}
          </Tooltip>

          <button
            onClick={userLogOut}
            className="btn btn-sm md:btn-md mr-2 bg-[#e7000b] hover:bg-red-700 text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="btn btn-sm md:btn-md mr-2 bg-[#e7000b] hover:bg-red-700 text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Profile;
