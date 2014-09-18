define([
  'm2v/vexflow-overrides',
  'msv/core/Logger',
  'msv/core/Viewer',
  'msv/areas/AbstractAreaCollection',
  'msv/areas/DefaultAreaCollection',
  'msv/core/overrides',
  'm2v/core/Util'
], function (Logger, Viewer, AbstractAreaCollection, DefaultAreaCollection, overrides, Util) {

  window.MSV = {
    Viewer : Viewer,
    Logger : Logger,
    AbstractAreaCollection : AbstractAreaCollection,
    DefaultAreaCollection : DefaultAreaCollection,
    Util : Util
  };

});