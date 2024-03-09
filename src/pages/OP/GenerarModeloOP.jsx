import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { useEffect, useState, useRef } from "react";

export default function GenerarModeloOP() {
  const [Loading, setLoading] = useState(false);

  //funcion para generar el modelo en el RPC
  const GenerarModelo = async () => {
    //console.log({ Nombre: NombreSenia, imagenes: imgBase64 });
    //enviar al RPC
    try {
      setLoading(true);
      //console.log(DataEdit);
      //console.log(DataEdit);
      // alert(numeor);
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "GenerarModelo",
        //params: [NombreSenia, imgBase64],
        id: 1,
      });

      //console.log(response);
      setLoading(false);
      //Cerrar();
      alert("Se genero el Modelo");
      //SetNombreSenia("");
      //setImgBase64([]);
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log(error);
    }
  };
  return (
    <Card className="mt-6 w-96 mx-auto">
      {Loading && <Loader />}

      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://d1.awsstatic.com/whatisimg/intro-gluon-1%20(1).ac2f31378926b5f99a4ba9d741c4aebe3b7a29e2.png"
          alt="card-image"
          className="w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Generar Modelo
        </Typography>
        <Typography>
          El modelo se genera a partir de las imagenes almacenadas en el RPC
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="blue" onClick={GenerarModelo}>
          Generar
        </Button>
      </CardFooter>
    </Card>
  );
}
