import Swal from "sweetalert2";

export const getChats = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/chats`);
    if (!response.ok) {
      throw new Error('No se pudo obtener los chats');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getChat = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/chats/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el chat');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createChat = async (chat) => {
  try {
    const response = await fetch(`http://localhost:3000/api/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chat)
    });
    if (!response.ok) {
      throw new Error('No se pudo crear el chat');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteChat = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/chats/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el chat');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateChat = async (id, chat) => {
  try {
    const response = await fetch(`http://localhost:3000/api/chats/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chat)
    });
    if (!response.ok) {
      throw new Error('No se pudo actualizar el chat');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}