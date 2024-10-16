import moment from 'moment-timezone';

export const obtenerHoraActual = async () => {
  try {
    const horaActual = moment().tz('America/Mexico_City').format('HH:mm:ss');
    return horaActual;
  } catch (error) {
    throw new Error('No se pudo obtener la hora actual');
  }
};

export const obtenerFechaHoraActual = async () => {
  try {
    const fechaHoraActual = moment().tz('America/Mexico_City').format();
    return fechaHoraActual;
  } catch (error) {
    throw new Error('No se pudo obtener la fecha y hora actual');
  }
};

export const obtenerFechaActual = async () => {
  try {
    const fechaActual = moment().tz('America/Mexico_City').format('YYYY-MM-DD');
    return fechaActual;
  } catch (error) {
    throw new Error('No se pudo obtener la fecha actual');
  }
};

export const sumarMinutos = async (minutos) => {
  try {
    const fechaActual = await obtenerFechaHoraActual();
    const nuevaFecha = moment(fechaActual).add(minutos, 'minutes').format();
    return nuevaFecha;
  } catch (error) {
    throw new Error('No se pudo sumar los minutos a la fecha actual');
  }
};

export const sumarHoras = async (horas) => {
  try {
    const fechaActual = await obtenerFechaHoraActual();
    const nuevaFecha = moment(fechaActual).add(horas, 'hours').format();
    return nuevaFecha;
  } catch (error) {
    throw new Error('No se pudo sumar las horas a la fecha actual');
  }
};

export const calcularMes = async () => {
  try {
    const mes = moment().tz('America/Mexico_City').format('M');
    return mes;
  } catch (error) {
    throw new Error('No se pudo calcular el mes actual');
  }
};




export const sumarMeses = async (meses) => {
  try {
    const fechaActual = await obtenerFechaHoraActual();
    const nuevaFecha = moment(fechaActual).add(meses, 'months').format();
    return nuevaFecha;
  } catch (error) {
    throw new Error('No se pudo sumar los meses a la fecha actual');
  }
};

export const sumarDias = async (dias) => {
  try {
    const fechaActual = await obtenerFechaHoraActual();
    const nuevaFecha = moment(fechaActual).add(dias, 'days').format();
    return nuevaFecha;
  } catch (error) {
    throw new Error('No se pudo sumar los días a la fecha actual');
  }
};

export const calcularFechaVencimiento = async (tipoMembresiaID) => {
  console.log("tipoMembresiaID", tipoMembresiaID)
  try {
    switch (tipoMembresiaID) {
      case 'Membresia30D':
        return await sumarMeses(1);
      case 'Membresia15D':
        return await sumarDias(15);
      case 'Membresia1D':
        return await sumarDias(1);
      default:
        throw new Error('Tipo de membresía desconocido');
    }
  } catch (error) {
    throw new Error('No se pudo calcular la fecha de vencimiento de la membresía');
  }
};