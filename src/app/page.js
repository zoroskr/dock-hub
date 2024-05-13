import Publicacion from "@/components/ui/Publicacion";

export default async function Home() {
  let response = await fetch('http://localhost:3000/api/bienes', {
    method: 'GET',
  });
  let posts = await response.json();
  console.log(posts);
  return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-7xl">
          <video src='/yateMate.mp4' autoplay controls muted className="w-full"></video>
          <div className="flex flex-wrap" style={{marginTop: 20}}>
          {posts.map(post => (
            <Publicacion key={post._id} post={post}></Publicacion>
          ))}
          </div>
        </div>
      </div>
  );
}
