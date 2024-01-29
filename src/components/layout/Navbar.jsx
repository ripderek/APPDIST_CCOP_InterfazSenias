import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  UserIcon,
  ArrowsPointingOutIcon,
  ArrowLongLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

export function Navbar_app({ user_name, titulo }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav, sidenavColor } = controller;
  const cookies = new Cookies();
  const [image, setimage] = useState("");
  const [nombres, setNombre] = useState("");
  const [nombresS, setNombreS] = useState("");
  const [gmail, setGmail] = useState("");

  useEffect(() => {
    setimage(decodeURIComponent(cookies.get("foto")));
    setNombre(decodeURIComponent(cookies.get("Nombres")));
    setNombreS(decodeURIComponent(cookies.get("Nombres")).substring(0, 15));
    setGmail(decodeURIComponent(cookies.get("email")));
  }, []);
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-none bg-white border-none"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography
            variant="h4"
            //color={sidenavColor === "dark" ? "black" : "white"}
            className={`mb-2 text-light-blue-900`}
          ></Typography>
        </div>

        <div className="flex items-center">
          <div className="">
            <div className="h-auto bg-blue-gray-100 flex mt-1 cursor-pointer text-center rounded-xl mx-auto w-full shadow-2xl hover:shadow-light-blue-900">
              <div className="flex items-center">
                <Tooltip content={nombres}>
                  <img
                    className="h-14 rounded-xl shadow-lg  "
                    src={image}
                    alt="User image"
                  />
                </Tooltip>
                <div className="ml-2 font-bold text-light-blue-900 p-2">
                  {nombresS}..
                </div>
              </div>
            </div>
          </div>

          <IconButton
            variant="text"
            color={"blue-gray"}
            className="grid xl:hidden ml-2"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

Navbar_app.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default Navbar_app;
