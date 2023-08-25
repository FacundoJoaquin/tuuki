
export const GetLocation = () => {
  return new Promise((resolve, reject) => {
    const location = {
      latitude: 0,
      longitude: 0,
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          location.latitude = position.coords.latitude;
          location.longitude = position.coords.longitude;
          resolve(location);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          reject(error);
        }
      );
    } else {
      console.error("Geolocalización no disponible");
      reject("Geolocalización no disponible");
    }
  });
};

export const Type = () => {

  return (
    <div>Type</div>
  )
}

