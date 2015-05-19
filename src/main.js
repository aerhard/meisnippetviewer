define([
  'vexflow',
  'common/Logger',
  'msv/core/Viewer',
  'msv/areas/AbstractAreaCollection',
  'msv/areas/DefaultAreaCollection',
  'common/Util'
], function (VF, Logger, Viewer, AbstractAreaCollection, DefaultAreaCollection, Util) {

  window.MSV = {
    Viewer : Viewer,
    Logger : Logger,
    AbstractAreaCollection : AbstractAreaCollection,
    DefaultAreaCollection : DefaultAreaCollection,
    Util : Util
  };

});