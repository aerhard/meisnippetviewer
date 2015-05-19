require.config({
  baseUrl : '../src',
  paths: {
    'msv' : '../src',
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'vex' : '../bower_components/vexflow/releases/vexflow-min',
    'common': '../bower_components/meitovexflow/src/common',
    'mei2vf': '../bower_components/meitovexflow/src/mei2vf',
    'meilib' : '../bower_components/meitovexflow/src/meilib',
    'vexflow' : '../bower_components/meitovexflow/src/mei2vf/vexflow'
  },
  shim : {
    'vex' : {
      exports : 'Vex'
    }
  }
});

