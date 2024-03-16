import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Dialog_Error, Loader } from "@/widgets";
import {
  BarraNavegacion2,
  Navbar_app,
  Configurator,
} from "@/components/layout";
//rutas que va a tener la barra lateral
import routes from "@/routes";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setFixedNavbar,
} from "@/context";
import React from "react";
import Cookies from "universal-cookie";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { EditarSeniaOP } from "@/pages/OP";
//IMPORT DE LA WEBCAM
import Webcam from "react-webcam";

export default function Editar() {
  const router = useRouter();
  const { Editar } = router.query;
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, sidenavColor } = controller;
  const [nombreSenia, setNombreSenia] = useState("");
  useEffect(() => {
    if (Editar) {
      setNombreSenia(Editar);
    }
  }, [Editar]);



  return (
    <div className=" min-h-screen bg-blue-gray-50/50">
      <Head>
        <title>CrearSenia</title>
      </Head>
      <BarraNavegacion2
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80 ">
        <Navbar_app user_name={"Nombre User"} titulo={"Inicio"} />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className={`fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900 shadow-2xl border-x-4 border-y-4 border-blue-700`}
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <EditarSeniaOP nombreSenia={nombreSenia} />
      </div>
    </div>
  );
}
