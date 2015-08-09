Package.describe({
  name: 'pipeline:core',
  version: '0.0.1',
  summary: 'Build Pipeline',
  git: 'https://github.com/MeteorPipeline/core',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use(['caching-compiler', 'ecmascript', 'underscore']);
  api.addFiles('pipeline.js');
  api.export('Pipeline');
});

Package.onTest(function(api) {
  api.use(["tinytest", "underscore"]);
  api.use(["pipeline:core"]);
});
