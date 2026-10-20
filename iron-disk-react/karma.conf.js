// Configuracion de Karma y Jasmine para probar los componentes
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: false,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // Mide la cobertura solo del codigo propio, no de las pruebas
                plugins: [['istanbul', { exclude: ['**/*.spec.js'] }]],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text', subdir: '.', file: 'resumen.txt' },
      ],
    },
    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    singleRun: true,
  });
};
