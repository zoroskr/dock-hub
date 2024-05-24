import Swal from "sweetalert2";

export const getUsers = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el usuario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el usuario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el usuario');
    }
    const data = await response.json();
    const result = data.find(user => user.email === email);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const createUser = async (user) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('No se pudo crear el usuario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('No se pudo actualizar el usuario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error.message,
    });
  }
}
