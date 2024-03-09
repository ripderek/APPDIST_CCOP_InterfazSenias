import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export default function TestSenia() {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const runHandSignDetection = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await video.play();

      //const model = await tf.loadGraphModel("https://tu-api.com/modelo");

      const detectHandSign = () => {
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, video.width, video.height);
        const imageData = context.getImageData(0, 0, video.width, video.height);

        // Preprocesamiento de la imagen (puede variar según el modelo)
        //const preprocessedImage = preprocessImage(imageData);

        // Pasar la imagen preprocesada al modelo para la detección
        //const prediction = model.predict(preprocessedImage);

        // Mostrar la predicción en la interfaz de usuario o hacer algo con ella
        // console.log(prediction);

        // Llamar recursivamente para seguir detectando
        requestAnimationFrame(detectHandSign);
      };

      requestAnimationFrame(detectHandSign);
    };

    runHandSignDetection();
  }, []);

  const preprocessImage = (imageData) => {
    // Preprocesamiento de imagen para adaptarse al modelo (por ejemplo, redimensionar, normalizar, etc.)
    return tf.tensor3d([...preprocessedImageData]);
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
    </div>
  );
}
