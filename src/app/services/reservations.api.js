export const createReservation = async (reservation) => {
  console.log("🚀 ~ createReservation ~ reservation:", reservation)
  
  try {
    const response = await fetch(`http://localhost:3000/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    });
    if (!response.ok) {
      throw new Error('No se pudo crear la reserva');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}