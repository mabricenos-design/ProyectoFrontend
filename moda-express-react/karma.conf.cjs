module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter')
    ],
    files: [
      { pattern: 'src/data/**/*.js', type: 'module' },
      { pattern: 'src/tests/**/*.spec.js', type: 'module' }
    ],
    reporters: ['progress', 'kjhtml'], // 'kjhtml' activa la interfaz visual de Jasmine
    browsers: [],
    singleRun: false, // Debe estar en false para mantener la página abierta
    autoWatch: true,
    client: {
      clearContext: false // Deja visibles los resultados de Jasmine en la pantalla
    }
  });
};