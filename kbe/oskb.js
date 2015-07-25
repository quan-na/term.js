/*
 * Display an on-screen keyboard for term.js 
 */
var onScreenKb = function() {
  var _self = {};
  var _element = document.body;
  var _kbLayout = [
      {glyph:'esc', special:'esc', css_class:'escape function'},
      {glyph:'F1', special:'f1', css_class:'function'},
      {glyph:'F2', special:'f2', css_class:'function'},
      {glyph:'F3', special:'f3', css_class:'function'},
      {glyph:'F4', special:'f4', css_class:'function'},
      {glyph:'F5', special:'f5', css_class:'function'},
      {glyph:'F6', special:'f6', css_class:'function'},
      {glyph:'F7', special:'f7', css_class:'function'},
      {glyph:'F8', special:'f8', css_class:'function'},
      {glyph:'F9', special:'f9', css_class:'function'},
      {glyph:'F10', special:'f10', css_class:'function'},
      {glyph:'F11', special:'f11', css_class:'function'},
      {glyph:'F12', special:'f12', css_class:'function'},
      {glyph:'^C', css_class:'function'},
      {glyph:'^Z', css_class:'function'},
      {glyph:'^G', css_class:'function'},
      {glyph:'Del', special:'del', css_class:'delete function'},
      {glyph:'`', code:0, off_glyph:'~', off_code:0, css_class:'symbol'},
      {glyph:'1', code:0, off_glyph:'!', off_code:0, css_class:'symbol'},
      {glyph:'2', code:0, off_glyph:'@', off_code:0, css_class:'symbol'},
      {glyph:'3', code:0, off_glyph:'#', off_code:0, css_class:'symbol'},
      {glyph:'4', code:0, off_glyph:'$', off_code:0, css_class:'symbol'},
      {glyph:'5', code:0, off_glyph:'%', off_code:0, css_class:'symbol'},
      {glyph:'6', code:0, off_glyph:'^', off_code:0, css_class:'symbol'},
      {glyph:'7', code:0, off_glyph:'&', off_code:0, css_class:'symbol'},
      {glyph:'8', code:0, off_glyph:'*', off_code:0, css_class:'symbol'},
      {glyph:'9', code:0, off_glyph:'(', off_code:0, css_class:'symbol'},
      {glyph:'0', code:0, off_glyph:')', off_code:0, css_class:'symbol'},
      {glyph:'-', code:0, off_glyph:'_', off_code:0, css_class:'symbol'},
      {glyph:'=', code:0, off_glyph:'+', off_code:0, css_class:'symbol'},
      {glyph:'⌫', special:'bckspc', css_class:'backspace'},
      {glyph:'Home', special:'home', css_class:'home'},
      {glyph:'Tab', special:'tab', css_class:'tab'},
      {glyph:'Q', code:0, css_class:'letter'},
      {glyph:'W', code:0, css_class:'letter'},
      {glyph:'E', code:0, css_class:'letter'},
      {glyph:'R', code:0, css_class:'letter'},
      {glyph:'T', code:0, css_class:'letter'},
      {glyph:'Y', code:0, css_class:'letter'},
      {glyph:'U', code:0, css_class:'letter'},
      {glyph:'I', code:0, css_class:'letter'},
      {glyph:'O', code:0, css_class:'letter'},
      {glyph:'P', code:0, css_class:'letter'},
      {glyph:'[', code:0, off_glyph:'{', off_code:0, css_class:'symbol'},
      {glyph:']', code:0, off_glyph:'}', off_code:0, css_class:'symbol'},
      {glyph:'\\', code:0, off_glyph:'|', off_code:0, css_class:'symbol'},
      {glyph:'PgUp', special:'pgup', css_class:'page-up'},
      {glyph:'Caplock', special:'caplock', css_class:'caplock'},
      {glyph:'A', code:0, css_class:'letter'},
      {glyph:'S', code:0, css_class:'letter'},
      {glyph:'D', code:0, css_class:'letter'},
      {glyph:'F', code:0, css_class:'letter'},
      {glyph:'G', code:0, css_class:'letter'},
      {glyph:'H', code:0, css_class:'letter'},
      {glyph:'J', code:0, css_class:'letter'},
      {glyph:'K', code:0, css_class:'letter'},
      {glyph:'L', code:0, css_class:'letter'},
      {glyph:';', code:0, off_glyph:':', off_code:0, css_class:'symbol'},
      {glyph:'\'', code:0, off_glyph:'"', off_code:0, css_class:'symbol'},
      {glyph:'↵', special:'enter', css_class:'enter'},
      {glyph:'PgDn', special:'pgdn', css_class:'page-down'},
      {glyph:'Shift', special:'shift', css_class:'right-shift'},
      {glyph:'Z', code:0, css_class:'letter'},
      {glyph:'X', code:0, css_class:'letter'},
      {glyph:'C', code:0, css_class:'letter'},
      {glyph:'V', code:0, css_class:'letter'},
      {glyph:'B', code:0, css_class:'letter'},
      {glyph:'N', code:0, css_class:'letter'},
      {glyph:'M', code:0, css_class:'letter'},
      {glyph:',', code:0, off_glyph:'<', off_code:0, css_class:'symbol'},
      {glyph:'.', code:0, off_glyph:'>', off_code:0, css_class:'symbol'},
      {glyph:'/', code:0, off_glyph:'?', off_code:0, css_class:'symbol'},
      {glyph:'Shift', special:'shift', css_class:'left-shift'},
      {glyph:'End', special:'end', css_class:'end'},
      {glyph:'Ctrl', special:'ctrl', css_class:'right-control'},
      {glyph:'Fn', css_class:'not-used'},
      {glyph:'⌘', css_class:'not-used'},
      {glyph:'Alt', special:'alt', css_class:'right-alt'},
      {glyph:'↔', special:'space', css_class:'space'},
      {glyph:'Alt', special:'alt', css_class:'left-alt'},
      {glyph:'Ctrl', special:'ctrl', css_class:'left-control'},
      {glyph:'←', special:'left', css_class:'arrow'},
      {glyph:'↓', special:'down', css_class:'arrow'},
      {glyph:'↑', special:'up', css_class:'arrow'},
      {glyph:'→', special:'right', css_class:'arrow'}
    ];
  _self.layout = function(newLayout) {
    if (typeof(newLayout) == 'object')
      _kbLayout = newLayout;
  };
  _self.render = function(element) {
    if (typeof(element) == 'string')
      _element = document.getElementById(element);
    else if (typeof(element) == 'object')
      _element = element;
    // Create ul/li elements
    var keyboardEle = document.createElement("ul");
    keyboardEle.id = "keyboard";
    for (var i=0; i<_kbLayout.length; i++) {
      if (typeof(_kbLayout[i]) == 'object') {
        var keyEle = document.createElement("li");
        keyEle.className = _kbLayout[i].css_class;
        keyEle.appendChild(document.createTextNode(_kbLayout[i].glyph));
        if (typeof(_kbLayout[i].off_glyph) == 'string') {
          var keyOffGlyph = document.createElement("span");
          keyOffGlyph.className = "off-glyph";
          keyOffGlyph.appendChild(document.createTextNode(_kbLayout[i].off_glyph));
          keyEle.appendChild(keyOffGlyph);
        }
        keyboardEle.appendChild(keyEle);
      }
    }
    // Attach to container
    _element.appendChild(keyboardEle);
  };
  return _self;
}