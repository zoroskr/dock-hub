import Swal from "sweetalert2";

export const verifyUser = async (user) => {
  try {
    const response = await fetch("http://localhost:3000/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "TcWtLz6t38akcV9uG1gKg4z4vgM6fbdt4U9BgGXR",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.status !== "ok") {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Inhabilitado",
      text: error.message,
    });
  }
}