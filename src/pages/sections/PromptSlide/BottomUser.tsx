// import { UserAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const BottomUser = () => {
  // const { user, logOut } = UserAuth();
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogOut() {
    await logOut();
    navigate("/");
  }

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      className="flex items-center gap-2.5 px-3.5 py-3 border-t border-[#1e2028]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Avatar */}
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="avatar"
          referrerPolicy="no-referrer"
          className="w-[34px] h-[34px] rounded-full object-cover flex-shrink-0
            border-[1.5px] border-[#1a4a2a]"
        />
      ) : (
        <div
          className="w-[34px] h-[34px] rounded-full bg-[#0f3020] border-[1.5px]
          border-[#1a4a2a] flex items-center justify-center flex-shrink-0
          text-[13px] font-semibold text-[#1DB954]"
        >
          {initials}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#e0e0e0] truncate tracking-tight">
          {user?.displayName ?? user?.email}
        </p>
        <div
          className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5
          bg-[#0a2016] border border-[#1a4a2a] rounded-full"
        >
          <span className="w-[5px] h-[5px] rounded-full bg-[#1DB954]" />
          <span className="text-[10px] text-[#1DB954] font-medium tracking-wide">
            Free
          </span>
        </div>
      </div>

      {/* Logout icon button */}
      <button
        onClick={handleLogOut}
        title="Log out"
        className="w-[30px] h-[30px] rounded-lg bg-[#1a1c22] border border-[#252830]
          flex items-center justify-center flex-shrink-0 transition-all
          hover:bg-[#2a0a0a] hover:border-[#5a1a1a] group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="stroke-[#555] group-hover:stroke-[#e24b4a] transition-colors"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2" />
          <path d="M9.5 9.5L12 7l-2.5-2.5" />
          <path d="M12 7H5.5" />
        </svg>
      </button>
    </div>
  );
};

export default BottomUser;
