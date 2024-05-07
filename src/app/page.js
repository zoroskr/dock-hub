import Publicacion from "@/components/ui/Publicacion";

export default function Home() {
  const titulos = ["Título 1", "Título 2", "Título 3", "Título 4", "Título 5"];
  return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-7xl">
          <div className="flex flex-wrap">
            {titulos.map((titulo, index) => (
              <Publicacion title={titulo} key={index}></Publicacion>
            ))}
          </div>
        </div>
      </div>
  );
}
