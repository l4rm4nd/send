const TailwindExtractor = content => {
  return content.match(/[A-Za-z0-9-_:/]+/g) || [];
};

let tailwindConfigFile = './tailwind.config.js'; // Default to the standard configuration file

if (process.env.FORCE_DARK_MODE === 'true') {
  tailwindConfigFile = './tailwind-dark.config.js'; // Use dark mode configuration
} else if (process.env.FORCE_LIGHT_MODE === 'true') {
  tailwindConfigFile = './tailwind-light.config.js'; // Use light mode configuration
}

const options = {
  plugins: [
    require('postcss-preset-env'),
    require('tailwindcss')(tailwindConfigFile)
  ]
};

if (process.env.NODE_ENV === 'development') {
  options.map = { inline: true };
} else {
  options.plugins.push(
    require('@fullhuman/postcss-purgecss')({
      content: [
        './app/*.js',
        './app/ui/*.js',
        './android/*.js',
        './android/pages/*.js'
      ],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['js']
        }
      ]
    })
  );
}

module.exports = options;
