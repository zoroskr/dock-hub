import Publicacion from "@/components/ui/Publicacion";

export default function Home() {
  const titulos = ["Bora 1", "Bora 2", "Bora 3", "Bora 4", "Bora 5","Bora 6"];
  return (
      <div className="max-w-screen-xl flex flex-wrap justify-between">
        <div className="w-1/5 p-2 flex items-center">
          {/* Aquí va el video */}
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <video src="/yateMate.mp4" autoPlay muted loop className="object-cover rounded-xl " width="320" height="180" />
          </div>
        </div>
        <div className="w-4/5 p-2 flex items-center">
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
