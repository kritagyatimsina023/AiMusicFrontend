import { UserAuth } from "@/context/AuthContext";

// import defaultPic from "@/public/photos/avatar.jpg";
import { useNavigate } from "react-router-dom";

const BottomUser = () => {
  const { user, logOut } = UserAuth();
  const naviagte = useNavigate();
  async function handleLogOut() {
    await logOut();
    naviagte("/");
  }
  return (
    <div className="text-white border-t border-white/30 bottom-0 flex gap-4 items-center py-4  ">
      <div className="rounded-full w-[28px] h-[28px] overflow-hidden">
        <img
          className="w-full h-full rounded-full object-cover"
          src={user?.photoURL || "/photos/avatar.jpg"}
          alt="img"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-white/80 italic">
          {user?.displayName ? user?.displayName : user?.email}
        </h2>
        <span className="text-white/80 italic">Free</span>
      </div>
      <button
        onClick={handleLogOut}
        className="rounded-xl btn text-white/80 cursor-pointer px-7 py-2 border-1 border-white/30 ml-9 "
      >
        logout
      </button>
    </div>
  );
};

export default BottomUser;
