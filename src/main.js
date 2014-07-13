define([
  'core/Logger',
  'core/Viewer',
  'areas/AbstractAreaCollection',
  'areas/DefaultAreaCollection',
  'core/overrides'
], function (Logger, Viewer, AbstractAreaCollection, DefaultAreaCollection, overrides) {

  window.MSV = {
    Viewer : Viewer,
    Logger : Logger,
    AbstractAreaCollection : AbstractAreaCollection,
    DefaultAreaCollection : DefaultAreaCollection,
    Util : MEI2VF.Util
  };

});