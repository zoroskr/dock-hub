import Publicacion from "@/components/ui/Publicacion";



export default function Home() {
  const titulos = ["Bora 1", "Bora 2", "Bora 3", "Bora 4", "Bora 5","Bora 6"];
  return (
      <div className="max-w-screen-xl mx-auto flex flex-wrap">
      <div className="w-1/4 p-4 flex items-center justify-center">
        {/* Aquí va el video */}
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <video src="/yateMate.mp4" autoPlay muted loop className="object-cover" width="320" height="180" />
        </div>
      </div>
      <div className="w-3/4 p-4 flex items-center justify-center">
        {/* Aquí van las publicaciones */}
        <div className="flex flex-wrap justify-center">
          {titulos.map((titulo, index) => (
            <div className="w-1/3 p-2" key={index}>
              <Publicacion title={titulo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
