// Obtener datos de la sesión y verificar la expiración
export const getSessionData = () => {
  const storedSession = localStorage.getItem('session');

  if (storedSession) {
    const sessionData = JSON.parse(storedSession);
    const now = new Date().getTime();

    if (now < sessionData.expiration) {
      // La sesión está activa, puedes acceder a sessionData.user
      return sessionData.user;
    } else {
      // La sesión ha expirado, elimina los datos
      localStorage.removeItem('session');
    }
  }

  return null; // No hay sesión activa
};