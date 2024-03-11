import {
  PlusCircleIcon,
  FilmIcon,
  PlayIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Collapse,
} from "@material-tailwind/react";

import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente

import { useEffect, useState, useRef } from "react";
import "@tensorflow/tfjs-backend-webgl"; // Utiliza el backend WebGL para TensorFlow.js

import axios from "axios";

export default function Test_Senia_OP() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [Loading, setLoading] = useState(false);
  const [prediccion, setPrediccion] = useState("");
  //Conceptos
  useEffect(() => {
    Simon();
  }, []);

  const [openRecursos, setOpenRecursos] = useState(false);
  const toggleOpenRecursos = () => setOpenRecursos(!openRecursos);

  const [imgBase64, setImgBase64] = useState("");
  const [ocupado, setOcupado] = useState(false);

  const capture = async () => {
    if (canvasCtx1 && canvasIsReady && canvasHaveLandmarks) {
      //alert("Hay manos");
      //setcanvasHaveLandmarks(false);
      //Transformar el contenido dle canva a una URL
      var dataURL = canvasElement1.toDataURL();
      //Crear una imagen y asignarle el buffer de la imagen
      var img = new Image();
      img.src = dataURL;
      //Cuando la imagen este lista

      img.onload = async () => {
        //Redimensionar el lienzo (canva)
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // Redimensionar la imagen a 512x512
        canvas.width = 512;
        canvas.height = 512;
        ctx.drawImage(img, 0, 0, 512, 512);
        //Transformar el canva a su data para obtener el buffer de bytes
        var dataURL = canvas.toDataURL();
        console.log(ctx);
        //setImgBase64(dataURL);
        //Se guarda en el JSON
        //setImgBase64(dataURL);
        //enviar al rpc la imagen para predecirla

        GuardarSenia(dataURL);
      };
    } //else alert("No hay manos detectadas");
  };
  /* FUNCION PARA EJECUTAR CONSTAMENTENTE EL DETECTOR DE SENIAS
  useEffect(() => {
    const intervalId = setInterval(() => {
      capture();
    }, 1000); // Ejecutar la función cada segundo

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    };
  }, []);
   */
  /** PARA LA WEBCAM */
  const [canvasIsReady, setCanvasIsReady] = useState(false);
  const [canvasHaveLandmarks, setcanvasHaveLandmarks] = useState(false);
  const [canvasCtx1, setcanvasCtx1] = useState(null);
  const [canvasElement1, setcanvasElement1] = useState(null);
  const Simon = () => {
    const videoElement = document.getElementsByClassName("input_video")[0];
    const canvasElement = document.getElementsByClassName("output_canvas")[0];
    const canvasCtx = canvasElement.getContext("2d");
    setcanvasCtx1(canvasCtx);
    setcanvasElement1(canvasElement);
    //let canvasIsReady = false;
    //let canvasHaveLandmarks = false;
    //FUEnviarSocker();
    //capture();
    function setCanvaMediaVideoSize() {
      //Obtener las dimensiones (ancho y alto) del video
      let videoWidth = videoElement.videoWidth;
      let videoHeight = videoElement.videoHeight;

      //Calcular la proporción entre ancho y alto para mantener el aspecto
      let aspectRatio = videoWidth / videoHeight;

      //Ajustar las dimensiones del canvas para mantener el aspecto del video
      let canvasWidth = canvasElement.offsetWidth;
      let canvasHeight = canvasWidth / aspectRatio;

      //En caos de que el tamanio no se acople, utilizar el aspecto calculado
      //para evitar malos redimensionamientos
      if (canvasHeight > canvasElement.offsetHeight) {
        canvasHeight = canvasElement.offsetHeight;
        canvasWidth = canvasHeight * aspectRatio;
      }

      //Redimensionando el canvas para que coincida con las dimensiones calculadas
      canvasElement.width = canvasWidth;
      canvasElement.height = canvasHeight;
    }
    function onResults(results) {
      setCanvaMediaVideoSize();

      //Redimensionar el canva al video captado en por la cámara
      setCanvaMediaVideoSize();

      //Limpiar el canvas
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      //canvasElement.style.border = "1px solid red";

      //Llenar el canvas con el color de fondo negro y el tamanio total al que corresponde
      canvasCtx.fillStyle = "#FFFFFF";

      //Si se quiere mantener el mismo video de fondo, descomentar la linea con drawImage()
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      //canvasCtx.drawImage(videoElement, 0, 0);

      //Factores para auto ajuste de tamanio
      const baseAutosizeFactor = 5;
      const movementAutosizeFactor = 5;
      // var canvasHaveLandmarks;
      //setcanvasHaveLandmarks(false);
      if (results.multiHandLandmarks) {
        if (results.multiHandLandmarks.length > 0) setcanvasHaveLandmarks(true);

        for (const landmarks of results.multiHandLandmarks) {
          //Obtener la coordenada z (profundidad) de todos los puntos
          let zCoordinates = landmarks.map((landmark) => Math.abs(landmark.z));

          //Obtener la minima coordenada z
          let minZ = Math.min(...zCoordinates);
          //let maxZ = Math.max(...zCoordinates);

          //Normalizar el valor minimo de z a un valor positio o negativo
          let movementDirection = minZ < 0 ? -1 : 1;

          //Recalcular el autoajuste utilizando los factores
          let lineWidth =
            baseAutosizeFactor + movementDirection * movementAutosizeFactor;

          //Dibujar las lineas y puntos por la captacion de la mano
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#000000",
            lineWidth: lineWidth,
          });

          //Si se requiere dibujar los puntos, modificar la division del radio
          drawLandmarks(canvasCtx, landmarks, {
            color: "#000000",
            lineWidth: lineWidth / 2,
            radius: lineWidth / 4,
          });
        }
      }

      setCanvasIsReady(true);
    }

    //Cargar la libreria para usar mediapipe
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    //Establecer los parametros utilizados para la configuracion de mediapipe
    hands.setOptions({
      maxNumHands: 2, //Número máximo de manos aceptables o que se captaran
      modelComplexity: 1, //1 prioriza la captación antes que la velocidad, menor valor prioriza velocidad
      minDetectionConfidence: 0.6, //Menor valor prioriza detección menos optima, mayor valor prioriza la detección
      minTrackingConfidence: 0.6, //Menor valor prioriza el seguimiento menos optimo, mayor valor prioriza el seguimiento correcto
    });

    //Definir el metodo de los resultados que equivale a la captacion del video
    hands.onResults(onResults);

    //Definir la captacion de video de la camara y empezarla
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });
    //setCamara(camera);
    //Camara.start();
    camera.start();

    //Adaptar el canvas cuando cargue la camara
    videoElement.addEventListener("loadedmetadata", () => {
      const videoDimensions = videoElement.getBoundingClientRect();
      canvasElement.style.width = videoDimensions.width + "px";
      canvasElement.style.height = videoDimensions.height + "px";
    });
  };

  //funcion para guardar la senia con las imagenes en el RPC
  const [oracion, setOracion] = useState("");
  const GuardarSenia = async (imgBase642) => {
    const splitString = imgBase642.split("data:image/png;base64,");
    //console.log(splitString[1]);
    //enviar al RPC
    try {
      setLoading(true);
      setOcupado(true);
      console.log("enviando");
      const response = await axios.post("http://localhost:4000", {
        jsonrpc: "2.0",
        method: "PredecirImagen",
        //el segundo parametro es el modelo a usar para la prediccion
        params: [splitString[1], "Modelo20240310214757"],
        id: 1,
      });
      console.log(response.data.result);
      setPrediccion(response.data.result);
      //formar la oracion skere
      const OracionAux = oracion;
      setOracion(OracionAux + " " + response.data.result);
      setLoading(false);
      speak(OracionAux + " " + response.data.result);
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log(error);
    }
  };

  //text to speech
  const speak = (texto) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    const voices = synth.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang === "es-ES");
    utterance.voice = selectedVoice;
    synth.speak(utterance);
  };
  const limpiar = () => {
    setOracion("");
    setPrediccion("");
  };
  return (
    <Card className="h-full w-full mt-2 bg-transparent shadow-none">
      {Loading && <Loader />}

      <>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
          crossorigin="anonymous"
        ></script>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none mb-0 bg-transparent"
        >
          <div className=" flex justify-between gap-8 ">
            <div className="   p-1 rounded-xl">
              <Typography variant="h2" color="black" className="font-bold">
                Test de las senias
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/*PROCESADO DE LA IMAGEN*/}
          <Button
            onClick={toggleOpenRecursos}
            variant="filled"
            color="white"
            className="w-full text-black text-lg capitalize flex items-center justify-center mt-3"
          >
            <div className="mx-auto items-center text-center mt-4">
              <Typography variant="h3" color="black" className="mx-auto">
                {prediccion}
              </Typography>
            </div>
          </Button>

          <Collapse open={true}>
            <Card className="my-4 mx-auto w-full">
              <CardBody>
                {/* PARA LOS VIDEOS*/}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                  <div
                    key={1}
                    className="rounded-2xl  shadow-2xl cursor-pointer"
                  >
                    <Typography variant="h3" color="black">
                      Cámara
                    </Typography>
                    <video className="input_video" ref={videoRef}></video>
                  </div>
                  <div
                    key={1}
                    className="rounded-2xl  shadow-2xl cursor-pointer"
                  >
                    <Typography variant="h3" color="black">
                      Procesado
                    </Typography>

                    <canvas
                      className="output_canvas border-4 border-black w-auto"
                      ref={canvasRef}
                    />
                  </div>
                </div>
                <>
                  <Button
                    className="ml-auto flex gap-1 mt-4 mx-auto bg-light-blue-900 h-11"
                    onClick={() => capture()}
                  >
                    <PlusCircleIcon className="h-7 w-7" />
                    <p className="mt-1">Ver prediccion</p>
                  </Button>
                </>
              </CardBody>
            </Card>
          </Collapse>

          <Card className=" mx-auto w-full h-full">
            <CardBody>
              <Card className="my-4 mx-auto w-full shadow-none">
                <CardBody className="flex gap-4">
                  <Button
                    className=" bg-light-blue-900 w-auto rounded-full"
                    onClick={() => speak(oracion)}
                  >
                    <PlayIcon className="h-7 w-7" />
                  </Button>
                  <div className="mx-auto">
                    <Typography variant="h3" color="black" className="mx-auto">
                      {oracion}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </CardBody>
      </>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          className=" bg-red-700 w-auto rounded-full"
          onClick={() => limpiar()}
        >
          <TrashIcon className="h-7 w-7" />
        </Button>
      </CardFooter>
    </Card>
  );
}
