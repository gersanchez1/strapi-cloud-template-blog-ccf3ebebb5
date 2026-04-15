module.exports = ({ env }) => ({
  'rest-cache': {
    config: {
      provider: {
        name: 'memory', // O 'redis' para mayor estabilidad
        options: {
          max: 32767,
          maxAge: 3600000, // 1 hora en milisegundos (ajusta según necesites)
        },
      },
      strategy: {
        contentTypes: [
          // Lista aquí los UIDs de tus componentes o colecciones
          'api::articulo.articulo', 
        ],
      },
    },
  },
});