import {
  PlusCircleIcon,
  DocumentTextIcon,
  CogIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Checkbox,
} from "@material-tailwind/react";

import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { tasks } from "../../Data/Conceptos";
//IMPORT DE LA WEBCAM
import Webcam from "react-webcam";
//const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];
import { useEffect, useState, useRef } from "react";
export default function CamaraDetection({ cerrarCamara }) {
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let mediaStream = null;

  const [load, setLoader] = useState(false);
  //Conceptos
  useEffect(() => {
    // ObtenerPreguntas();
    Simon();
  }, []);

  //Usar esta funcion para capturar la imagen y devolverla al componente padre
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    //enviar a la API POR EJEMPLO xd
    console.log(imageSrc);
  };
  /** PARA LA WEBCAM */
  const [videoElement, setVideoElement] = useState(); //
  //Funcion para obtener los resultados del procesamiento de mediapipe
  const [canvasIsReady, setCanvasIsReady] = useState(false);
  const [canvasHaveLandmarks, setcanvasHaveLandmarks] = useState(false);
  const [canvasCtx1, setcanvasCtx1] = useState(null);
  const [canvasElement1, setcanvasElement1] = useState(null);
  const [hands, setHands] = useState(null);
  const Simon = async () => {
    const videoElement = document.getElementsByClassName("input_video")[0];
    const canvasElement = document.getElementsByClassName("output_canvas")[0];
    const canvasCtx = canvasElement.getContext("2d");
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error al encender la cámara:", error);
    }
    setcanvasCtx1(canvasCtx);
    setcanvasElement1(canvasElement);
    //let canvasIsReady = false;
    //let canvasHaveLandmarks = false;
    //FUEnviarSocker();
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
    document.addEventListener("DOMContentLoaded", () => {
      const hands2 = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });
      setHands(hands2);
      hands.setOptions({
        maxNumHands: 2, //Número máximo de manos aceptables o que se captaran
        modelComplexity: 1, //1 prioriza la captación antes que la velocidad, menor valor prioriza velocidad
        minDetectionConfidence: 0.6, //Menor valor prioriza detección menos optima, mayor valor prioriza la detección
        minTrackingConfidence: 0.6, //Menor valor prioriza el seguimiento menos optimo, mayor valor prioriza el seguimiento correcto
      });
      hands.onResults(onResults);
    });

    //Establecer los parametros utilizados para la configuracion de mediapipe

    //Definir el metodo de los resultados que equivale a la captacion del video

    //Definir la captacion de video de la camara y empezarla
    document.addEventListener("DOMContentLoaded", () => {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    });

    //Adaptar el canvas cuando cargue la camara
    videoElement.addEventListener("loadedmetadata", () => {
      const videoDimensions = videoElement.getBoundingClientRect();
      canvasElement.style.width = videoDimensions.width + "px";
      canvasElement.style.height = videoDimensions.height + "px";
    });
  };

  return (
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
      {/* PARA LOS VIDEOS*/}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
        <div key={1} className="rounded-2xl  shadow-2xl cursor-pointer">
          <Typography variant="h3" color="black">
            Cámara
          </Typography>
          <video className="input_video" ref={videoRef}></video>
        </div>
        <div key={1} className="rounded-2xl  shadow-2xl cursor-pointer">
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
          onClick={() => alert("Aqui se tiene que enviar la imagen ")}
        >
          <PlusCircleIcon className="h-7 w-7" />
          <p className="mt-1">"Agregar imagen"</p>
        </Button>
      </>
    </>
  );
}
