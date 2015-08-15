Package.describe({
  name: 'pipeline:core',
  version: '0.1.0',
  summary: 'Build Pipeline',
  git: 'https://github.com/MeteorPipeline/core',
  documentation: null
});

Package.onUse(function(api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use([
    'caching-compiler@1.0.0-rc.0',
    'ecmascript@0.1.3-rc.0',
    'underscore@1.0.4-rc.0']);
  api.addFiles('pipeline.js');
  api.export('Pipeline');
});

Package.onTest(function(api) {
  api.use(["tinytest", "underscore"]);
  api.use(["pipeline:core"]);
});
