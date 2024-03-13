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
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
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
import { useState } from "react";

export function NavBarFormsLogin({ loginG, LoginNormal }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav, sidenavColor } = controller;
  //abrir el dialog para iniciar sesion ya sea con google o con usuario local xd
  const [openIniciarSesion, setOpenIniciarSesion] = useState(false);
  const handleOpen = () => {
    setOpenIniciarSesion(!openIniciarSesion);
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <nav class=" rounded-none ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/img/Home/Extintor_logo.png" class="h-14" alt="Extintor" />
          {/* 
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Xtintor
            </span>
            */}
        </a>

        <div className="flex ">
          {/*
          <div className="">
            <a href="" style={{ textDecoration: "underline" }}>
              Acerca de
            </a>
          </div>
           */}
          <div
            className="h-auto  bg-light-blue-700 flex items-center justify-center mt-4 cursor-pointer text-center mx-auto w-full rounded-lg shadow-2xl hover:shadow-white hover:bg-light-blue-500 p-2"
            onClick={() => setOpenIniciarSesion(true)}
          >
            {/* 
            <div className="p-2">
              <UserIcon className="h-10 w-10 rounded-full" color="white" />
            </div>
            */}
            <Typography variant="h5" color="white">
              Iniciar Sesion
            </Typography>
          </div>
        </div>
      </div>
      {/* PARA VER EL INICIO DE SESION XD  */}
      <Dialog
        size="xs"
        open={openIniciarSesion}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card
          color="transparent"
          shadow={false}
          className="mx-auto w-full max-w-[24rem] mt-10 shadow-xl p-6 text-center bg-white items-center justify-center rounded-2xl"
        >
          <div className="p-2 mx-auto">
            <img
              className="h-10"
              src="/img/Home/Extintor_logo.png"
              alt="Extintor"
            />
          </div>
          <Typography variant="h4" color="blue-gray">
            Iniciar Sesion
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Ir a la aplicación Senias
          </Typography>
          <form className="mt-8 mb-2">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                variant="outlined"
                label="Correo"
                size="lg"
                name="email"
                onChange={HandleChange}
              />
              <Input
                onChange={HandleChange}
                type="password"
                name="password"
                label="Contraseña"
                size="lg"
                placeholder="********"
              />
            </div>

            <Button
              className="mt-6 bg-light-blue-900 font-bold "
              fullWidth
              onClick={() => LoginNormal(user)}
            >
              Aceptar
            </Button>
            <div
              className="h-auto bg-gray-200  flex items-center justify-center mt-4 cursor-pointer text-center rounded-lg mx-auto"
              onClick={loginG}
            >
              <div className="p-2">
                <img
                  className="h-7 w-7 rounded-full"
                  src="/img/Home/Google.png"
                  alt="User image"
                />
              </div>
              <div className="ml-2 font-bold text-blue-gray-600">
                Continuar con Google
              </div>
            </div>
            <Typography color="gray" className="mt-4 text-center font-normal">
              ¿No recuerda su contraseña?{" "}
              <a href="#" className="font-medium text-gray-900">
                Recuperar acceso
              </a>
            </Typography>
          </form>
        </Card>
      </Dialog>
    </nav>
  );
}

NavBarFormsLogin.displayName = "/src/widgets/layout/dashboard-navbar.jsx";
export default NavBarFormsLogin;
