class InputPipelineFile {
  constructor(file) {
    this.original = file;
    _.extend(this, _.omit(file, 'getContentsAsString'));
  }
  getContentsAsString() {
    if (!this._content) {
      this._content = this.original.getContentsAsString(arguments);
    }
    return this._content;
  }
  setContentAsString(content) {
    this._content = content;
  }
};

Pipeline = class PipelineClass {
  constructor() {
    this.pipeline = [];
  }
  compileOneFile(_inputFiles) {
    inputFiles = [];
    for(let file of _inputFiles) {
      inputFiles.push(new InputPipelineFile(file));
    }
    for(let step of this.pipeline) {
      if (step.compileOneFile) {
        step.compileOneFile(inputFiles);
      }
    }
  }
  processFilesForTarget(_inputFiles) {
    inputFiles = [];
    for(let file of _inputFiles) {
      inputFiles.push(new InputPipelineFile(file));
    }
    for(let step of this.pipeline) {
      if (step.processFilesForTarget) {
        step.processFilesForTarget(inputFiles);
      }
    }
  }
  setDiskCacheDirectory(diskCache) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.setDiskCacheDirectory) {
      return step.setDiskCacheDirectory(diskCache);
    }
  }
  sourceMapSize(sm) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.sourceMapSize) {
      return step.sourceMapSize(sm);
    }
  }
  parseCompileResult(stringifiedCompileResult) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.parseCompileResult) {
      return step.parseCompileResult(stringifiedCompileResult);
    }
  }
  stringifyCompileResult(compileResult) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.stringifyCompileResult) {
      return step.stringifyCompileResult(compileResult);
    }
  }
  compileResultSize(compileResult) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.compileResultSize) {
      return step.compileResultSize(compileResult);
    }
  }
  addCompileResult(inputFile, compileResult) {
    for(let step of this.pipeline) {
      if (step.addCompileResult) {
        step.addCompileResult(compileResult);
      }
    }
  }
  getCacheKey(inputFile) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.getCacheKey) {
      return step.getCacheKey(inputFile);
    }
  }
  getAbsoluteImportPath(inputFile) {
    let step = this.pipeline[this.pipeline.length - 1];
    if (step && step.getAbsoluteImportPath) {
      return step.getAbsoluteImportPath(inputFile);
    }
  }
  push(Compiler) {
    this.pipeline.push(new Compiler());
  }
};
