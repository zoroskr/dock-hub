import Publicacion from "@/components/ui/Publicacion";



export default function Home() {
  const titulos = ["Bora 1", "Bora 2", "Bora 3", "Bora 4", "Bora 5","Bora 6"];
  return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-7xl">
          <video src='/yateMate.mp4' autoplay controls muted className="w-full"></video>
          <div className="flex flex-wrap" style={{marginTop: 20}}>
            {titulos.map((titulo, index) => (
              <Publicacion title={titulo} key={index}></Publicacion>
            ))}
          </div>
        </div>
    </div>
  );
}
