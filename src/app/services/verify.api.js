import Swal from "sweetalert2";

export const verifyUser = async (user) => {
  let data;
  try {
    const response = await fetch("http://localhost:3000/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    data = await response.json();
    if (data.message === "Forbidden") {
      throw new Error("No fue posible conectarse al servidor de la AFIP para validar que no posea embargos, inténtalo de nuevo más tarde.");
    }
    if (data.status === "inhabilitado") {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: data.message === "Forbidden" ? "Error de conexión" : "Error de validación",
      text: error.message,
    });
  }
}