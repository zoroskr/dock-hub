import Navbar from "@/components/ui/Navbar";
import Publicacion from "@/components/ui/Publicacion";

export default function Home() {
  const titulos = ["Título 1", "Título 2", "Título 3", "Título 4", "Título 5"];
  return (
    <div> 
      <Navbar></Navbar>
      
      {titulos.map((titulo) => (<Publicacion title={titulo}></Publicacion>))}
    </div>
  );
}
