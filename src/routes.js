//Este es un nuevo archivo que no se habia usado en el proyecto anterior sirve como un rotueador parecedio a nodejs 

import {
    UserCircleIcon,
    ChartBarSquareIcon,
    AdjustmentsHorizontalIcon,
    ArrowUpOnSquareStackIcon

} from "@heroicons/react/24/solid";
//Importa todos los componentes que tiene la carpta MenuLateral mediante el index.js
//import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
//aqui es para particionar la barra en otra seccion
//import { SignIn, SignUp } from "@/pages/auth";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        title: "Opciones administracion",

        pages: [
            {
                icon: <AdjustmentsHorizontalIcon {...icon} />,
                name: "Senas",
                path: "/Senas",
                //element: <Notifications />,
            },
            {
                icon: <AdjustmentsHorizontalIcon {...icon} />,
                name: "Crear Sena",
                path: "/Opciones/CrearSenia",
                //element: <Notifications />,
            },
            {
                icon: <AdjustmentsHorizontalIcon {...icon} />,
                name: "Test Senia",
                path: "/Opciones/TestSenia",
                //element: <Notifications />,
            },
            {
                icon: <AdjustmentsHorizontalIcon {...icon} />,
                name: "Administrar Modelo",
                path: "/Opciones/AdminModelo",
                //element: <Notifications />,
            },
            {
                icon: <ArrowUpOnSquareStackIcon {...icon} />,
                name: "Generar Modelo",
                path: "/Opciones/GenerarModelo",
                //element: <Notifications />,
            },

        ],
    },
    {
        title: "Opciones Usuario",
        layout: "auth",
        pages: [
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Mis datos",
                path: "/notifications",
                //element: <Notifications />,
            },

            {
                icon: <UserCircleIcon {...icon} />,
                name: "Configuracion",
                path: "/notifications",
                //element: <Notifications />,
            },
        ],
    },
    /*

{
    title: "Opciones de Super Usuario",
    layout: "superuser",
    pages: [
        {
            icon: <InformationCircleIcon {...icon} />,
            name: "Usuarios",
            path: "/notifications",
            //element: <Notifications />,
        },
        {
            icon: <InformationCircleIcon {...icon} />,
            name: "Formularios",
            path: "/notifications",
            //element: <Notifications />,
        },
    ],
},
*/
];

export default routes;
