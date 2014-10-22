define([
  'mei2vf/vexflow-overrides',
  'common/Logger',
  'msv/core/Viewer',
  'msv/areas/AbstractAreaCollection',
  'msv/areas/DefaultAreaCollection'
], function (vf_overrides, Logger, Viewer, AbstractAreaCollection, DefaultAreaCollection, overrides, Util) {

  window.MSV = {
    Viewer : Viewer,
    Logger : Logger,
    AbstractAreaCollection : AbstractAreaCollection,
    DefaultAreaCollection : DefaultAreaCollection,
    Util : Util
  };

});