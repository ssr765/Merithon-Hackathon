export const useTimeFormatter = () => {
  function format(segundos: number) {
    const horas = Math.floor(segundos / 3600) // Calcula las horas
    const minutos = Math.floor((segundos % 3600) / 60) // Calcula los minutos
    segundos = segundos % 60 // Calcula los segundos restantes

    // Formatea los números a dos dígitos y concatena
    return [horas.toString().padStart(2, '0'), minutos.toString().padStart(2, '0'), segundos.toString().padStart(2, '0')].join(':')
  }

  return {
    format
  }
}
