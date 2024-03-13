import { useState, useEffect } from 'react'
import { NavBarFormsLogin } from '@/components/FormsLayout'
import { Info } from '@/pages/dashboard'
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from 'next/router';
import Head from "next/head";
import { Loader } from "@/widgets";

export default function index() {
  const Router = useRouter();
  const [load, setLoader] = useState(false);

  //funcion para el inicio de sesion skere modo diablo
  const loginG = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        //console.log(res.data);
        //Aqui va para sacar los datos que regresa google
        //si existe res.data entonces mandar a la API a verificar 
        if (res.data) {
          console.log(res.data);
          const { email: email, family_name: apellidos, given_name: nombres, hd: dominio, name: nombres_completos, picture: foto } = res.data;
          //Llama al metodo pasandole el email
          //GoogleLogin(email, nombres_completos, dominio, foto);
          const cookies = new Cookies();
          cookies.set("Nombres", nombres_completos, { path: "/" });
          cookies.set("foto", foto, { path: "/" });
          cookies.set("email", email, { path: "/" });
          GoogleLogin(email);
        }
        //http://localhost:3000/dashboard/Senas
      } catch (error) {
        console.log(error);
      }
    },
  });
  const GoogleLogin = async (email) => {
    try {
      setLoader(true);
      console.log(email);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "auth/LoginG",
        { email },
        {
          withCredentials: true,
        }
      );
      //console.log("asdas", result);

      const cookies = new Cookies();
      //Cookie para el token
      cookies.set("myTokenName", result.data.token, { path: "/" }); //enviar cokiee y almacenarla
      //Cookie para el id del usuario
      cookies.set("id_user", result.data.id, { path: "/" });
      setLoader(false);
      //para abrir la nueva ruta en la misma pestana
      //Router.push("/dashboard/Home");
      Router.push("/dashboard/Senas");

    } catch (error) {
      console.log(error);
      setLoader(false);
      alert(error.response.data.error);
    }
  };

  //FUNCION PARA INICIAR SESION CON CORREO Y CONTRASENA
  const IncioSesion = async (user) => {
    //e.preventDefault();
    //process.env.NEXT_PUBLIC_ACCESLINK
    //Router.push("/Inicio");
    setLoader(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "auth/Login",
        user,
        {
          withCredentials: true,
        }
      );
      const cookies = new Cookies();
      //Cookie para el token
      cookies.set("myTokenName", result.data.token, { path: "/" }); //enviar cokiee y almacenarla
      //Cookie para el id del usuario
      cookies.set("id_user", result.data.id, { path: "/" });
      setLoader(false);
      Router.push("/dashboard/Senas");
    } catch (error) {
      console.log(error);
      setLoader(false);
      //colocar una alerta de error cuando no se pueda inciar sesion
      //setError(true);
      alert(error.response.data.error);
    }
  }

  return (
    <>
      {load ? <Loader /> : ""}

      <Head>
        <title>Inicio de Sesion</title>
      </Head>
      <NavBarFormsLogin loginG={loginG} LoginNormal={IncioSesion} />
      <Info />
    </>
  )
}
