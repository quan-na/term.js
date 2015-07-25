/*
 * Display an on-screen keyboard for term.js 
 */
var onScreenKb = function() {
  var _self = {};
  var _element = document.body;
  var _kbLayout = [
      {glyph:'esc', code:27, css_class:'escape function'},
      {glyph:'F1', code:112, css_class:'function'},
      {glyph:'F2', code:113, css_class:'function'},
      {glyph:'F3', code:114, css_class:'function'},
      {glyph:'F4', code:115, css_class:'function'},
      {glyph:'F5', code:116, css_class:'function'},
      {glyph:'F6', code:117, css_class:'function'},
      {glyph:'F7', code:118, css_class:'function'},
      {glyph:'F8', code:119, css_class:'function'},
      {glyph:'F9', code:120, css_class:'function'},
      {glyph:'F10', code:121, css_class:'function'},
      {glyph:'F11', code:122, css_class:'function'},
      {glyph:'F12', code:123, css_class:'function'},
      {glyph:'^C', special:'control-c', css_class:'function'},
      {glyph:'^Z', special:'control-z', css_class:'function'},
      {glyph:'^G', special:'control-g', css_class:'function'},
      {glyph:'Del', code:46, css_class:'delete function'},
      {glyph:'`', code:192, off_glyph:'~', css_class:'symbol'},
      {glyph:'1', code:49, off_glyph:'!', css_class:'symbol'},
      {glyph:'2', code:50, off_glyph:'@', css_class:'symbol'},
      {glyph:'3', code:51, off_glyph:'#', css_class:'symbol'},
      {glyph:'4', code:52, off_glyph:'$', css_class:'symbol'},
      {glyph:'5', code:53, off_glyph:'%', css_class:'symbol'},
      {glyph:'6', code:54, off_glyph:'^', css_class:'symbol'},
      {glyph:'7', code:55, off_glyph:'&', css_class:'symbol'},
      {glyph:'8', code:56, off_glyph:'*', css_class:'symbol'},
      {glyph:'9', code:57, off_glyph:'(', css_class:'symbol'},
      {glyph:'0', code:48, off_glyph:')', css_class:'symbol'},
      {glyph:'-', code:173, off_glyph:'_', css_class:'symbol'},
      {glyph:'=', code:61, off_glyph:'+', css_class:'symbol'},
      {glyph:'⌫', code:8, css_class:'backspace'},
      {glyph:'Home', code:36, css_class:'home'},
      {glyph:'Tab', code:9, css_class:'tab'},
      {glyph:'Q', code:81, css_class:'letter'},
      {glyph:'W', code:87, css_class:'letter'},
      {glyph:'E', code:69, css_class:'letter'},
      {glyph:'R', code:82, css_class:'letter'},
      {glyph:'T', code:84, css_class:'letter'},
      {glyph:'Y', code:89, css_class:'letter'},
      {glyph:'U', code:85, css_class:'letter'},
      {glyph:'I', code:73, css_class:'letter'},
      {glyph:'O', code:79, css_class:'letter'},
      {glyph:'P', code:80, css_class:'letter'},
      {glyph:'[', code:219, off_glyph:'{', off_code:0, css_class:'symbol'},
      {glyph:']', code:221, off_glyph:'}', off_code:0, css_class:'symbol'},
      {glyph:'\\', code:220, off_glyph:'|', off_code:0, css_class:'symbol'},
      {glyph:'PgUp', code:33, css_class:'page-up'},
      {glyph:'Caplock', special:'caplock', css_class:'caplock'},
      {glyph:'A', code:65, css_class:'letter'},
      {glyph:'S', code:83, css_class:'letter'},
      {glyph:'D', code:68, css_class:'letter'},
      {glyph:'F', code:70, css_class:'letter'},
      {glyph:'G', code:71, css_class:'letter'},
      {glyph:'H', code:72, css_class:'letter'},
      {glyph:'J', code:74, css_class:'letter'},
      {glyph:'K', code:75, css_class:'letter'},
      {glyph:'L', code:76, css_class:'letter'},
      {glyph:';', code:0, off_glyph:':', off_code:0, css_class:'symbol'},
      {glyph:'\'', code:0, off_glyph:'"', off_code:0, css_class:'symbol'},
      {glyph:'↵', code:13, css_class:'enter'},
      {glyph:'PgDn', code:34, css_class:'page-down'},
      {glyph:'Shift', special:'shift', css_class:'right-shift'},
      {glyph:'Z', code:90, css_class:'letter'},
      {glyph:'X', code:88, css_class:'letter'},
      {glyph:'C', code:67, css_class:'letter'},
      {glyph:'V', code:86, css_class:'letter'},
      {glyph:'B', code:66, css_class:'letter'},
      {glyph:'N', code:78, css_class:'letter'},
      {glyph:'M', code:77, css_class:'letter'},
      {glyph:',', code:0, off_glyph:'<', off_code:0, css_class:'symbol'},
      {glyph:'.', code:0, off_glyph:'>', off_code:0, css_class:'symbol'},
      {glyph:'/', code:0, off_glyph:'?', off_code:0, css_class:'symbol'},
      {glyph:'Shift', special:'shift', css_class:'left-shift'},
      {glyph:'End', code:35, css_class:'end'},
      {glyph:'Ctrl', special:'ctrl', css_class:'right-control'},
      {glyph:'Fn', special:'function', css_class:'function-x'},
      {glyph:'⌘', special:'meta', css_class:'meta'},
      {glyph:'Alt', special:'alt', css_class:'right-alt'},
      {glyph:'↔', code:32, css_class:'space'},
      {glyph:'Alt', special:'alt', css_class:'left-alt'},
      {glyph:'Ctrl', special:'ctrl', css_class:'left-control'},
      {glyph:'←', code:37, css_class:'arrow'},
      {glyph:'↓', code:40, css_class:'arrow'},
      {glyph:'↑', code:38, css_class:'arrow'},
      {glyph:'→', code:39, css_class:'arrow'}
    ];
  var _termObj;
  var _flashButton = function(buttonEle) {
    buttonEle.style.backgroundColor = 'white';
    setTimeout(function(){ buttonEle.style.backgroundColor = ''; }, 200);
  }
  var _specialBtnLists = {
    shift:[],
    ctrl:[],
    alt:[],
    meta:[],
    caplock:[]
  };
  var _specialBtnStatus = {
    shift:false,
    ctrl:false,
    alt:false,
    meta:false,
    caplock:false
  };
  var _specialBtns = ['shift','ctrl','alt','meta','caplock'];
  var _showSpecials = function() {
    for (var i=0; i<_specialBtns.length; i++) {
      var color = '';
      if (_specialBtnStatus[_specialBtns[i]])
        color = "white";
      for (var j=0; j<_specialBtnLists[_specialBtns[i]].length; j++)
        _specialBtnLists[_specialBtns[i]][j].style.backgroundColor = color;
    }
  };
  var _changeSpecial = function(key) {
    _specialBtnStatus[key] = !_specialBtnStatus[key];
    _showSpecials();
  };
  var _reflectSpecials = function(ev) {
    if ((ev.keyCode >= 65 && ev.keyCode <= 90 && _specialBtnStatus.caplock)||_specialBtnStatus.shift)
      ev.shiftKey = true;
    if (_specialBtnStatus.ctrl)
      ev.ctrlKey = true;
    if (_specialBtnStatus.alt)
      ev.altKey = true;
    if (_specialBtnStatus.meta)
      ev.metaKey = true;
    _specialBtnStatus.shift = _specialBtnStatus.ctrl = _specialBtnStatus.alt = _specialBtnStatus.meta = false;
    _showSpecials();
    return ev;
  };
  _self.layout = function(newLayout) {
    if (typeof(newLayout) == 'object')
      _kbLayout = newLayout;
    return _self;
  };
  _self.setTerm = function(termObj) {
    _termObj = termObj;
    return _self;
  }
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
        if (typeof(_kbLayout[i].special) === 'string') {
          // Special keys
          switch(_kbLayout[i].special) {
            case 'control-c':
              keyEle.addEventListener('click', function() {
                _flashButton(this);
                _termObj.keyDown({keyCode:67,ctrlKey:true});
              });
              break;
            case 'control-z':
              keyEle.addEventListener('click', function() {
                _flashButton(this);
                _termObj.keyDown({keyCode:90,ctrlKey:true});
              });
              break;
            case 'control-g':
              keyEle.addEventListener('click', function() {
                _flashButton(this);
                _termObj.keyDown({keyCode:71,ctrlKey:true});
              });
              break;
            case 'shift':
              _specialBtnLists.shift.push(keyEle);
              keyEle.addEventListener('click', function() {
                _changeSpecial('shift');
              });
              break;
            case 'ctrl':
              _specialBtnLists.ctrl.push(keyEle);
              keyEle.addEventListener('click', function() {
                _changeSpecial('ctrl');
              });
              break;
            case 'alt':
              _specialBtnLists.alt.push(keyEle);
              keyEle.addEventListener('click', function() {
                _changeSpecial('alt');
              });
              break;
            case 'caplock':
              _specialBtnLists.caplock.push(keyEle);
              keyEle.addEventListener('click', function() {
                _changeSpecial('caplock');
              });
              break;
            case 'function':
              break;
            case 'meta':
              _specialBtnLists.meta.push(keyEle);
              keyEle.addEventListener('click', function() {
                _changeSpecial('meta');
              });
              break;
          }
        } else if (typeof(_kbLayout[i].code) === 'number') {
          // Normal keys
          (function (kcode) {
            keyEle.addEventListener('click', function() {
              _flashButton(this);
              _termObj.keyDown(_reflectSpecials({keyCode:kcode}));
            });
          })(_kbLayout[i].code);
        }
      }
    }
    // Attach to container
    _element.innerHTML = '';
    _element.appendChild(keyboardEle);
  };
  return _self;
}