import Swal from 'sweetalert2';

export const getPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/bienes');
    if (!response.ok) {
      throw new Error('No se pudo obtener los posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getPost = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/bienes/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el post');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createPost = async (post) => {
  try {
    const response = await fetch('http://localhost:3000/api/bienes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      throw new Error('No se pudo crear el post');
    }
    const data = await response.json();
    Swal.fire({
      icon: 'success',
      title: 'Publicación Creada',
      showConfirmButton: false,
      timer: 1500
    })
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al crear la publicación',
      showConfirmButton: false,
      timer: 1500
    })
    console.error(error);
  }
}

export const updatePost = async (id, post) => {
  try {
    const response = await fetch(`http://localhost:3000/api/bienes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      throw new Error('No se pudo actualizar el post');
    }
    const data = await response.json();
    Swal.fire({
      icon: 'success',
      title: 'Publicación Aprobada',
      showConfirmButton: false,
      timer: 1500
    })
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar la publicación',
      showConfirmButton: false,
      timer: 1500
    })
    console.error(error);
  }
}

export const deletePost = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/bienes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el post');
    }
    const data = await response.json();
    Swal.fire({
      icon: 'success',
      title: 'Publicación Denegada',
      showConfirmButton: false,
      timer: 1500
    })
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al eliminar la publicación',
      showConfirmButton: false,
      timer: 1500
    })
    console.error(error);
  }
}