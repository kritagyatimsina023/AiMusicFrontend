import { useContext, useState, useEffect, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Info from "../../../data/our-info";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import icons from "../../../data/Contact-icons";
import gsap from "gsap";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { toast } from "react-toastify";
import { ReviewContext } from "@/context/ReviewContext";
import { SignInAndSignUpContext } from "@/context/SiginAndSignUp";
import { UserAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const NavBarTwo = ({ className }: { className?: string }) => {
  const { user, logOut } = UserAuth();
  const context = useContext(SignInAndSignUpContext);
  const navigate = useNavigate();
  const contextReview = useContext(ReviewContext);
  if (!contextReview) throw new Error("No review context found");
  const { setLoadingReview } = contextReview;

  if (!context)
    throw new Error("Navbar must be used within SignInAndSignUpProvider");
  const { open, setOpen, activate, setActivate } = context;
  const [active, setActive] = useState<string | null>(null);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  // GSAP hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!navbarRef.current) return;

      const navbarHeight = navbarRef.current.offsetHeight;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > navbarHeight
      ) {
        // scrolling down -> hide navbar
        gsap.to(navbarRef.current, {
          y: -navbarHeight, // move it up exactly its height
          opacity: 0.95, // optional subtle fade
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // scrolling up -> show navbar
        gsap.to(navbarRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      setLoadingReview(true);
      if (user) toast.success("Logged out!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToogle = () => {
    if (activate) {
      gsap.to(".sign-in-compo", {
        y: -200,
        rotate: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setActivate(false);
          setTimeout(() => setOpen(true));
        },
      });
    } else {
      setActivate(true);
    }
  };

  return (
    <>
      <div
        ref={navbarRef}
        data-navbar
        className={cn("fixed top-0 inset-x-0 max-w-xl mx-auto z-50", className)}
      >
        <Menu setActive={setActive}>
          <Link to={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>

          <MenuItem setActive={setActive} active={active} item="Info section">
            <div className="flex flex-col space-y-4 text-sm">
              {Info.map((elem, idx) => (
                <HoveredLink key={idx} to={`${elem?.infoLinks}`}>
                  {elem.infoName}
                </HoveredLink>
              ))}
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Contact Us">
            <HoveredLink href="/contact">
              {icons?.map((item, idx) => (
                <item.icons size={20} key={idx} />
              ))}
            </HoveredLink>
          </MenuItem>

          {user ? (
            <div className="rounded-full w-8 h-8 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={
                  user?.photoURL
                    ? `${user.photoURL}?sz=200`
                    : "/photos/avatar.jpg"
                }
                alt="avatar"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <FaUser
              onClick={handleToogle}
              size={20}
              className="cursor-pointer"
            />
          )}

          <CiLogout onClick={handleSignOut} size={20} />
        </Menu>
      </div>

      {activate && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleToogle}
          ></div>
          <div className="relative z-50">{open ? <Signin /> : <Signup />}</div>
        </div>
      )}
    </>
  );
};

export default NavBarTwo;
