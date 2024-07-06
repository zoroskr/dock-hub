export const getAmarras = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/amarras`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getAmarra = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/amarras/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createAmarra = async (newAmarra) => {
  try {
    const response = await fetch(`http://localhost:3000/api/amarras`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAmarra),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateAmarra = async (id, newFields) => {
  try {
    const response = await fetch(`http://localhost:3000/api/amarras/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFields),
    });
    const data = await response.json();
    console.log("🚀 ~ updateAmarra ~ data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}