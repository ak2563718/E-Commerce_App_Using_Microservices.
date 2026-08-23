'use client'
import { useEffect, useRef } from "react";
// @ts-expect-error qrcode does not provide TypeScript declarations
import QRCode from 'qrcode'

export default function QRCodeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const url = "https://google.com";

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 250,
          margin: 2,
        },
        (error:any) => {
          if (error) console.error(error);
        }
      );
    }
  }, []);

  return (
    <div>
      <h2>Scan this QR code</h2>

      <canvas ref={canvasRef} />

      <p>{url}</p>
    </div>
  );
}