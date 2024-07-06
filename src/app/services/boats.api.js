export const getBoats = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/boats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  export const getBoat = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/boats/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  export const createBoat = async (newBoat) => {
    try {
      const response = await fetch(`http://localhost:3000/api/boats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoat),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  export const updateBoat = async (id, newFields) => {
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