define([
  'mei2vf/vexflow-overrides',
  'msv/core/Logger',
  'msv/core/Viewer',
  'msv/areas/AbstractAreaCollection',
  'msv/areas/DefaultAreaCollection',
  'msv/core/overrides',
  'mei2vf/core/Util'
], function (vf_overrides, Logger, Viewer, AbstractAreaCollection, DefaultAreaCollection, overrides, Util) {

  window.MSV = {
    Viewer : Viewer,
    Logger : Logger,
    AbstractAreaCollection : AbstractAreaCollection,
    DefaultAreaCollection : DefaultAreaCollection,
    Util : Util
  };

});