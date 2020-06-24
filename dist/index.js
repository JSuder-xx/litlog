var starter = (function (exports) {
  'use strict';

  var out_of_memory = /* tuple */[
    "Out_of_memory",
    0
  ];

  var sys_error = /* tuple */[
    "Sys_error",
    -1
  ];

  var failure = /* tuple */[
    "Failure",
    -2
  ];

  var invalid_argument = /* tuple */[
    "Invalid_argument",
    -3
  ];

  var end_of_file = /* tuple */[
    "End_of_file",
    -4
  ];

  var division_by_zero = /* tuple */[
    "Division_by_zero",
    -5
  ];

  var not_found = /* tuple */[
    "Not_found",
    -6
  ];

  var match_failure = /* tuple */[
    "Match_failure",
    -7
  ];

  var stack_overflow = /* tuple */[
    "Stack_overflow",
    -8
  ];

  var sys_blocked_io = /* tuple */[
    "Sys_blocked_io",
    -9
  ];

  var assert_failure = /* tuple */[
    "Assert_failure",
    -10
  ];

  var undefined_recursive_module = /* tuple */[
    "Undefined_recursive_module",
    -11
  ];

  out_of_memory.tag = 248;

  sys_error.tag = 248;

  failure.tag = 248;

  invalid_argument.tag = 248;

  end_of_file.tag = 248;

  division_by_zero.tag = 248;

  not_found.tag = 248;

  match_failure.tag = 248;

  stack_overflow.tag = 248;

  sys_blocked_io.tag = 248;

  assert_failure.tag = 248;

  undefined_recursive_module.tag = 248;
  /*  Not a pure module */

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function caml_array_get(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    }
    return xs[index];
  }

  function caml_make_vect(len, init) {
    var b = new Array(len);
    for(var i = 0; i < len; ++i){
      b[i] = init;
    }
    return b;
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      }
      if (d >= 0) {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat([x]));
        }
        }(f,args));
      }
      _args = caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity));
      continue ;
    }}

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1 :
            return o(a0);
        case 2 :
            return (function (param) {
                return o(a0, param);
              });
        case 3 :
            return (function (param, param$1) {
                return o(a0, param, param$1);
              });
        case 4 :
            return (function (param, param$1, param$2) {
                return o(a0, param, param$1, param$2);
              });
        case 5 :
            return (function (param, param$1, param$2, param$3) {
                return o(a0, param, param$1, param$2, param$3);
              });
        case 6 :
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, param, param$1, param$2, param$3, param$4);
              });
        case 7 :
            return (function (param, param$1, param$2, param$3, param$4, param$5) {
                return o(a0, param, param$1, param$2, param$3, param$4, param$5);
              });
        default:
          return app(o, [a0]);
      }
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [a1]);
        case 2 :
            return o(a0, a1);
        case 3 :
            return (function (param) {
                return o(a0, a1, param);
              });
        case 4 :
            return (function (param, param$1) {
                return o(a0, a1, param, param$1);
              });
        case 5 :
            return (function (param, param$1, param$2) {
                return o(a0, a1, param, param$1, param$2);
              });
        case 6 :
            return (function (param, param$1, param$2, param$3) {
                return o(a0, a1, param, param$1, param$2, param$3);
              });
        case 7 :
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, a1, param, param$1, param$2, param$3, param$4);
              });
        default:
          return app(o, [
                      a0,
                      a1
                    ]);
      }
    }
  }

  function _3(o, a0, a1, a2) {
    var arity = o.length;
    if (arity === 3) {
      return o(a0, a1, a2);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2
                      ]);
        case 2 :
            return app(o(a0, a1), [a2]);
        case 3 :
            return o(a0, a1, a2);
        case 4 :
            return (function (param) {
                return o(a0, a1, a2, param);
              });
        case 5 :
            return (function (param, param$1) {
                return o(a0, a1, a2, param, param$1);
              });
        case 6 :
            return (function (param, param$1, param$2) {
                return o(a0, a1, a2, param, param$1, param$2);
              });
        case 7 :
            return (function (param, param$1, param$2, param$3) {
                return o(a0, a1, a2, param, param$1, param$2, param$3);
              });
        default:
          return app(o, [
                      a0,
                      a1,
                      a2
                    ]);
      }
    }
  }

  function _4(o, a0, a1, a2, a3) {
    var arity = o.length;
    if (arity === 4) {
      return o(a0, a1, a2, a3);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [a3]);
        case 4 :
            return o(a0, a1, a2, a3);
        case 5 :
            return (function (param) {
                return o(a0, a1, a2, a3, param);
              });
        case 6 :
            return (function (param, param$1) {
                return o(a0, a1, a2, a3, param, param$1);
              });
        case 7 :
            return (function (param, param$1, param$2) {
                return o(a0, a1, a2, a3, param, param$1, param$2);
              });
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3
                    ]);
      }
    }
  }

  function _5(o, a0, a1, a2, a3, a4) {
    var arity = o.length;
    if (arity === 5) {
      return o(a0, a1, a2, a3, a4);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [a4]);
        case 5 :
            return o(a0, a1, a2, a3, a4);
        case 6 :
            return (function (param) {
                return o(a0, a1, a2, a3, a4, param);
              });
        case 7 :
            return (function (param, param$1) {
                return o(a0, a1, a2, a3, a4, param, param$1);
              });
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4
                    ]);
      }
    }
  }

  function _6(o, a0, a1, a2, a3, a4, a5) {
    var arity = o.length;
    if (arity === 6) {
      return o(a0, a1, a2, a3, a4, a5);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [
                        a4,
                        a5
                      ]);
        case 5 :
            return app(o(a0, a1, a2, a3, a4), [a5]);
        case 6 :
            return o(a0, a1, a2, a3, a4, a5);
        case 7 :
            return (function (param) {
                return o(a0, a1, a2, a3, a4, a5, param);
              });
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      }
    }
  }

  function _7(o, a0, a1, a2, a3, a4, a5, a6) {
    var arity = o.length;
    if (arity === 7) {
      return o(a0, a1, a2, a3, a4, a5, a6);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [
                        a4,
                        a5,
                        a6
                      ]);
        case 5 :
            return app(o(a0, a1, a2, a3, a4), [
                        a5,
                        a6
                      ]);
        case 6 :
            return app(o(a0, a1, a2, a3, a4, a5), [a6]);
        case 7 :
            return o(a0, a1, a2, a3, a4, a5, a6);
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      }
    }
  }

  function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
    var arity = o.length;
    if (arity === 8) {
      return o(a0, a1, a2, a3, a4, a5, a6, a7);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 5 :
            return app(o(a0, a1, a2, a3, a4), [
                        a5,
                        a6,
                        a7
                      ]);
        case 6 :
            return app(o(a0, a1, a2, a3, a4, a5), [
                        a6,
                        a7
                      ]);
        case 7 :
            return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      }
    }
  }
  /* No side effect */

  function __(tag, block) {
    block.tag = tag;
    return block;
  }
  /* No side effect */

  function caml_int_compare(x, y) {
    if (x < y) {
      return -1;
    } else if (x === y) {
      return 0;
    } else {
      return 1;
    }
  }

  function caml_string_compare(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else if (s1 < s2) {
      return -1;
    } else {
      return 1;
    }
  }

  function caml_int_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_float_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }
  /* No side effect */

  var for_in = (function(o,foo){
          for (var x in o) { foo(x); }});

  function caml_lazy_make(fn) {
    var block = [fn];
    block.tag = 246;
    return block;
  }

  function caml_equal(_a, _b) {
    while(true) {
      var b = _b;
      var a = _a;
      if (a === b) {
        return true;
      }
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return false;
      }
      var b_type = typeof b;
      if (a_type === "function" || b_type === "function") {
        throw [
              invalid_argument,
              "equal: functional value"
            ];
      }
      if (b_type === "number" || b_type === "undefined" || b === null) {
        return false;
      }
      var tag_a = a.tag | 0;
      var tag_b = b.tag | 0;
      if (tag_a === 250) {
        _a = a[0];
        continue ;
      }
      if (tag_b === 250) {
        _b = b[0];
        continue ;
      }
      if (tag_a === 248) {
        return a[1] === b[1];
      }
      if (tag_a === 251) {
        throw [
              invalid_argument,
              "equal: abstract value"
            ];
      }
      if (tag_a !== tag_b) {
        return false;
      }
      if (tag_a === 256) {
        return a[1] === b[1];
      }
      var len_a = a.length | 0;
      var len_b = b.length | 0;
      if (len_a === len_b) {
        if (Array.isArray(a)) {
          var _i = 0;
          while(true) {
            var i = _i;
            if (i === len_a) {
              return true;
            }
            if (!caml_equal(a[i], b[i])) {
              return false;
            }
            _i = i + 1 | 0;
            continue ;
          }      } else if ((a instanceof Date && b instanceof Date)) {
          return !(a > b || a < b);
        } else {
          var result = {
            contents: true
          };
          var do_key_a = (function(b,result){
          return function do_key_a(key) {
            if (!b.hasOwnProperty(key)) {
              result.contents = false;
              return ;
            }
            
          }
          }(b,result));
          var do_key_b = (function(a,b,result){
          return function do_key_b(key) {
            if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
              result.contents = false;
              return ;
            }
            
          }
          }(a,b,result));
          for_in(a, do_key_a);
          if (result.contents) {
            for_in(b, do_key_b);
          }
          return result.contents;
        }
      } else {
        return false;
      }
    }}

  function caml_notequal(a, b) {
    return !caml_equal(a, b);
  }

  function caml_obj_set_tag(prim, prim$1) {
    prim.tag = prim$1;
    
  }
  /* No side effect */

  function caml_fill_bytes(s, i, l, c) {
    if (l <= 0) {
      return ;
    }
    for(var k = i ,k_finish = l + i | 0; k < k_finish; ++k){
      s[k] = c;
    }
    
  }

  function caml_create_bytes(len) {
    if (len < 0) {
      throw [
            invalid_argument,
            "String.create"
          ];
    }
    var result = new Array(len);
    for(var i = 0; i < len; ++i){
      result[i] = /* "\000" */0;
    }
    return result;
  }

  function caml_blit_bytes(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return ;
    }
    if (s1 === s2) {
      if (i1 < i2) {
        var range_a = (s1.length - i2 | 0) - 1 | 0;
        var range_b = len - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1[i2 + j | 0] = s1[i1 + j | 0];
        }
        return ;
      }
      if (i1 <= i2) {
        return ;
      }
      var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
      var range_b$1 = len - 1 | 0;
      var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
      for(var k = 0; k <= range$1; ++k){
        s1[i2 + k | 0] = s1[i1 + k | 0];
      }
      return ;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0; i < len; ++i){
        s2[i2 + i | 0] = s1[i1 + i | 0];
      }
      return ;
    }
    for(var i$1 = 0; i$1 < off1; ++i$1){
      s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
    }
    for(var i$2 = off1; i$2 < len; ++i$2){
      s2[i2 + i$2 | 0] = /* "\000" */0;
    }
    
  }

  function bytes_to_string(a) {
    var len = a.length;
    var s = "";
    var s_len = len;
    if ( len <= 4096 && len === a.length) {
      return String.fromCharCode.apply(null, a);
    }
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(a, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }  return s;
  }

  function caml_blit_string(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return ;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0; i < len; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return ;
    }
    for(var i$1 = 0; i$1 < off1; ++i$1){
      s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
    }
    for(var i$2 = off1; i$2 < len; ++i$2){
      s2[i2 + i$2 | 0] = /* "\000" */0;
    }
    
  }

  function bytes_of_string(s) {
    var len = s.length;
    var res = new Array(len);
    for(var i = 0; i < len; ++i){
      res[i] = s.charCodeAt(i);
    }
    return res;
  }
  /* No side effect */

  var imul = (Math.imul || function (x,y) {
    y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
  });
  /* imul Not a pure module */

  function mk(lo, hi) {
    return /* Int64 */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }

  var min_int = /* Int64 */[
    /* hi */-2147483648,
    /* lo */0
  ];

  var max_int = /* Int64 */[
    /* hi */2147483647,
    /* lo */4294967295
  ];

  var one = /* Int64 */[
    /* hi */0,
    /* lo */1
  ];

  var zero = /* Int64 */[
    /* hi */0,
    /* lo */0
  ];

  var neg_one = /* Int64 */[
    /* hi */-1,
    /* lo */4294967295
  ];

  function neg_signed(x) {
    return (x & 2147483648) !== 0;
  }

  function non_neg_signed(x) {
    return (x & 2147483648) === 0;
  }

  function neg(param) {
    var other_lo = (param[/* lo */1] ^ -1) + 1 | 0;
    return mk(other_lo, (param[/* hi */0] ^ -1) + (
                other_lo === 0 ? 1 : 0
              ) | 0);
  }

  function add_aux(param, y_lo, y_hi) {
    var x_lo = param[/* lo */1];
    var lo = x_lo + y_lo | 0;
    var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
    return mk(lo, param[/* hi */0] + y_hi + overflow | 0);
  }

  function add(self, param) {
    return add_aux(self, param[/* lo */1], param[/* hi */0]);
  }

  function eq(x, y) {
    if (x[/* hi */0] === y[/* hi */0]) {
      return x[/* lo */1] === y[/* lo */1];
    } else {
      return false;
    }
  }

  function sub_aux(x, lo, hi) {
    var y_lo = ((lo ^ -1) + 1 >>> 0);
    var y_hi = (hi ^ -1) + (
      y_lo === 0 ? 1 : 0
    ) | 0;
    return add_aux(x, y_lo, y_hi);
  }

  function sub(self, param) {
    return sub_aux(self, param[/* lo */1], param[/* hi */0]);
  }

  function lsl_(x, numBits) {
    if (numBits === 0) {
      return x;
    }
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return mk(0, (lo << (numBits - 32 | 0)));
    } else {
      return mk((lo << numBits), (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits));
    }
  }

  function asr_(x, numBits) {
    if (numBits === 0) {
      return x;
    }
    var hi = x[/* hi */0];
    if (numBits < 32) {
      return mk((hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits), (hi >> numBits));
    } else {
      return mk((hi >> (numBits - 32 | 0)), hi >= 0 ? 0 : -1);
    }
  }

  function is_zero(param) {
    if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
      return false;
    } else {
      return true;
    }
  }

  function mul(_this, _other) {
    while(true) {
      var other = _other;
      var $$this = _this;
      var lo;
      var exit = 0;
      var exit$1 = 0;
      if ($$this[/* hi */0] !== 0) {
        exit$1 = 3;
      } else {
        if ($$this[/* lo */1] === 0) {
          return zero;
        }
        exit$1 = 3;
      }
      if (exit$1 === 3) {
        if (other[/* hi */0] !== 0) {
          exit = 2;
        } else {
          if (other[/* lo */1] === 0) {
            return zero;
          }
          exit = 2;
        }
      }
      if (exit === 2) {
        var this_hi = $$this[/* hi */0];
        var exit$2 = 0;
        if (this_hi !== -2147483648 || $$this[/* lo */1] !== 0) {
          exit$2 = 3;
        } else {
          lo = other[/* lo */1];
        }
        if (exit$2 === 3) {
          var other_hi = other[/* hi */0];
          var lo$1 = $$this[/* lo */1];
          var exit$3 = 0;
          if (other_hi !== -2147483648 || other[/* lo */1] !== 0) {
            exit$3 = 4;
          } else {
            lo = lo$1;
          }
          if (exit$3 === 4) {
            var other_lo = other[/* lo */1];
            if (this_hi < 0) {
              if (other_hi >= 0) {
                return neg(mul(neg($$this), other));
              }
              _other = neg(other);
              _this = neg($$this);
              continue ;
            }
            if (other_hi < 0) {
              return neg(mul($$this, neg(other)));
            }
            var a48 = (this_hi >>> 16);
            var a32 = this_hi & 65535;
            var a16 = (lo$1 >>> 16);
            var a00 = lo$1 & 65535;
            var b48 = (other_hi >>> 16);
            var b32 = other_hi & 65535;
            var b16 = (other_lo >>> 16);
            var b00 = other_lo & 65535;
            var c48 = 0;
            var c32 = 0;
            var c16 = 0;
            var c00 = a00 * b00;
            c16 = (c00 >>> 16) + a16 * b00;
            c32 = (c16 >>> 16);
            c16 = (c16 & 65535) + a00 * b16;
            c32 = c32 + (c16 >>> 16) + a32 * b00;
            c48 = (c32 >>> 16);
            c32 = (c32 & 65535) + a16 * b16;
            c48 = c48 + (c32 >>> 16);
            c32 = (c32 & 65535) + a00 * b32;
            c48 = c48 + (c32 >>> 16);
            c32 = c32 & 65535;
            c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
            return mk(c00 & 65535 | ((c16 & 65535) << 16), c32 | (c48 << 16));
          }
          
        }
        
      }
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int;
      }
    }}

  function ge(param, param$1) {
    var other_hi = param$1[/* hi */0];
    var hi = param[/* hi */0];
    if (hi > other_hi) {
      return true;
    } else if (hi < other_hi) {
      return false;
    } else {
      return param[/* lo */1] >= param$1[/* lo */1];
    }
  }

  function neq(x, y) {
    return !eq(x, y);
  }

  function lt(x, y) {
    return !ge(x, y);
  }

  function gt(x, y) {
    if (x[/* hi */0] > y[/* hi */0]) {
      return true;
    } else if (x[/* hi */0] < y[/* hi */0]) {
      return false;
    } else {
      return x[/* lo */1] > y[/* lo */1];
    }
  }

  function to_float(param) {
    return param[/* hi */0] * 0x100000000 + param[/* lo */1];
  }

  function of_float(x) {
    if (isNaN(x) || !isFinite(x)) {
      return zero;
    } else if (x <= -9.22337203685477581e+18) {
      return min_int;
    } else if (x + 1 >= 9.22337203685477581e+18) {
      return max_int;
    } else if (x < 0) {
      return neg(of_float(-x));
    } else {
      return mk(x % 4294967296 | 0, x / 4294967296 | 0);
    }
  }

  function isSafeInteger(param) {
    var hi = param[/* hi */0];
    var top11Bits = (hi >> 21);
    if (top11Bits === 0) {
      return true;
    } else if (top11Bits === -1) {
      return !(param[/* lo */1] === 0 && hi === (4292870144 | 0));
    } else {
      return false;
    }
  }

  function to_string(self) {
    if (isSafeInteger(self)) {
      return String(to_float(self));
    }
    if (self[/* hi */0] < 0) {
      if (eq(self, min_int)) {
        return "-9223372036854775808";
      } else {
        return "-" + to_string(neg(self));
      }
    }
    var approx_div1 = of_float(Math.floor(to_float(self) / 10));
    var lo = approx_div1[/* lo */1];
    var hi = approx_div1[/* hi */0];
    var match = sub_aux(sub_aux(self, (lo << 3), (lo >>> 29) | (hi << 3)), (lo << 1), (lo >>> 31) | (hi << 1));
    var rem_lo = match[/* lo */1];
    var rem_hi = match[/* hi */0];
    if (rem_lo === 0 && rem_hi === 0) {
      return to_string(approx_div1) + "0";
    }
    if (rem_hi < 0) {
      var rem_lo$1 = ((rem_lo ^ -1) + 1 >>> 0);
      var delta = Math.ceil(rem_lo$1 / 10);
      var remainder = 10 * delta - rem_lo$1;
      return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
    }
    var rem_lo$2 = rem_lo;
    var delta$1 = Math.floor(rem_lo$2 / 10);
    var remainder$1 = rem_lo$2 - 10 * delta$1;
    return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
  }

  function div(_self, _other) {
    while(true) {
      var other = _other;
      var self = _self;
      var exit = 0;
      var exit$1 = 0;
      if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
        exit$1 = 3;
      } else {
        throw division_by_zero;
      }
      if (exit$1 === 3) {
        var match = self[/* hi */0];
        if (match !== -2147483648) {
          if (match !== 0) {
            exit = 2;
          } else {
            if (self[/* lo */1] === 0) {
              return zero;
            }
            exit = 2;
          }
        } else if (self[/* lo */1] !== 0) {
          exit = 2;
        } else {
          if (eq(other, one) || eq(other, neg_one)) {
            return self;
          }
          if (eq(other, min_int)) {
            return one;
          }
          var half_this = asr_(self, 1);
          var approx = lsl_(div(half_this, other), 1);
          var exit$2 = 0;
          if (approx[/* hi */0] !== 0) {
            exit$2 = 4;
          } else {
            if (approx[/* lo */1] === 0) {
              if (other[/* hi */0] < 0) {
                return one;
              } else {
                return neg(one);
              }
            }
            exit$2 = 4;
          }
          if (exit$2 === 4) {
            var rem = sub(self, mul(other, approx));
            return add(approx, div(rem, other));
          }
          
        }
      }
      if (exit === 2 && other[/* hi */0] === -2147483648 && other[/* lo */1] === 0) {
        return zero;
      }
      var other_hi = other[/* hi */0];
      if (self[/* hi */0] < 0) {
        if (other_hi >= 0) {
          return neg(div(neg(self), other));
        }
        _other = neg(other);
        _self = neg(self);
        continue ;
      }
      if (other_hi < 0) {
        return neg(div(self, neg(other)));
      }
      var res = zero;
      var rem$1 = self;
      while(ge(rem$1, other)) {
        var approx$1 = caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
        var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
        var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
        var approxRes = of_float(approx$1);
        var approxRem = mul(approxRes, other);
        while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
          approx$1 = approx$1 - delta;
          approxRes = of_float(approx$1);
          approxRem = mul(approxRes, other);
        }      if (is_zero(approxRes)) {
          approxRes = one;
        }
        res = add(res, approxRes);
        rem$1 = sub(rem$1, approxRem);
      }    return res;
    }}

  function div_mod(self, other) {
    var quotient = div(self, other);
    return /* tuple */[
            quotient,
            sub(self, mul(quotient, other))
          ];
  }

  function to_int32(x) {
    return x[/* lo */1] | 0;
  }

  function to_hex(x) {
    var x_lo = x[/* lo */1];
    var x_hi = x[/* hi */0];
    var aux = function (v) {
      return (v >>> 0).toString(16);
    };
    if (x_hi === 0 && x_lo === 0) {
      return "0";
    }
    if (x_lo === 0) {
      return aux(x_hi) + "00000000";
    }
    if (x_hi === 0) {
      return aux(x_lo);
    }
    var lo = aux(x_lo);
    var pad = 8 - lo.length | 0;
    if (pad <= 0) {
      return aux(x_hi) + lo;
    } else {
      return aux(x_hi) + ("0".repeat(pad) + lo);
    }
  }

  function discard_sign(x) {
    return /* Int64 */[
            /* hi */2147483647 & x[/* hi */0],
            /* lo */x[/* lo */1]
          ];
  }
  /* Caml_int32 Not a pure module */

  function int_of_base(param) {
    switch (param) {
      case /* Oct */0 :
          return 8;
      case /* Hex */1 :
          return 16;
      case /* Dec */2 :
          return 10;
      
    }
  }

  function lowercase(c) {
    if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
      return c + 32 | 0;
    } else {
      return c;
    }
  }

  function parse_format(fmt) {
    var len = fmt.length;
    if (len > 31) {
      throw [
            invalid_argument,
            "format_int: format too long"
          ];
    }
    var f = {
      justify: "+",
      signstyle: "-",
      filter: " ",
      alternate: false,
      base: /* Dec */2,
      signedconv: false,
      width: 0,
      uppercase: false,
      sign: 1,
      prec: -1,
      conv: "f"
    };
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= len) {
        return f;
      }
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 :
                  f.base = /* Hex */1;
                  f.uppercase = true;
                  _i = i + 1 | 0;
                  continue ;
              case 13 :
              case 14 :
              case 15 :
                  exit = 5;
                  break;
              case 12 :
              case 17 :
                  exit = 4;
                  break;
              case 23 :
                  f.base = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
              case 29 :
                  f.base = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
              case 1 :
              case 2 :
              case 3 :
              case 4 :
              case 5 :
              case 6 :
              case 7 :
              case 8 :
              case 9 :
              case 10 :
              case 11 :
              case 16 :
              case 18 :
              case 19 :
              case 20 :
              case 21 :
              case 22 :
              case 24 :
              case 25 :
              case 26 :
              case 27 :
              case 28 :
              case 30 :
              case 31 :
                  exit = 1;
                  break;
              case 32 :
                  f.base = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
              
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f.signedconv = true;
          f.uppercase = true;
          f.conv = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
        }
      } else {
        switch (c) {
          case 35 :
              f.alternate = true;
              _i = i + 1 | 0;
              continue ;
          case 32 :
          case 43 :
              exit = 2;
              break;
          case 45 :
              f.justify = "-";
              _i = i + 1 | 0;
              continue ;
          case 46 :
              f.prec = 0;
              var j = i + 1 | 0;
              while((function(j){
                  return function () {
                    var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                    return w >= 0 && w <= 9;
                  }
                  }(j))()) {
                f.prec = (imul(f.prec, 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                j = j + 1 | 0;
              }            _i = j;
              continue ;
          case 33 :
          case 34 :
          case 36 :
          case 37 :
          case 38 :
          case 39 :
          case 40 :
          case 41 :
          case 42 :
          case 44 :
          case 47 :
              exit = 1;
              break;
          case 48 :
              f.filter = "0";
              _i = i + 1 | 0;
              continue ;
          case 49 :
          case 50 :
          case 51 :
          case 52 :
          case 53 :
          case 54 :
          case 55 :
          case 56 :
          case 57 :
              exit = 3;
              break;
          default:
            exit = 1;
        }
      }
      switch (exit) {
        case 1 :
            _i = i + 1 | 0;
            continue ;
        case 2 :
            f.signstyle = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        case 3 :
            f.width = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j$1))()) {
              f.width = (imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
              j$1 = j$1 + 1 | 0;
            }          _i = j$1;
            continue ;
        case 4 :
            f.signedconv = true;
            f.base = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
        case 5 :
            f.signedconv = true;
            f.conv = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        
      }
    }}

  function finish_formatting(config, rawbuffer) {
    var justify = config.justify;
    var signstyle = config.signstyle;
    var filter = config.filter;
    var alternate = config.alternate;
    var base = config.base;
    var signedconv = config.signedconv;
    var width = config.width;
    var uppercase = config.uppercase;
    var sign = config.sign;
    var len = rawbuffer.length;
    if (signedconv && (sign < 0 || signstyle !== "-")) {
      len = len + 1 | 0;
    }
    if (alternate) {
      if (base === /* Oct */0) {
        len = len + 1 | 0;
      } else if (base === /* Hex */1) {
        len = len + 2 | 0;
      }
      
    }
    var buffer = "";
    if (justify === "+" && filter === " ") {
      for(var _for = len; _for < width; ++_for){
        buffer = buffer + filter;
      }
    }
    if (signedconv) {
      if (sign < 0) {
        buffer = buffer + "-";
      } else if (signstyle !== "-") {
        buffer = buffer + signstyle;
      }
      
    }
    if (alternate && base === /* Oct */0) {
      buffer = buffer + "0";
    }
    if (alternate && base === /* Hex */1) {
      buffer = buffer + "0x";
    }
    if (justify === "+" && filter === "0") {
      for(var _for$1 = len; _for$1 < width; ++_for$1){
        buffer = buffer + filter;
      }
    }
    buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
    if (justify === "-") {
      for(var _for$2 = len; _for$2 < width; ++_for$2){
        buffer = buffer + " ";
      }
    }
    return buffer;
  }

  function caml_format_int(fmt, i) {
    if (fmt === "%d") {
      return String(i);
    }
    var f = parse_format(fmt);
    var i$1 = i < 0 ? (
        f.signedconv ? (f.sign = -1, -i) : (i >>> 0)
      ) : i;
    var s = i$1.toString(int_of_base(f.base));
    if (f.prec >= 0) {
      f.filter = " ";
      var n = f.prec - s.length | 0;
      if (n > 0) {
        s = "0".repeat(n) + s;
      }
      
    }
    return finish_formatting(f, s);
  }

  function dec_of_pos_int64(x) {
    if (!lt(x, zero)) {
      return to_string(x);
    }
    var wbase = mk(10, 0);
    var y = discard_sign(x);
    var match = div_mod(y, wbase);
    var match$1 = div_mod(add(mk(8, 0), match[1]), wbase);
    var quotient = add(add(mk(-858993460, 214748364), match[0]), match$1[0]);
    return to_string(quotient) + "0123456789"[to_int32(match$1[1])];
  }

  function oct_of_int64(x) {
    var s = "";
    var wbase = mk(8, 0);
    var cvtbl = "01234567";
    if (lt(x, zero)) {
      var y = discard_sign(x);
      var match = div_mod(y, wbase);
      var quotient = add(mk(0, 268435456), match[0]);
      var modulus = match[1];
      s = cvtbl[to_int32(modulus)] + s;
      while(neq(quotient, zero)) {
        var match$1 = div_mod(quotient, wbase);
        quotient = match$1[0];
        modulus = match$1[1];
        s = cvtbl[to_int32(modulus)] + s;
      }  } else {
      var match$2 = div_mod(x, wbase);
      var quotient$1 = match$2[0];
      var modulus$1 = match$2[1];
      s = cvtbl[to_int32(modulus$1)] + s;
      while(neq(quotient$1, zero)) {
        var match$3 = div_mod(quotient$1, wbase);
        quotient$1 = match$3[0];
        modulus$1 = match$3[1];
        s = cvtbl[to_int32(modulus$1)] + s;
      }  }
    return s;
  }

  function caml_int64_format(fmt, x) {
    if (fmt === "%d") {
      return to_string(x);
    }
    var f = parse_format(fmt);
    var x$1 = f.signedconv && lt(x, zero) ? (f.sign = -1, neg(x)) : x;
    var match = f.base;
    var s;
    switch (match) {
      case /* Oct */0 :
          s = oct_of_int64(x$1);
          break;
      case /* Hex */1 :
          s = to_hex(x$1);
          break;
      case /* Dec */2 :
          s = dec_of_pos_int64(x$1);
          break;
      
    }
    var fill_s;
    if (f.prec >= 0) {
      f.filter = " ";
      var n = f.prec - s.length | 0;
      fill_s = n > 0 ? "0".repeat(n) + s : s;
    } else {
      fill_s = s;
    }
    return finish_formatting(f, fill_s);
  }

  function caml_format_float(fmt, x) {
    var f = parse_format(fmt);
    var prec = f.prec < 0 ? 6 : f.prec;
    var x$1 = x < 0 ? (f.sign = -1, -x) : x;
    var s = "";
    if (isNaN(x$1)) {
      s = "nan";
      f.filter = " ";
    } else if (isFinite(x$1)) {
      var match = f.conv;
      switch (match) {
        case "e" :
            s = x$1.toExponential(prec);
            var i = s.length;
            if (s[i - 3 | 0] === "e") {
              s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
            }
            break;
        case "f" :
            s = x$1.toFixed(prec);
            break;
        case "g" :
            var prec$1 = prec !== 0 ? prec : 1;
            s = x$1.toExponential(prec$1 - 1 | 0);
            var j = s.indexOf("e");
            var exp = Number(s.slice(j + 1 | 0)) | 0;
            if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
              var i$1 = j - 1 | 0;
              while(s[i$1] === "0") {
                i$1 = i$1 - 1 | 0;
              }            if (s[i$1] === ".") {
                i$1 = i$1 - 1 | 0;
              }
              s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
              var i$2 = s.length;
              if (s[i$2 - 3 | 0] === "e") {
                s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
              }
              
            } else {
              var p = prec$1;
              if (exp < 0) {
                p = p - (exp + 1 | 0) | 0;
                s = x$1.toFixed(p);
              } else {
                while((function () {
                        s = x$1.toFixed(p);
                        return s.length > (prec$1 + 1 | 0);
                      })()) {
                  p = p - 1 | 0;
                }            }
              if (p !== 0) {
                var k = s.length - 1 | 0;
                while(s[k] === "0") {
                  k = k - 1 | 0;
                }              if (s[k] === ".") {
                  k = k - 1 | 0;
                }
                s = s.slice(0, k + 1 | 0);
              }
              
            }
            break;
          
      }
    } else {
      s = "inf";
      f.filter = " ";
    }
    return finish_formatting(f, s);
  }

  var caml_hexstring_of_float = (function(x,prec,style){
    if (!isFinite(x)) {
      if (isNaN(x)) return "nan";
      return x > 0 ? "infinity":"-infinity";
    }
    var sign = (x==0 && 1/x == -Infinity)?1:(x>=0)?0:1;
    if(sign) x = -x;
    var exp = 0;
    if (x == 0) ;
    else if (x < 1) {
      while (x < 1 && exp > -1022)  { x *= 2; exp--; }
    } else {
      while (x >= 2) { x /= 2; exp++; }
    }
    var exp_sign = exp < 0 ? '' : '+';
    var sign_str = '';
    if (sign) sign_str = '-';
    else {
      switch(style){
      case 43 /* '+' */: sign_str = '+'; break;
      case 32 /* ' ' */: sign_str = ' '; break;
      }
    }
    if (prec >= 0 && prec < 13) {
      /* If a precision is given, and is small, round mantissa accordingly */
        var cst = Math.pow(2,prec * 4);
        x = Math.round(x * cst) / cst;
    }
    var x_str = x.toString(16);
    if(prec >= 0){
        var idx = x_str.indexOf('.');
      if(idx<0) {
        x_str += '.' +  '0'.repeat(prec);
      }
      else {
        var size = idx+1+prec;
        if(x_str.length < size)
          x_str += '0'.repeat(size - x_str.length);
        else
          x_str = x_str.substr(0,size);
      }
    }
    return  (sign_str + '0x' + x_str + 'p' + exp_sign + exp.toString(10));
  });

  var caml_nativeint_format = caml_format_int;

  var caml_int32_format = caml_format_int;
  /* No side effect */

  function get(s, i) {
    if (i >= s.length || i < 0) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    }
    return s.charCodeAt(i);
  }
  /* No side effect */

  var id = {
    contents: 0
  };

  function caml_fresh_oo_id(param) {
    id.contents = id.contents + 1;
    return id.contents;
  }

  function create(str) {
    var v_001 = caml_fresh_oo_id();
    var v = /* tuple */[
      str,
      v_001
    ];
    v.tag = 248;
    return v;
  }

  function caml_is_extension(e) {
    if (e === undefined) {
      return false;
    }
    if (e.tag === 248) {
      return true;
    }
    var slot = e[0];
    if (slot !== undefined) {
      return slot.tag === 248;
    } else {
      return false;
    }
  }
  /* No side effect */

  var undefinedHeader = [];

  function some(x) {
    if (x === undefined) {
      var block = /* tuple */[
        undefinedHeader,
        0
      ];
      block.tag = 256;
      return block;
    }
    if (!(x !== null && x[0] === undefinedHeader)) {
      return x;
    }
    var nid = x[1] + 1 | 0;
    var block$1 = /* tuple */[
      undefinedHeader,
      nid
    ];
    block$1.tag = 256;
    return block$1;
  }

  function valFromOption(x) {
    if (!(x !== null && x[0] === undefinedHeader)) {
      return x;
    }
    var depth = x[1];
    if (depth === 0) {
      return ;
    } else {
      return /* tuple */[
              undefinedHeader,
              depth - 1 | 0
            ];
    }
  }
  /* No side effect */

  var $$Error = create("Caml_js_exceptions.Error");

  function internalToOCamlException(e) {
    if (caml_is_extension(e)) {
      return e;
    } else {
      return [
              $$Error,
              e
            ];
    }
  }
  /* No side effect */

  function erase_rel(rest) {
    if (typeof rest === "number") {
      return /* End_of_fmtty */0;
    }
    switch (rest.tag | 0) {
      case /* Char_ty */0 :
          return /* Char_ty */__(0, [erase_rel(rest[0])]);
      case /* String_ty */1 :
          return /* String_ty */__(1, [erase_rel(rest[0])]);
      case /* Int_ty */2 :
          return /* Int_ty */__(2, [erase_rel(rest[0])]);
      case /* Int32_ty */3 :
          return /* Int32_ty */__(3, [erase_rel(rest[0])]);
      case /* Nativeint_ty */4 :
          return /* Nativeint_ty */__(4, [erase_rel(rest[0])]);
      case /* Int64_ty */5 :
          return /* Int64_ty */__(5, [erase_rel(rest[0])]);
      case /* Float_ty */6 :
          return /* Float_ty */__(6, [erase_rel(rest[0])]);
      case /* Bool_ty */7 :
          return /* Bool_ty */__(7, [erase_rel(rest[0])]);
      case /* Format_arg_ty */8 :
          return /* Format_arg_ty */__(8, [
                    rest[0],
                    erase_rel(rest[1])
                  ]);
      case /* Format_subst_ty */9 :
          var ty1 = rest[0];
          return /* Format_subst_ty */__(9, [
                    ty1,
                    ty1,
                    erase_rel(rest[2])
                  ]);
      case /* Alpha_ty */10 :
          return /* Alpha_ty */__(10, [erase_rel(rest[0])]);
      case /* Theta_ty */11 :
          return /* Theta_ty */__(11, [erase_rel(rest[0])]);
      case /* Any_ty */12 :
          return /* Any_ty */__(12, [erase_rel(rest[0])]);
      case /* Reader_ty */13 :
          return /* Reader_ty */__(13, [erase_rel(rest[0])]);
      case /* Ignored_reader_ty */14 :
          return /* Ignored_reader_ty */__(14, [erase_rel(rest[0])]);
      
    }
  }

  function concat_fmtty(fmtty1, fmtty2) {
    if (typeof fmtty1 === "number") {
      return fmtty2;
    }
    switch (fmtty1.tag | 0) {
      case /* Char_ty */0 :
          return /* Char_ty */__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* String_ty */1 :
          return /* String_ty */__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Int_ty */2 :
          return /* Int_ty */__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Int32_ty */3 :
          return /* Int32_ty */__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Nativeint_ty */4 :
          return /* Nativeint_ty */__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Int64_ty */5 :
          return /* Int64_ty */__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Float_ty */6 :
          return /* Float_ty */__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Bool_ty */7 :
          return /* Bool_ty */__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Format_arg_ty */8 :
          return /* Format_arg_ty */__(8, [
                    fmtty1[0],
                    concat_fmtty(fmtty1[1], fmtty2)
                  ]);
      case /* Format_subst_ty */9 :
          return /* Format_subst_ty */__(9, [
                    fmtty1[0],
                    fmtty1[1],
                    concat_fmtty(fmtty1[2], fmtty2)
                  ]);
      case /* Alpha_ty */10 :
          return /* Alpha_ty */__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Theta_ty */11 :
          return /* Theta_ty */__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Any_ty */12 :
          return /* Any_ty */__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Reader_ty */13 :
          return /* Reader_ty */__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Ignored_reader_ty */14 :
          return /* Ignored_reader_ty */__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
      
    }
  }

  function concat_fmt(fmt1, fmt2) {
    if (typeof fmt1 === "number") {
      return fmt2;
    }
    switch (fmt1.tag | 0) {
      case /* Char */0 :
          return /* Char */__(0, [concat_fmt(fmt1[0], fmt2)]);
      case /* Caml_char */1 :
          return /* Caml_char */__(1, [concat_fmt(fmt1[0], fmt2)]);
      case /* String */2 :
          return /* String */__(2, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Caml_string */3 :
          return /* Caml_string */__(3, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Int */4 :
          return /* Int */__(4, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Int32 */5 :
          return /* Int32 */__(5, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Nativeint */6 :
          return /* Nativeint */__(6, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Int64 */7 :
          return /* Int64 */__(7, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Float */8 :
          return /* Float */__(8, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Bool */9 :
          return /* Bool */__(9, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Flush */10 :
          return /* Flush */__(10, [concat_fmt(fmt1[0], fmt2)]);
      case /* String_literal */11 :
          return /* String_literal */__(11, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Char_literal */12 :
          return /* Char_literal */__(12, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Format_arg */13 :
          return /* Format_arg */__(13, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case /* Format_subst */14 :
          return /* Format_subst */__(14, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case /* Alpha */15 :
          return /* Alpha */__(15, [concat_fmt(fmt1[0], fmt2)]);
      case /* Theta */16 :
          return /* Theta */__(16, [concat_fmt(fmt1[0], fmt2)]);
      case /* Formatting_lit */17 :
          return /* Formatting_lit */__(17, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Formatting_gen */18 :
          return /* Formatting_gen */__(18, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Reader */19 :
          return /* Reader */__(19, [concat_fmt(fmt1[0], fmt2)]);
      case /* Scan_char_set */20 :
          return /* Scan_char_set */__(20, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case /* Scan_get_counter */21 :
          return /* Scan_get_counter */__(21, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Scan_next_char */22 :
          return /* Scan_next_char */__(22, [concat_fmt(fmt1[0], fmt2)]);
      case /* Ignored_param */23 :
          return /* Ignored_param */__(23, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Custom */24 :
          return /* Custom */__(24, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      
    }
  }
  /* No side effect */

  function failwith(s) {
    throw [
          failure,
          s
        ];
  }

  var Exit = create("Pervasives.Exit");

  function abs(x) {
    if (x >= 0) {
      return x;
    } else {
      return -x | 0;
    }
  }

  var min_int$1 = -2147483648;

  function classify_float(x) {
    if (isFinite(x)) {
      if (Math.abs(x) >= 2.22507385850720138e-308) {
        return /* FP_normal */0;
      } else if (x !== 0) {
        return /* FP_subnormal */1;
      } else {
        return /* FP_zero */2;
      }
    } else if (isNaN(x)) {
      return /* FP_nan */4;
    } else {
      return /* FP_infinite */3;
    }
  }

  function string_of_bool(b) {
    if (b) {
      return "true";
    } else {
      return "false";
    }
  }

  function $at(l1, l2) {
    if (l1) {
      return /* :: */[
              l1[0],
              $at(l1[1], l2)
            ];
    } else {
      return l2;
    }
  }

  var max_int$1 = 2147483647;
  /* No side effect */

  function length(l) {
    var _len = 0;
    var _param = l;
    while(true) {
      var param = _param;
      var len = _len;
      if (!param) {
        return len;
      }
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
    }}

  function rev_append(_l1, _l2) {
    while(true) {
      var l2 = _l2;
      var l1 = _l1;
      if (!l1) {
        return l2;
      }
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
    }}

  function rev(l) {
    return rev_append(l, /* [] */0);
  }

  function flatten(param) {
    if (param) {
      return $at(param[0], flatten(param[1]));
    } else {
      return /* [] */0;
    }
  }

  function map(f, param) {
    if (!param) {
      return /* [] */0;
    }
    var r = _1(f, param[0]);
    return /* :: */[
            r,
            map(f, param[1])
          ];
  }

  function iter(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      _1(f, param[0]);
      _param = param[1];
      continue ;
    }}

  function fold_left(f, _accu, _l) {
    while(true) {
      var l = _l;
      var accu = _accu;
      if (!l) {
        return accu;
      }
      _l = l[1];
      _accu = _2(f, accu, l[0]);
      continue ;
    }}

  function fold_right(f, l, accu) {
    if (l) {
      return _2(f, l[0], fold_right(f, l[1], accu));
    } else {
      return accu;
    }
  }

  function fold_left2(f, _accu, _l1, _l2) {
    while(true) {
      var l2 = _l2;
      var l1 = _l1;
      var accu = _accu;
      if (l1) {
        if (l2) {
          _l2 = l2[1];
          _l1 = l1[1];
          _accu = _3(f, accu, l1[0], l2[0]);
          continue ;
        }
        throw [
              invalid_argument,
              "List.fold_left2"
            ];
      }
      if (l2) {
        throw [
              invalid_argument,
              "List.fold_left2"
            ];
      }
      return accu;
    }}

  function exists(p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      if (_1(p, param[0])) {
        return true;
      }
      _param = param[1];
      continue ;
    }}

  function mem(x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      if (caml_equal(param[0], x)) {
        return true;
      }
      _param = param[1];
      continue ;
    }}

  function find_all(p) {
    return (function (param) {
        var _accu = /* [] */0;
        var _param = param;
        while(true) {
          var param$1 = _param;
          var accu = _accu;
          if (!param$1) {
            return rev_append(accu, /* [] */0);
          }
          var l = param$1[1];
          var x = param$1[0];
          if (_1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
          }
          _param = l;
          continue ;
        }    });
  }

  function partition(p, l) {
    var _yes = /* [] */0;
    var _no = /* [] */0;
    var _param = l;
    while(true) {
      var param = _param;
      var no = _no;
      var yes = _yes;
      if (!param) {
        return /* tuple */[
                rev_append(yes, /* [] */0),
                rev_append(no, /* [] */0)
              ];
      }
      var l$1 = param[1];
      var x = param[0];
      if (_1(p, x)) {
        _param = l$1;
        _yes = /* :: */[
          x,
          yes
        ];
        continue ;
      }
      _param = l$1;
      _no = /* :: */[
        x,
        no
      ];
      continue ;
    }}

  function combine(l1, l2) {
    if (l1) {
      if (l2) {
        return /* :: */[
                /* tuple */[
                  l1[0],
                  l2[0]
                ],
                combine(l1[1], l2[1])
              ];
      }
      throw [
            invalid_argument,
            "List.combine"
          ];
    }
    if (!l2) {
      return /* [] */0;
    }
    throw [
          invalid_argument,
          "List.combine"
        ];
  }

  function chop(_k, _l) {
    while(true) {
      var l = _l;
      var k = _k;
      if (k === 0) {
        return l;
      }
      if (l) {
        _l = l[1];
        _k = k - 1 | 0;
        continue ;
      }
      throw [
            assert_failure,
            /* tuple */[
              "list.ml",
              262,
              11
            ]
          ];
    }}

  function stable_sort(cmp, l) {
    var sort = function (n, l) {
      if (n !== 2) {
        if (n === 3 && l) {
          var match = l[1];
          if (match) {
            var match$1 = match[1];
            if (match$1) {
              var x3 = match$1[0];
              var x2 = match[0];
              var x1 = l[0];
              if (_2(cmp, x1, x2) <= 0) {
                if (_2(cmp, x2, x3) <= 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else if (_2(cmp, x1, x3) <= 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              } else if (_2(cmp, x1, x3) <= 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (_2(cmp, x2, x3) <= 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            }
            
          }
          
        }
        
      } else if (l) {
        var match$2 = l[1];
        if (match$2) {
          var x2$1 = match$2[0];
          var x1$1 = l[0];
          if (_2(cmp, x1$1, x2$1) <= 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        }
        
      }
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (!l1) {
          return rev_append(l2$1, accu);
        }
        if (!l2$1) {
          return rev_append(l1, accu);
        }
        var h2 = l2$1[0];
        var h1 = l1[0];
        if (_2(cmp, h1, h2) > 0) {
          _accu = /* :: */[
            h1,
            accu
          ];
          _l1 = l1[1];
          continue ;
        }
        _accu = /* :: */[
          h2,
          accu
        ];
        _l2 = l2$1[1];
        continue ;
      }  };
    var rev_sort = function (n, l) {
      if (n !== 2) {
        if (n === 3 && l) {
          var match = l[1];
          if (match) {
            var match$1 = match[1];
            if (match$1) {
              var x3 = match$1[0];
              var x2 = match[0];
              var x1 = l[0];
              if (_2(cmp, x1, x2) > 0) {
                if (_2(cmp, x2, x3) > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else if (_2(cmp, x1, x3) > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              } else if (_2(cmp, x1, x3) > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (_2(cmp, x2, x3) > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            }
            
          }
          
        }
        
      } else if (l) {
        var match$2 = l[1];
        if (match$2) {
          var x2$1 = match$2[0];
          var x1$1 = l[0];
          if (_2(cmp, x1$1, x2$1) > 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        }
        
      }
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (!l1) {
          return rev_append(l2$1, accu);
        }
        if (!l2$1) {
          return rev_append(l1, accu);
        }
        var h2 = l2$1[0];
        var h1 = l1[0];
        if (_2(cmp, h1, h2) <= 0) {
          _accu = /* :: */[
            h1,
            accu
          ];
          _l1 = l1[1];
          continue ;
        }
        _accu = /* :: */[
          h2,
          accu
        ];
        _l2 = l2$1[1];
        continue ;
      }  };
    var len = length(l);
    if (len < 2) {
      return l;
    } else {
      return sort(len, l);
    }
  }

  var concat = flatten;

  var filter = find_all;

  var sort = stable_sort;
  /* No side effect */

  function escaped(c) {
    var exit = 0;
    if (c >= 40) {
      if (c === 92) {
        return "\\\\";
      }
      exit = c >= 127 ? 1 : 2;
    } else if (c >= 32) {
      if (c >= 39) {
        return "\\'";
      }
      exit = 2;
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8 :
            return "\\b";
        case 9 :
            return "\\t";
        case 10 :
            return "\\n";
        case 0 :
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 11 :
        case 12 :
            exit = 1;
            break;
        case 13 :
            return "\\r";
        
      }
    }
    switch (exit) {
      case 1 :
          var s = [
            0,
            0,
            0,
            0
          ];
          s[0] = /* "\\" */92;
          s[1] = 48 + (c / 100 | 0) | 0;
          s[2] = 48 + (c / 10 | 0) % 10 | 0;
          s[3] = 48 + c % 10 | 0;
          return bytes_to_string(s);
      case 2 :
          var s$1 = [0];
          s$1[0] = c;
          return bytes_to_string(s$1);
      
    }
  }

  function uppercase_ascii(c) {
    if (c >= /* "a" */97 && c <= /* "z" */122) {
      return c - 32 | 0;
    } else {
      return c;
    }
  }
  /* No side effect */

  function make(n, c) {
    var s = caml_create_bytes(n);
    caml_fill_bytes(s, 0, n, c);
    return s;
  }

  var empty = [];

  function copy(s) {
    var len = s.length;
    var r = caml_create_bytes(len);
    caml_blit_bytes(s, 0, r, 0, len);
    return r;
  }

  function sub$1(s, ofs, len) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw [
            invalid_argument,
            "String.sub / Bytes.sub"
          ];
    }
    var r = caml_create_bytes(len);
    caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }

  function sub_string(b, ofs, len) {
    return bytes_to_string(sub$1(b, ofs, len));
  }

  function blit(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw [
            invalid_argument,
            "Bytes.blit"
          ];
    }
    return caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }

  function blit_string(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw [
            invalid_argument,
            "String.blit / Bytes.blit_string"
          ];
    }
    return caml_blit_string(s1, ofs1, s2, ofs2, len);
  }

  function is_space(param) {
    var switcher = param - 9 | 0;
    if (switcher > 4 || switcher < 0) {
      return switcher === 23;
    } else {
      return switcher !== 2;
    }
  }

  function trim(s) {
    var len = s.length;
    var i = 0;
    while(i < len && is_space(s[i])) {
      i = i + 1 | 0;
    }  var j = len - 1 | 0;
    while(j >= i && is_space(s[j])) {
      j = j - 1 | 0;
    }  if (j >= i) {
      return sub$1(s, i, (j - i | 0) + 1 | 0);
    } else {
      return empty;
    }
  }

  function escaped$1(s) {
    var n = 0;
    for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
      var match = s[i];
      var tmp;
      if (match >= 32) {
        var switcher = match - 34 | 0;
        tmp = switcher > 58 || switcher < 0 ? (
            switcher >= 93 ? 4 : 1
          ) : (
            switcher > 57 || switcher < 1 ? 2 : 1
          );
      } else {
        tmp = match >= 11 ? (
            match !== 13 ? 4 : 2
          ) : (
            match >= 8 ? 2 : 4
          );
      }
      n = n + tmp | 0;
    }
    if (n === s.length) {
      return copy(s);
    }
    var s$prime = caml_create_bytes(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length; i$1 < i_finish$1; ++i$1){
      var c = s[i$1];
      var exit = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit = 1;
      } else {
        switch (c) {
          case 8 :
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "b" */98;
              break;
          case 9 :
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "t" */116;
              break;
          case 10 :
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "n" */110;
              break;
          case 0 :
          case 1 :
          case 2 :
          case 3 :
          case 4 :
          case 5 :
          case 6 :
          case 7 :
          case 11 :
          case 12 :
              exit = 1;
              break;
          case 13 :
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "r" */114;
              break;
          
        }
      }
      switch (exit) {
        case 1 :
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 :
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }

  function map$1(f, s) {
    var l = s.length;
    if (l === 0) {
      return s;
    }
    var r = caml_create_bytes(l);
    for(var i = 0; i < l; ++i){
      r[i] = _1(f, s[i]);
    }
    return r;
  }

  function uppercase_ascii$1(s) {
    return map$1(uppercase_ascii, s);
  }
  /* No side effect */

  function make$1(n, c) {
    return bytes_to_string(make(n, c));
  }

  function ensure_ge(x, y) {
    if (x >= y) {
      return x;
    }
    throw [
          invalid_argument,
          "String.concat"
        ];
  }

  function sum_lengths(_acc, seplen, _param) {
    while(true) {
      var param = _param;
      var acc = _acc;
      if (!param) {
        return acc;
      }
      var tl = param[1];
      var hd = param[0];
      if (!tl) {
        return hd.length + acc | 0;
      }
      _param = tl;
      _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
      continue ;
    }}

  function unsafe_blits(dst, _pos, sep, seplen, _param) {
    while(true) {
      var param = _param;
      var pos = _pos;
      if (!param) {
        return dst;
      }
      var tl = param[1];
      var hd = param[0];
      if (tl) {
        caml_blit_string(hd, 0, dst, pos, hd.length);
        caml_blit_string(sep, 0, dst, pos + hd.length | 0, seplen);
        _param = tl;
        _pos = (pos + hd.length | 0) + seplen | 0;
        continue ;
      }
      caml_blit_string(hd, 0, dst, pos, hd.length);
      return dst;
    }}

  function concat$1(sep, l) {
    if (!l) {
      return "";
    }
    var seplen = sep.length;
    return bytes_to_string(unsafe_blits(caml_create_bytes(sum_lengths(0, seplen, l)), 0, sep, seplen, l));
  }

  function is_space$1(param) {
    var switcher = param - 9 | 0;
    if (switcher > 4 || switcher < 0) {
      return switcher === 23;
    } else {
      return switcher !== 2;
    }
  }

  function trim$1(s) {
    if (s === "" || !(is_space$1(s.charCodeAt(0)) || is_space$1(s.charCodeAt(s.length - 1 | 0)))) {
      return s;
    } else {
      return bytes_to_string(trim(bytes_of_string(s)));
    }
  }

  function escaped$2(s) {
    var needs_escape = function (_i) {
      while(true) {
        var i = _i;
        if (i >= s.length) {
          return false;
        }
        var match = s.charCodeAt(i);
        if (match < 32) {
          return true;
        }
        var switcher = match - 34 | 0;
        if (switcher > 58 || switcher < 0) {
          if (switcher >= 93) {
            return true;
          }
          _i = i + 1 | 0;
          continue ;
        }
        if (switcher > 57 || switcher < 1) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }  };
    if (needs_escape(0)) {
      return bytes_to_string(escaped$1(bytes_of_string(s)));
    } else {
      return s;
    }
  }

  var compare = caml_string_compare;

  var blit$1 = blit_string;
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function setStyle(n, key, value) {
    n.style[key] = value;
    
  }

  function setStyleProperty(n, priorityOpt, key, value) {
    var priority = priorityOpt !== undefined ? priorityOpt : false;
    var style = n.style;
    var _valid = style.setProperty;
    if (_valid !== undefined) {
      return style.setProperty(key, value, priority ? "important" : null);
    } else {
      return setStyle(n, key, value);
    }
  }

  function insertBefore(n, child, refNode) {
    return n.insertBefore(child, refNode);
  }

  function setAttributeNsOptional(n, namespace, key, value) {
    if (namespace === "") {
      return n.setAttribute(key, value);
    } else {
      return n.setAttributeNS(namespace, key, value);
    }
  }

  function removeAttributeNsOptional(n, namespace, key) {
    if (namespace === "") {
      return n.removeAttribute(key);
    } else {
      return n.removeAttributeNS(namespace, key);
    }
  }

  function addEventListener(n, typ, listener, options) {
    return n.addEventListener(typ, listener, options);
  }

  function removeEventListener(n, typ, listener, options) {
    return n.removeEventListener(typ, listener, options);
  }

  function remove_polyfill(param) {
    return (// remove polyfill
    (function() {
      if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        };
      }  }()));
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function createElementNsOptional(namespace, tagName) {
    if (namespace === "") {
      return document.createElement(tagName);
    } else {
      return document.createElementNS(namespace, tagName);
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  var noNode = /* CommentNode */__(0, [""]);

  function fullnode(namespace, tagName, key, unique, props, vdoms) {
    return /* Node */__(2, [
              namespace,
              tagName,
              key,
              unique,
              props,
              vdoms
            ]);
  }

  function onCB(name, key, cb) {
    return /* Event */__(3, [
              name,
              /* EventHandlerCallback */__(0, [
                  key,
                  cb
                ]),
              {
                contents: undefined
              }
            ]);
  }

  function onMsg(name, msg) {
    return /* Event */__(3, [
              name,
              /* EventHandlerMsg */__(1, [msg]),
              {
                contents: undefined
              }
            ]);
  }

  function renderToHtmlString(_s) {
    while(true) {
      var s = _s;
      switch (s.tag | 0) {
        case /* CommentNode */0 :
            return "<!-- " + (s[0] + " -->");
        case /* Text */1 :
            return s[0];
        case /* Node */2 :
            var tagName = s[1];
            var namespace = s[0];
            return concat$1("", /* :: */[
                        "<",
                        /* :: */[
                          namespace,
                          /* :: */[
                            namespace === "" ? "" : ":",
                            /* :: */[
                              tagName,
                              /* :: */[
                                concat$1("", map((function (p) {
                                            if (typeof p === "number") {
                                              return "";
                                            }
                                            switch (p.tag | 0) {
                                              case /* RawProp */0 :
                                                  return concat$1("", /* :: */[
                                                              " ",
                                                              /* :: */[
                                                                p[0],
                                                                /* :: */[
                                                                  "=\"",
                                                                  /* :: */[
                                                                    p[1],
                                                                    /* :: */[
                                                                      "\"",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]);
                                              case /* Attribute */1 :
                                                  return concat$1("", /* :: */[
                                                              " ",
                                                              /* :: */[
                                                                p[1],
                                                                /* :: */[
                                                                  "=\"",
                                                                  /* :: */[
                                                                    p[2],
                                                                    /* :: */[
                                                                      "\"",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]);
                                              case /* Data */2 :
                                                  return concat$1("", /* :: */[
                                                              " data-",
                                                              /* :: */[
                                                                p[0],
                                                                /* :: */[
                                                                  "=\"",
                                                                  /* :: */[
                                                                    p[1],
                                                                    /* :: */[
                                                                      "\"",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]);
                                              case /* Event */3 :
                                                  return "";
                                              case /* Style */4 :
                                                  return concat$1("", /* :: */[
                                                              " style=\"",
                                                              /* :: */[
                                                                concat$1(";", map((function (param) {
                                                                            return concat$1("", /* :: */[
                                                                                        param[0],
                                                                                        /* :: */[
                                                                                          ":",
                                                                                          /* :: */[
                                                                                            param[1],
                                                                                            /* :: */[
                                                                                              ";",
                                                                                              /* [] */0
                                                                                            ]
                                                                                          ]
                                                                                        ]
                                                                                      ]);
                                                                          }), p[0])),
                                                                /* :: */[
                                                                  "\"",
                                                                  /* [] */0
                                                                ]
                                                              ]
                                                            ]);
                                              
                                            }
                                          }), s[4])),
                                /* :: */[
                                  ">",
                                  /* :: */[
                                    concat$1("", map(renderToHtmlString, s[5])),
                                    /* :: */[
                                      "</",
                                      /* :: */[
                                        tagName,
                                        /* :: */[
                                          ">",
                                          /* [] */0
                                        ]
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]);
        case /* LazyGen */3 :
            _s = _1(s[1], undefined);
            continue ;
        case /* Tagger */4 :
            _s = s[1];
            continue ;
        
      }
    }}

  function eventHandler(callbacks, cb) {
    return (function (ev) {
        var msg = _1(cb.contents, ev);
        if (msg !== undefined) {
          return _1(callbacks.contents.enqueue, valFromOption(msg));
        }
        
      });
  }

  function eventHandler_GetCB(msg) {
    if (!msg.tag) {
      return msg[1];
    }
    var msg$1 = msg[0];
    return (function (_ev) {
        return some(msg$1);
      });
  }

  function compareEventHandlerTypes(left, msg) {
    if (msg.tag) {
      if (left.tag && caml_equal(msg[0], left[0])) {
        return true;
      } else {
        return false;
      }
    } else if (left.tag) {
      return false;
    } else {
      return msg[0] === left[0];
    }
  }

  function eventHandler_Register(callbacks, elem, name, handlerType) {
    var cb = {
      contents: eventHandler_GetCB(handlerType)
    };
    var handler = eventHandler(callbacks, cb);
    addEventListener(elem, name, handler, false);
    return {
            handler: handler,
            cb: cb
          };
  }

  function eventHandler_Unregister(elem, name, cache) {
    if (cache !== undefined) {
      removeEventListener(elem, name, cache.handler, false);
      return ;
    }
    
  }

  function eventHandler_Mutate(callbacks, elem, oldName, newName, oldHandlerType, newHandlerType, oldCache, newCache) {
    var oldcache = oldCache.contents;
    if (oldcache === undefined) {
      newCache.contents = eventHandler_Register(callbacks, elem, newName, newHandlerType);
      return ;
    }
    if (oldName === newName) {
      newCache.contents = oldCache.contents;
      if (compareEventHandlerTypes(oldHandlerType, newHandlerType)) {
        return ;
      }
      var cb = eventHandler_GetCB(newHandlerType);
      oldcache.cb.contents = cb;
      return ;
    }
    oldCache.contents = eventHandler_Unregister(elem, oldName, oldCache.contents);
    newCache.contents = eventHandler_Register(callbacks, elem, newName, newHandlerType);
    
  }

  function patchVNodesOnElems_PropertiesApply_Add(callbacks, elem, _idx, s) {
    if (typeof s === "number") {
      return ;
    }
    switch (s.tag | 0) {
      case /* RawProp */0 :
          elem[s[0]] = s[1];
          return ;
      case /* Attribute */1 :
          return setAttributeNsOptional(elem, s[0], s[1], s[2]);
      case /* Data */2 :
          console.log(/* tuple */[
                "TODO:  Add Data Unhandled",
                s[0],
                s[1]
              ]);
          throw [
                failure,
                "TODO:  Add Data Unhandled"
              ];
      case /* Event */3 :
          s[2].contents = eventHandler_Register(callbacks, elem, s[0], s[1]);
          return ;
      case /* Style */4 :
          return fold_left((function (param, param$1) {
                        return setStyleProperty(elem, undefined, param$1[0], param$1[1]);
                      }), undefined, s[0]);
      
    }
  }

  function patchVNodesOnElems_PropertiesApply_Remove(_callbacks, elem, _idx, s) {
    if (typeof s === "number") {
      return ;
    }
    switch (s.tag | 0) {
      case /* RawProp */0 :
          elem[s[0]] = undefined;
          return ;
      case /* Attribute */1 :
          return removeAttributeNsOptional(elem, s[0], s[1]);
      case /* Data */2 :
          console.log(/* tuple */[
                "TODO:  Remove Data Unhandled",
                s[0],
                s[1]
              ]);
          throw [
                failure,
                "TODO:  Remove Data Unhandled"
              ];
      case /* Event */3 :
          var cache = s[2];
          cache.contents = eventHandler_Unregister(elem, s[0], cache.contents);
          return ;
      case /* Style */4 :
          return fold_left((function (param, param$1) {
                        return setStyleProperty(elem, undefined, param$1[0], null);
                      }), undefined, s[0]);
      
    }
  }

  function patchVNodesOnElems_PropertiesApply_RemoveAdd(callbacks, elem, idx, oldProp, newProp) {
    patchVNodesOnElems_PropertiesApply_Remove(callbacks, elem, idx, oldProp);
    patchVNodesOnElems_PropertiesApply_Add(callbacks, elem, idx, newProp);
    
  }

  function patchVNodesOnElems_PropertiesApply_Mutate(_callbacks, elem, _idx, oldProp, _newProp) {
    if (typeof _newProp === "number") {
      throw [
            failure,
            "This should never be called as all entries through NoProp are gated."
          ];
    }
    switch (_newProp.tag | 0) {
      case /* RawProp */0 :
          elem[_newProp[0]] = _newProp[1];
          return ;
      case /* Attribute */1 :
          return setAttributeNsOptional(elem, _newProp[0], _newProp[1], _newProp[2]);
      case /* Data */2 :
          console.log(/* tuple */[
                "TODO:  Mutate Data Unhandled",
                _newProp[0],
                _newProp[1]
              ]);
          throw [
                failure,
                "TODO:  Mutate Data Unhandled"
              ];
      case /* Event */3 :
          throw [
                failure,
                "This will never be called because it is gated"
              ];
      case /* Style */4 :
          if (typeof oldProp === "number") {
            throw [
                  failure,
                  "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!"
                ];
          }
          if (oldProp.tag === /* Style */4) {
            return fold_left2((function (param, param$1, param$2) {
                          var nv = param$2[1];
                          var nk = param$2[0];
                          var ok = param$1[0];
                          if (ok === nk) {
                            if (param$1[1] === nv) {
                              return ;
                            } else {
                              return setStyleProperty(elem, undefined, nk, nv);
                            }
                          } else {
                            setStyleProperty(elem, undefined, ok, null);
                            return setStyleProperty(elem, undefined, nk, nv);
                          }
                        }), undefined, oldProp[0], _newProp[0]);
          }
          throw [
                failure,
                "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!"
              ];
      
    }
  }

  function patchVNodesOnElems_PropertiesApply(callbacks, elem, _idx, _oldProperties, _newProperties) {
    while(true) {
      var newProperties = _newProperties;
      var oldProperties = _oldProperties;
      var idx = _idx;
      if (!oldProperties) {
        if (newProperties) {
          return false;
        } else {
          return true;
        }
      }
      var _oldProp = oldProperties[0];
      if (!newProperties) {
        return false;
      }
      if (typeof _oldProp === "number") {
        if (typeof newProperties[0] === "number") {
          _newProperties = newProperties[1];
          _oldProperties = oldProperties[1];
          _idx = idx + 1 | 0;
          continue ;
        }
        
      } else {
        switch (_oldProp.tag | 0) {
          case /* RawProp */0 :
              var newProp = newProperties[0];
              if (typeof newProp !== "number" && !newProp.tag) {
                if (_oldProp[0] === newProp[0] && _oldProp[1] === newProp[1]) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp);
                }
                _newProperties = newProperties[1];
                _oldProperties = oldProperties[1];
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Attribute */1 :
              var newProp$1 = newProperties[0];
              if (typeof newProp$1 !== "number" && newProp$1.tag === /* Attribute */1) {
                if (_oldProp[0] === newProp$1[0] && _oldProp[1] === newProp$1[1] && _oldProp[2] === newProp$1[2]) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$1);
                }
                _newProperties = newProperties[1];
                _oldProperties = oldProperties[1];
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Data */2 :
              var newProp$2 = newProperties[0];
              if (typeof newProp$2 !== "number" && newProp$2.tag === /* Data */2) {
                if (_oldProp[0] === newProp$2[0] && _oldProp[1] === newProp$2[1]) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$2);
                }
                _newProperties = newProperties[1];
                _oldProperties = oldProperties[1];
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Event */3 :
              var _newProp = newProperties[0];
              if (typeof _newProp !== "number" && _newProp.tag === /* Event */3) {
                eventHandler_Mutate(callbacks, elem, _oldProp[0], _newProp[0], _oldProp[1], _newProp[1], _oldProp[2], _newProp[2]);
                _newProperties = newProperties[1];
                _oldProperties = oldProperties[1];
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Style */4 :
              var newProp$3 = newProperties[0];
              if (typeof newProp$3 !== "number" && newProp$3.tag === /* Style */4) {
                if (caml_equal(_oldProp[0], newProp$3[0])) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$3);
                }
                _newProperties = newProperties[1];
                _oldProperties = oldProperties[1];
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          
        }
      }
      patchVNodesOnElems_PropertiesApply_RemoveAdd(callbacks, elem, idx, _oldProp, newProperties[0]);
      _newProperties = newProperties[1];
      _oldProperties = oldProperties[1];
      _idx = idx + 1 | 0;
      continue ;
    }}

  function patchVNodesOnElems_Properties(callbacks, elem, oldProperties, newProperties) {
    return patchVNodesOnElems_PropertiesApply(callbacks, elem, 0, oldProperties, newProperties);
  }

  function patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, param) {
    if (param.tag === /* Node */2) {
      var newProperties = param[4];
      var oldChild = caml_array_get(elems, idx);
      var newChild = createElementNsOptional(param[0], param[1]);
      var match = patchVNodesOnElems_Properties(callbacks, newChild, map((function (param) {
                  return /* NoProp */0;
                }), newProperties), newProperties);
      if (match) {
        var childChildren = newChild.childNodes;
        patchVNodesOnElems(callbacks, newChild, childChildren, 0, /* [] */0, param[5]);
        insertBefore(elem, newChild, oldChild);
        elem.removeChild(oldChild);
        return ;
      }
      throw [
            match_failure,
            /* tuple */[
              "vdom.ml",
              319,
              30
            ]
          ];
    }
    throw [
          failure,
          "Node replacement should never be passed anything but a node itself"
        ];
  }

  function patchVNodesOnElems_CreateElement(_callbacks, _s) {
    while(true) {
      var s = _s;
      var callbacks = _callbacks;
      switch (s.tag | 0) {
        case /* CommentNode */0 :
            var text = s[0];
            return document.createComment(text);
        case /* Text */1 :
            var text$1 = s[0];
            return document.createTextNode(text$1);
        case /* Node */2 :
            var newProperties = s[4];
            var newChild = createElementNsOptional(s[0], s[1]);
            var match = patchVNodesOnElems_Properties(callbacks, newChild, map((function (param) {
                        return /* NoProp */0;
                      }), newProperties), newProperties);
            if (match) {
              var childChildren = newChild.childNodes;
              patchVNodesOnElems(callbacks, newChild, childChildren, 0, /* [] */0, s[5]);
              return newChild;
            }
            throw [
                  match_failure,
                  /* tuple */[
                    "vdom.ml",
                    333,
                    30
                  ]
                ];
        case /* LazyGen */3 :
            var vdom = _1(s[1], undefined);
            s[2].contents = vdom;
            _s = vdom;
            continue ;
        case /* Tagger */4 :
            _s = s[1];
            _callbacks = _1(s[0], callbacks);
            continue ;
        
      }
    }}

  function patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode) {
    if (oldNode.tag === /* Node */2) {
      if (newNode.tag === /* Node */2) {
        if (oldNode[3] !== newNode[3] || oldNode[1] !== newNode[1]) {
          return patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        var child = caml_array_get(elems, idx);
        var childChildren = child.childNodes;
        if (patchVNodesOnElems_Properties(callbacks, child, oldNode[4], newNode[4])) ; else {
          console.log("VDom:  Failed swapping properties because the property list length changed, use `noProp` to swap properties instead, not by altering the list structure.  This is a massive inefficiency until this issue is resolved.");
          patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        return patchVNodesOnElems(callbacks, child, childChildren, 0, oldNode[5], newNode[5]);
      }
      throw [
            failure,
            "Non-node passed to patchVNodesOnElems_MutateNode"
          ];
    }
    throw [
          failure,
          "Non-node passed to patchVNodesOnElems_MutateNode"
        ];
  }

  function patchVNodesOnElems(callbacks, elem, elems, _idx, _oldVNodes, _newVNodes) {
    while(true) {
      var newVNodes = _newVNodes;
      var oldVNodes = _oldVNodes;
      var idx = _idx;
      if (oldVNodes) {
        var oldNode = oldVNodes[0];
        switch (oldNode.tag | 0) {
          case /* CommentNode */0 :
              if (newVNodes) {
                var newS = newVNodes[0];
                if (!newS.tag && oldNode[0] === newS[0]) {
                  _newVNodes = newVNodes[1];
                  _oldVNodes = oldVNodes[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                
              }
              break;
          case /* Text */1 :
              if (newVNodes) {
                var newText = newVNodes[0];
                if (newText.tag === /* Text */1) {
                  var newText$1 = newText[0];
                  if (oldNode[0] !== newText$1) {
                    var child = caml_array_get(elems, idx);
                    child.nodeValue = newText$1;
                  }
                  _newVNodes = newVNodes[1];
                  _oldVNodes = oldVNodes[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                
              }
              break;
          case /* Node */2 :
              if (newVNodes) {
                var newNode = newVNodes[0];
                if (newNode.tag === /* Node */2) {
                  var newRest = newVNodes[1];
                  var newKey = newNode[2];
                  var newTagName = newNode[1];
                  var newNamespace = newNode[0];
                  var oldRest = oldVNodes[1];
                  var oldKey = oldNode[2];
                  var oldTagName = oldNode[1];
                  var oldNamespace = oldNode[0];
                  if (oldKey === newKey && oldKey !== "") {
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  if (oldKey === "" || newKey === "") {
                    patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  var exit = 0;
                  var exit$1 = 0;
                  if (oldRest) {
                    var match = oldRest[0];
                    if (match.tag === /* Node */2) {
                      var olderRest = oldRest[1];
                      var olderKey = match[2];
                      var olderTagName = match[1];
                      var olderNamespace = match[0];
                      var exit$2 = 0;
                      if (newRest) {
                        var match$1 = newRest[0];
                        if (match$1.tag === /* Node */2) {
                          if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey && oldNamespace === match$1[0] && oldTagName === match$1[1] && oldKey === match$1[2]) {
                            var firstChild = caml_array_get(elems, idx);
                            var secondChild = caml_array_get(elems, idx + 1 | 0);
                            elem.removeChild(secondChild);
                            insertBefore(elem, secondChild, firstChild);
                            _newVNodes = newRest[1];
                            _oldVNodes = olderRest;
                            _idx = idx + 2 | 0;
                            continue ;
                          }
                          exit$2 = 4;
                        } else {
                          exit$2 = 4;
                        }
                      } else {
                        exit$2 = 4;
                      }
                      if (exit$2 === 4) {
                        if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey) {
                          var oldChild = caml_array_get(elems, idx);
                          elem.removeChild(oldChild);
                          _newVNodes = newRest;
                          _oldVNodes = olderRest;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit$1 = 3;
                      }
                      
                    } else {
                      exit$1 = 3;
                    }
                  } else {
                    exit$1 = 3;
                  }
                  if (exit$1 === 3) {
                    if (newRest) {
                      var match$2 = newRest[0];
                      if (match$2.tag === /* Node */2) {
                        if (oldNamespace === match$2[0] && oldTagName === match$2[1] && oldKey === match$2[2]) {
                          var oldChild$1 = caml_array_get(elems, idx);
                          var newChild = patchVNodesOnElems_CreateElement(callbacks, newNode);
                          insertBefore(elem, newChild, oldChild$1);
                          _newVNodes = newRest;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit = 2;
                      } else {
                        exit = 2;
                      }
                    } else {
                      exit = 2;
                    }
                  }
                  if (exit === 2) {
                    patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  
                }
                
              }
              break;
          case /* LazyGen */3 :
              if (newVNodes) {
                var match$3 = newVNodes[0];
                if (match$3.tag === /* LazyGen */3) {
                  var newRest$1 = newVNodes[1];
                  var newCache = match$3[2];
                  var newGen = match$3[1];
                  var newKey$1 = match$3[0];
                  var oldRest$1 = oldVNodes[1];
                  var oldCache = oldNode[2];
                  var oldKey$1 = oldNode[0];
                  if (oldKey$1 === newKey$1) {
                    newCache.contents = oldCache.contents;
                    _newVNodes = newRest$1;
                    _oldVNodes = oldRest$1;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  var exit$3 = 0;
                  var exit$4 = 0;
                  if (oldRest$1) {
                    var match$4 = oldRest$1[0];
                    if (match$4.tag === /* LazyGen */3) {
                      var olderRest$1 = oldRest$1[1];
                      var olderKey$1 = match$4[0];
                      var exit$5 = 0;
                      if (newRest$1) {
                        var match$5 = newRest$1[0];
                        if (match$5.tag === /* LazyGen */3) {
                          if (olderKey$1 === newKey$1 && oldKey$1 === match$5[0]) {
                            var firstChild$1 = caml_array_get(elems, idx);
                            var secondChild$1 = caml_array_get(elems, idx + 1 | 0);
                            elem.removeChild(secondChild$1);
                            insertBefore(elem, secondChild$1, firstChild$1);
                            _newVNodes = newRest$1[1];
                            _oldVNodes = olderRest$1;
                            _idx = idx + 2 | 0;
                            continue ;
                          }
                          exit$5 = 4;
                        } else {
                          exit$5 = 4;
                        }
                      } else {
                        exit$5 = 4;
                      }
                      if (exit$5 === 4) {
                        if (olderKey$1 === newKey$1) {
                          var oldChild$2 = caml_array_get(elems, idx);
                          elem.removeChild(oldChild$2);
                          var oldVdom = match$4[2].contents;
                          newCache.contents = oldVdom;
                          _newVNodes = newRest$1;
                          _oldVNodes = olderRest$1;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit$4 = 3;
                      }
                      
                    } else {
                      exit$4 = 3;
                    }
                  } else {
                    exit$4 = 3;
                  }
                  if (exit$4 === 3) {
                    if (newRest$1) {
                      var match$6 = newRest$1[0];
                      if (match$6.tag === /* LazyGen */3) {
                        if (match$6[0] === oldKey$1) {
                          var oldChild$3 = caml_array_get(elems, idx);
                          var newVdom = _1(newGen, undefined);
                          newCache.contents = newVdom;
                          var newChild$1 = patchVNodesOnElems_CreateElement(callbacks, newVdom);
                          insertBefore(elem, newChild$1, oldChild$3);
                          _newVNodes = newRest$1;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit$3 = 2;
                      } else {
                        exit$3 = 2;
                      }
                    } else {
                      exit$3 = 2;
                    }
                  }
                  if (exit$3 === 2) {
                    var oldVdom$1 = oldCache.contents;
                    var newVdom$1 = _1(newGen, undefined);
                    newCache.contents = newVdom$1;
                    _newVNodes = /* :: */[
                      newVdom$1,
                      newRest$1
                    ];
                    _oldVNodes = /* :: */[
                      oldVdom$1,
                      oldRest$1
                    ];
                    continue ;
                  }
                  
                }
                
              }
              break;
          case /* Tagger */4 :
              _oldVNodes = /* :: */[
                oldNode[1],
                oldVNodes[1]
              ];
              continue ;
          
        }
        var oldRest$2 = oldVNodes[1];
        if (newVNodes) {
          var newNode$1 = newVNodes[0];
          if (newNode$1.tag === /* Tagger */4) {
            patchVNodesOnElems(_1(newNode$1[0], callbacks), elem, elems, idx, /* :: */[
                  oldNode,
                  /* [] */0
                ], /* :: */[
                  newNode$1[1],
                  /* [] */0
                ]);
            _newVNodes = newVNodes[1];
            _oldVNodes = oldRest$2;
            _idx = idx + 1 | 0;
            continue ;
          }
          var oldChild$4 = caml_array_get(elems, idx);
          var newChild$2 = patchVNodesOnElems_CreateElement(callbacks, newNode$1);
          insertBefore(elem, newChild$2, oldChild$4);
          elem.removeChild(oldChild$4);
          _newVNodes = newVNodes[1];
          _oldVNodes = oldRest$2;
          _idx = idx + 1 | 0;
          continue ;
        }
        var child$1 = caml_array_get(elems, idx);
        elem.removeChild(child$1);
        _newVNodes = /* [] */0;
        _oldVNodes = oldRest$2;
        continue ;
      }
      if (!newVNodes) {
        return ;
      }
      var newChild$3 = patchVNodesOnElems_CreateElement(callbacks, newVNodes[0]);
      elem.appendChild(newChild$3);
      _newVNodes = newVNodes[1];
      _oldVNodes = /* [] */0;
      _idx = idx + 1 | 0;
      continue ;
    }}

  function patchVNodesIntoElement(callbacks, elem, oldVNodes, newVNodes) {
    var elems = elem.childNodes;
    patchVNodesOnElems(callbacks, elem, elems, 0, oldVNodes, newVNodes);
    return newVNodes;
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function run(callbacks, tagger) {
    if (typeof tagger === "number") {
      return ;
    }
    switch (tagger.tag | 0) {
      case /* Batch */1 :
          return fold_left((function (param, cmd) {
                        return run(callbacks, cmd);
                      }), undefined, tagger[0]);
      case /* Tagger */0 :
      case /* EnqueueCall */2 :
          return _1(tagger[0], callbacks);
      
    }
  }

  var none = /* NoCmd */0;
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function registration(key, enableCall) {
    return /* Registration */__(1, [
              key,
              (function (callbacks) {
                  return _1(enableCall, callbacks.contents);
                }),
              {
                contents: undefined
              }
            ]);
  }

  function run$1(oldCallbacks, newCallbacks, oldSub, newSub) {
    var enable = function (_callbacks, _subs) {
      while(true) {
        var subs = _subs;
        var callbacks = _callbacks;
        if (typeof subs === "number") {
          return ;
        }
        switch (subs.tag | 0) {
          case /* Batch */0 :
              var subs$1 = subs[0];
              if (subs$1) {
                return iter((function(callbacks){
                          return function (param) {
                            return enable(callbacks, param);
                          }
                          }(callbacks)), subs$1);
              } else {
                return ;
              }
          case /* Registration */1 :
              subs[2].contents = _1(subs[1], callbacks);
              return ;
          case /* Mapper */2 :
              var subCallbacks = _1(subs[0], callbacks);
              _subs = subs[1];
              _callbacks = subCallbacks;
              continue ;
          
        }
      }  };
    var disable = function (_callbacks, _subs) {
      while(true) {
        var subs = _subs;
        var callbacks = _callbacks;
        if (typeof subs === "number") {
          return ;
        }
        switch (subs.tag | 0) {
          case /* Batch */0 :
              var subs$1 = subs[0];
              if (subs$1) {
                return iter((function(callbacks){
                          return function (param) {
                            return disable(callbacks, param);
                          }
                          }(callbacks)), subs$1);
              } else {
                return ;
              }
          case /* Registration */1 :
              var diCB = subs[2];
              var cb = diCB.contents;
              if (cb !== undefined) {
                diCB.contents = undefined;
                return _1(cb, undefined);
              } else {
                return ;
              }
          case /* Mapper */2 :
              var subCallbacks = _1(subs[0], callbacks);
              _subs = subs[1];
              _callbacks = subCallbacks;
              continue ;
          
        }
      }  };
    if (typeof oldSub === "number") {
      if (typeof newSub === "number") {
        return newSub;
      }
      
    } else {
      switch (oldSub.tag | 0) {
        case /* Batch */0 :
            if (typeof newSub !== "number" && !newSub.tag) {
              var aux = function (_oldList, _newList) {
                while(true) {
                  var newList = _newList;
                  var oldList = _oldList;
                  if (oldList) {
                    var oldRest = oldList[1];
                    var oldSubSub = oldList[0];
                    if (newList) {
                      run$1(oldCallbacks, newCallbacks, oldSubSub, newList[0]);
                      _newList = newList[1];
                      _oldList = oldRest;
                      continue ;
                    }
                    disable(oldCallbacks, oldSubSub);
                    _newList = /* [] */0;
                    _oldList = oldRest;
                    continue ;
                  }
                  if (!newList) {
                    return ;
                  }
                  enable(newCallbacks, newList[0]);
                  _newList = newList[1];
                  _oldList = /* [] */0;
                  continue ;
                }            };
              aux(oldSub[0], newSub[0]);
              return newSub;
            }
            break;
        case /* Registration */1 :
            if (typeof newSub !== "number" && newSub.tag === /* Registration */1 && oldSub[0] === newSub[0]) {
              newSub[2].contents = oldSub[2].contents;
              return newSub;
            }
            break;
        case /* Mapper */2 :
            if (typeof newSub !== "number" && newSub.tag === /* Mapper */2) {
              var olderCallbacks = _1(oldSub[0], oldCallbacks);
              var newerCallbacks = _1(newSub[0], newCallbacks);
              run$1(olderCallbacks, newerCallbacks, oldSub[1], newSub[1]);
              return newSub;
            }
            break;
        
      }
    }
    disable(oldCallbacks, oldSub);
    enable(newCallbacks, newSub);
    return newSub;
  }

  var none$1 = /* NoSub */0;
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE


  var examples = /* :: */[
    {
      name: "GreaterThan",
      rules: /* :: */[
        "GreaterThan(?first, ?second) when GreaterThan_(?first, ?second).",
        /* :: */[
          "GreaterThan(?first, ?second) when GreaterThan_(?first, ?middle) and GreaterThan(?middle, ?second).",
          /* :: */[
            "GreaterThan_(Seven, Six).",
            /* :: */[
              "GreaterThan_(Six, Five).",
              /* :: */[
                "GreaterThan_(Five, Four).",
                /* :: */[
                  "GreaterThan_(Four, Three).",
                  /* :: */[
                    "GreaterThan_(Three, Two).",
                    /* :: */[
                      "GreaterThan_(Two, One).",
                      /* :: */[
                        "GreaterThan_(One, Zero).",
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ],
      queries: /* :: */[
        "GreaterThan(Three, Two)",
        /* :: */[
          "GreaterThan(Four, ?LessThanFour)",
          /* :: */[
            "GreaterThan(?GreaterThanThree, Three)",
            /* :: */[
              "GreaterThan(?GreaterThanOne, One)",
              /* :: */[
                "GreaterThan(?Greater, ?Lesser)",
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    },
    /* :: */[
      {
        name: "Sums",
        rules: /* :: */[
          "Sum(?left, ?right, ?result) when Sum_(?left, ?right, ?result).",
          /* :: */[
            "Sum(?left, ?right, ?result) when Sum_(?right, ?left, ?result).",
            /* :: */[
              "Sum_(?left, Zero, ?left).",
              /* :: */[
                "Sum_(One, One, Two).",
                /* :: */[
                  "Sum_(One, Two, Three).",
                  /* :: */[
                    "Sum_(One, Three, Four).",
                    /* :: */[
                      "Sum_(One, Four, Five).",
                      /* :: */[
                        "Sum_(One, Five, Six).",
                        /* :: */[
                          "Sum_(One, Six, Seven).",
                          /* :: */[
                            "Sum_(Two, Two, Four).",
                            /* :: */[
                              "Sum_(Two, Three, Five).",
                              /* :: */[
                                "Sum_(Two, Four, Six).",
                                /* :: */[
                                  "Sum_(Two, Five, Seven).",
                                  /* :: */[
                                    "Sum_(Two, Six, Eight).",
                                    /* :: */[
                                      "Sum_(Three, Three, Six).",
                                      /* :: */[
                                        "Sum_(Three, Four, Seven).",
                                        /* :: */[
                                          "Sum_(Three, Five, Eight).",
                                          /* :: */[
                                            "Sum_(Three, Six, Nine).",
                                            /* :: */[
                                              "Sum_(Four, Four, Eight).",
                                              /* :: */[
                                                "Sum_(Four, Five, Nine).",
                                                /* :: */[
                                                  "Sum_(Four, Six, Ten).",
                                                  /* :: */[
                                                    "Sum_(Five, Five, Ten).",
                                                    /* :: */[
                                                      "Sum_(Five, Six, Eleven).",
                                                      /* :: */[
                                                        "Sum_(Six, Six, Twelve).",
                                                        /* [] */0
                                                      ]
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        queries: /* :: */[
          "Sum(Three, Three, Six)",
          /* :: */[
            "Sum(Three, ?right, Five)",
            /* :: */[
              "Sum(Three, Four, ?sum)",
              /* :: */[
                "Sum(?left, ?right, Five)",
                /* :: */[
                  "Sum(?double, ?double, ?result)",
                  /* [] */0
                ]
              ]
            ]
          ]
        ]
      },
      /* :: */[
        {
          name: "Genealogy",
          rules: /* :: */[
            "ParentOf(?Mother, ?Child) when MotherOf(?Mother, ?Child).",
            /* :: */[
              "ParentOf(?Mother, ?Child) when FatherOf(?Mother, ?Child).",
              /* :: */[
                "Siblings(?One, ?Other) when ParentOf(?Parent, ?One) and ParentOf(?Parent, ?Two).",
                /* :: */[
                  "AncestorOf(?Ancestor, ?Descendant) when ParentOf(?Ancestor, ?Descendant).",
                  /* :: */[
                    "AncestorOf(?Ancestor, ?Descendant) when ParentOf(?ParentOfDescendant, ?Descendant) and AncestorOf(?Ancestor, ?ParentOfDescendant).",
                    /* :: */[
                      "MotherOf(Erica, Bob).",
                      /* :: */[
                        "FatherOf(Paul, Bob).",
                        /* :: */[
                          "FatherOf(Bob, Jane).",
                          /* :: */[
                            "FatherOf(Bob, Jim).",
                            /* :: */[
                              "MotherOf(Sally, Jane).",
                              /* :: */[
                                "MotherOf(Sally, Jim).",
                                /* :: */[
                                  "MotherOf(Jane, Tim).",
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ],
          queries: /* :: */[
            "ParentOf(?parent, Jim)",
            /* :: */[
              "ParentOf(Bob, ?child)",
              /* :: */[
                "ParentOf(?parent, ?child)",
                /* :: */[
                  "AncestorOf(?ancestor, Tim)",
                  /* :: */[
                    "AncestorOf(Erica, ?descendant)",
                    /* [] */0
                  ]
                ]
              ]
            ]
          ]
        },
        /* [] */0
      ]
    ]
  ];
  /* No side effect */

  function create$1(n) {
    var n$1 = n < 1 ? 1 : n;
    var s = caml_create_bytes(n$1);
    return {
            buffer: s,
            position: 0,
            length: n$1,
            initial_buffer: s
          };
  }

  function contents(b) {
    return sub_string(b.buffer, 0, b.position);
  }

  function resize(b, more) {
    var len = b.length;
    var new_len = len;
    while((b.position + more | 0) > new_len) {
      new_len = (new_len << 1);
    }  var new_buffer = caml_create_bytes(new_len);
    blit(b.buffer, 0, new_buffer, 0, b.position);
    b.buffer = new_buffer;
    b.length = new_len;
    
  }

  function add_char(b, c) {
    var pos = b.position;
    if (pos >= b.length) {
      resize(b, 1);
    }
    b.buffer[pos] = c;
    b.position = pos + 1 | 0;
    
  }

  function add_string(b, s) {
    var len = s.length;
    var new_position = b.position + len | 0;
    if (new_position > b.length) {
      resize(b, len);
    }
    blit_string(s, 0, b.buffer, b.position, len);
    b.position = new_position;
    
  }
  /* No side effect */

  function buffer_check_size(buf, overhead) {
    var len = buf.bytes.length;
    var min_len = buf.ind + overhead | 0;
    if (min_len <= len) {
      return ;
    }
    var new_len = caml_int_max((len << 1), min_len);
    var new_str = caml_create_bytes(new_len);
    blit(buf.bytes, 0, new_str, 0, len);
    buf.bytes = new_str;
    
  }

  function buffer_add_char(buf, c) {
    buffer_check_size(buf, 1);
    buf.bytes[buf.ind] = c;
    buf.ind = buf.ind + 1 | 0;
    
  }

  function buffer_add_string(buf, s) {
    var str_len = s.length;
    buffer_check_size(buf, str_len);
    blit$1(s, 0, buf.bytes, buf.ind, str_len);
    buf.ind = buf.ind + str_len | 0;
    
  }

  function buffer_contents(buf) {
    return sub_string(buf.bytes, 0, buf.ind);
  }

  function char_of_fconv(fconv) {
    switch (fconv) {
      case /* Float_f */0 :
      case /* Float_pf */1 :
      case /* Float_sf */2 :
          return /* "f" */102;
      case /* Float_e */3 :
      case /* Float_pe */4 :
      case /* Float_se */5 :
          return /* "e" */101;
      case /* Float_E */6 :
      case /* Float_pE */7 :
      case /* Float_sE */8 :
          return /* "E" */69;
      case /* Float_g */9 :
      case /* Float_pg */10 :
      case /* Float_sg */11 :
          return /* "g" */103;
      case /* Float_G */12 :
      case /* Float_pG */13 :
      case /* Float_sG */14 :
          return /* "G" */71;
      case /* Float_F */15 :
          return /* "F" */70;
      case /* Float_h */16 :
      case /* Float_ph */17 :
      case /* Float_sh */18 :
          return /* "h" */104;
      case /* Float_H */19 :
      case /* Float_pH */20 :
      case /* Float_sH */21 :
          return /* "H" */72;
      
    }
  }

  function bprint_fconv_flag(buf, fconv) {
    switch (fconv) {
      case /* Float_f */0 :
      case /* Float_e */3 :
      case /* Float_E */6 :
      case /* Float_g */9 :
      case /* Float_G */12 :
      case /* Float_F */15 :
      case /* Float_h */16 :
      case /* Float_H */19 :
          return ;
      case /* Float_pf */1 :
      case /* Float_pe */4 :
      case /* Float_pE */7 :
      case /* Float_pg */10 :
      case /* Float_pG */13 :
      case /* Float_ph */17 :
      case /* Float_pH */20 :
          return buffer_add_char(buf, /* "+" */43);
      case /* Float_sf */2 :
      case /* Float_se */5 :
      case /* Float_sE */8 :
      case /* Float_sg */11 :
      case /* Float_sG */14 :
      case /* Float_sh */18 :
      case /* Float_sH */21 :
          return buffer_add_char(buf, /* " " */32);
      
    }
  }

  function string_of_formatting_lit(formatting_lit) {
    if (typeof formatting_lit === "number") {
      switch (formatting_lit) {
        case /* Close_box */0 :
            return "@]";
        case /* Close_tag */1 :
            return "@}";
        case /* FFlush */2 :
            return "@?";
        case /* Force_newline */3 :
            return "@\n";
        case /* Flush_newline */4 :
            return "@.";
        case /* Escaped_at */5 :
            return "@@";
        case /* Escaped_percent */6 :
            return "@%";
        
      }
    } else {
      switch (formatting_lit.tag | 0) {
        case /* Break */0 :
        case /* Magic_size */1 :
            return formatting_lit[0];
        case /* Scan_indic */2 :
            return "@" + bytes_to_string(make(1, formatting_lit[0]));
        
      }
    }
  }

  function bprint_fmtty(buf, _fmtty) {
    while(true) {
      var fmtty = _fmtty;
      if (typeof fmtty === "number") {
        return ;
      }
      switch (fmtty.tag | 0) {
        case /* Char_ty */0 :
            buffer_add_string(buf, "%c");
            _fmtty = fmtty[0];
            continue ;
        case /* String_ty */1 :
            buffer_add_string(buf, "%s");
            _fmtty = fmtty[0];
            continue ;
        case /* Int_ty */2 :
            buffer_add_string(buf, "%i");
            _fmtty = fmtty[0];
            continue ;
        case /* Int32_ty */3 :
            buffer_add_string(buf, "%li");
            _fmtty = fmtty[0];
            continue ;
        case /* Nativeint_ty */4 :
            buffer_add_string(buf, "%ni");
            _fmtty = fmtty[0];
            continue ;
        case /* Int64_ty */5 :
            buffer_add_string(buf, "%Li");
            _fmtty = fmtty[0];
            continue ;
        case /* Float_ty */6 :
            buffer_add_string(buf, "%f");
            _fmtty = fmtty[0];
            continue ;
        case /* Bool_ty */7 :
            buffer_add_string(buf, "%B");
            _fmtty = fmtty[0];
            continue ;
        case /* Format_arg_ty */8 :
            buffer_add_string(buf, "%{");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%}");
            _fmtty = fmtty[1];
            continue ;
        case /* Format_subst_ty */9 :
            buffer_add_string(buf, "%(");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%)");
            _fmtty = fmtty[2];
            continue ;
        case /* Alpha_ty */10 :
            buffer_add_string(buf, "%a");
            _fmtty = fmtty[0];
            continue ;
        case /* Theta_ty */11 :
            buffer_add_string(buf, "%t");
            _fmtty = fmtty[0];
            continue ;
        case /* Any_ty */12 :
            buffer_add_string(buf, "%?");
            _fmtty = fmtty[0];
            continue ;
        case /* Reader_ty */13 :
            buffer_add_string(buf, "%r");
            _fmtty = fmtty[0];
            continue ;
        case /* Ignored_reader_ty */14 :
            buffer_add_string(buf, "%_r");
            _fmtty = fmtty[0];
            continue ;
        
      }
    }}

  function symm(rest) {
    if (typeof rest === "number") {
      return /* End_of_fmtty */0;
    }
    switch (rest.tag | 0) {
      case /* Char_ty */0 :
          return /* Char_ty */__(0, [symm(rest[0])]);
      case /* String_ty */1 :
          return /* String_ty */__(1, [symm(rest[0])]);
      case /* Int_ty */2 :
          return /* Int_ty */__(2, [symm(rest[0])]);
      case /* Int32_ty */3 :
          return /* Int32_ty */__(3, [symm(rest[0])]);
      case /* Nativeint_ty */4 :
          return /* Nativeint_ty */__(4, [symm(rest[0])]);
      case /* Int64_ty */5 :
          return /* Int64_ty */__(5, [symm(rest[0])]);
      case /* Float_ty */6 :
          return /* Float_ty */__(6, [symm(rest[0])]);
      case /* Bool_ty */7 :
          return /* Bool_ty */__(7, [symm(rest[0])]);
      case /* Format_arg_ty */8 :
          return /* Format_arg_ty */__(8, [
                    rest[0],
                    symm(rest[1])
                  ]);
      case /* Format_subst_ty */9 :
          return /* Format_subst_ty */__(9, [
                    rest[1],
                    rest[0],
                    symm(rest[2])
                  ]);
      case /* Alpha_ty */10 :
          return /* Alpha_ty */__(10, [symm(rest[0])]);
      case /* Theta_ty */11 :
          return /* Theta_ty */__(11, [symm(rest[0])]);
      case /* Any_ty */12 :
          return /* Any_ty */__(12, [symm(rest[0])]);
      case /* Reader_ty */13 :
          return /* Reader_ty */__(13, [symm(rest[0])]);
      case /* Ignored_reader_ty */14 :
          return /* Ignored_reader_ty */__(14, [symm(rest[0])]);
      
    }
  }

  function fmtty_rel_det(rest) {
    if (typeof rest === "number") {
      return /* tuple */[
              (function (param) {
                  return /* Refl */0;
                }),
              (function (param) {
                  return /* Refl */0;
                }),
              (function (param) {
                  return /* Refl */0;
                }),
              (function (param) {
                  return /* Refl */0;
                })
            ];
    }
    switch (rest.tag | 0) {
      case /* Char_ty */0 :
          var match = fmtty_rel_det(rest[0]);
          var af = match[1];
          var fa = match[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match[2],
                  match[3]
                ];
      case /* String_ty */1 :
          var match$1 = fmtty_rel_det(rest[0]);
          var af$1 = match$1[1];
          var fa$1 = match$1[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$1[2],
                  match$1[3]
                ];
      case /* Int_ty */2 :
          var match$2 = fmtty_rel_det(rest[0]);
          var af$2 = match$2[1];
          var fa$2 = match$2[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$2[2],
                  match$2[3]
                ];
      case /* Int32_ty */3 :
          var match$3 = fmtty_rel_det(rest[0]);
          var af$3 = match$3[1];
          var fa$3 = match$3[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$3[2],
                  match$3[3]
                ];
      case /* Nativeint_ty */4 :
          var match$4 = fmtty_rel_det(rest[0]);
          var af$4 = match$4[1];
          var fa$4 = match$4[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$4[2],
                  match$4[3]
                ];
      case /* Int64_ty */5 :
          var match$5 = fmtty_rel_det(rest[0]);
          var af$5 = match$5[1];
          var fa$5 = match$5[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$5[2],
                  match$5[3]
                ];
      case /* Float_ty */6 :
          var match$6 = fmtty_rel_det(rest[0]);
          var af$6 = match$6[1];
          var fa$6 = match$6[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$6[2],
                  match$6[3]
                ];
      case /* Bool_ty */7 :
          var match$7 = fmtty_rel_det(rest[0]);
          var af$7 = match$7[1];
          var fa$7 = match$7[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$7[2],
                  match$7[3]
                ];
      case /* Format_arg_ty */8 :
          var match$8 = fmtty_rel_det(rest[1]);
          var af$8 = match$8[1];
          var fa$8 = match$8[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$8[2],
                  match$8[3]
                ];
      case /* Format_subst_ty */9 :
          var match$9 = fmtty_rel_det(rest[2]);
          var de = match$9[3];
          var ed = match$9[2];
          var af$9 = match$9[1];
          var fa$9 = match$9[0];
          var ty = trans(symm(rest[0]), rest[1]);
          var match$10 = fmtty_rel_det(ty);
          var jd = match$10[3];
          var dj = match$10[2];
          var ga = match$10[1];
          var ag = match$10[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$9, /* Refl */0);
                      _1(ag, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ga, /* Refl */0);
                      _1(af$9, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ed, /* Refl */0);
                      _1(dj, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(jd, /* Refl */0);
                      _1(de, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case /* Alpha_ty */10 :
          var match$11 = fmtty_rel_det(rest[0]);
          var af$10 = match$11[1];
          var fa$10 = match$11[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$11[2],
                  match$11[3]
                ];
      case /* Theta_ty */11 :
          var match$12 = fmtty_rel_det(rest[0]);
          var af$11 = match$12[1];
          var fa$11 = match$12[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$12[2],
                  match$12[3]
                ];
      case /* Any_ty */12 :
          var match$13 = fmtty_rel_det(rest[0]);
          var af$12 = match$13[1];
          var fa$12 = match$13[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$13[2],
                  match$13[3]
                ];
      case /* Reader_ty */13 :
          var match$14 = fmtty_rel_det(rest[0]);
          var de$1 = match$14[3];
          var ed$1 = match$14[2];
          var af$13 = match$14[1];
          var fa$13 = match$14[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ed$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(de$1, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case /* Ignored_reader_ty */14 :
          var match$15 = fmtty_rel_det(rest[0]);
          var de$2 = match$15[3];
          var ed$2 = match$15[2];
          var af$14 = match$15[1];
          var fa$14 = match$15[0];
          return /* tuple */[
                  (function (param) {
                      _1(fa$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ed$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(de$2, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      
    }
  }

  function trans(ty1, ty2) {
    var exit = 0;
    if (typeof ty1 === "number") {
      if (typeof ty2 === "number") {
        return /* End_of_fmtty */0;
      }
      switch (ty2.tag | 0) {
        case /* Format_arg_ty */8 :
            exit = 6;
            break;
        case /* Format_subst_ty */9 :
            exit = 7;
            break;
        case /* Alpha_ty */10 :
            exit = 1;
            break;
        case /* Theta_ty */11 :
            exit = 2;
            break;
        case /* Any_ty */12 :
            exit = 3;
            break;
        case /* Reader_ty */13 :
            exit = 4;
            break;
        case /* Ignored_reader_ty */14 :
            exit = 5;
            break;
        default:
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  846,
                  23
                ]
              ];
      }
    } else {
      switch (ty1.tag | 0) {
        case /* Char_ty */0 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Char_ty */0 :
                    return /* Char_ty */__(0, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* String_ty */1 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* String_ty */1 :
                    return /* String_ty */__(1, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Int_ty */2 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Int_ty */2 :
                    return /* Int_ty */__(2, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Int32_ty */3 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Int32_ty */3 :
                    return /* Int32_ty */__(3, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Nativeint_ty */4 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Nativeint_ty */4 :
                    return /* Nativeint_ty */__(4, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Int64_ty */5 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Int64_ty */5 :
                    return /* Int64_ty */__(5, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Float_ty */6 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Float_ty */6 :
                    return /* Float_ty */__(6, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Bool_ty */7 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.tag | 0) {
                case /* Bool_ty */7 :
                    return /* Bool_ty */__(7, [trans(ty1[0], ty2[0])]);
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Format_arg_ty */8 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      832,
                      26
                    ]
                  ];
            }
            switch (ty2.tag | 0) {
              case /* Format_arg_ty */8 :
                  return /* Format_arg_ty */__(8, [
                            trans(ty1[0], ty2[0]),
                            trans(ty1[1], ty2[1])
                          ]);
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  exit = 4;
                  break;
              case /* Ignored_reader_ty */14 :
                  exit = 5;
                  break;
              default:
                throw [
                      assert_failure,
                      /* tuple */[
                        "camlinternalFormat.ml",
                        832,
                        26
                      ]
                    ];
            }
            break;
        case /* Format_subst_ty */9 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      842,
                      28
                    ]
                  ];
            }
            switch (ty2.tag | 0) {
              case /* Format_arg_ty */8 :
                  exit = 6;
                  break;
              case /* Format_subst_ty */9 :
                  var ty = trans(symm(ty1[1]), ty2[0]);
                  var match = fmtty_rel_det(ty);
                  _1(match[1], /* Refl */0);
                  _1(match[3], /* Refl */0);
                  return /* Format_subst_ty */__(9, [
                            ty1[0],
                            ty2[1],
                            trans(ty1[2], ty2[2])
                          ]);
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  exit = 4;
                  break;
              case /* Ignored_reader_ty */14 :
                  exit = 5;
                  break;
              default:
                throw [
                      assert_failure,
                      /* tuple */[
                        "camlinternalFormat.ml",
                        842,
                        28
                      ]
                    ];
            }
            break;
        case /* Alpha_ty */10 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      810,
                      21
                    ]
                  ];
            }
            if (ty2.tag === /* Alpha_ty */10) {
              return /* Alpha_ty */__(10, [trans(ty1[0], ty2[0])]);
            }
            throw [
                  assert_failure,
                  /* tuple */[
                    "camlinternalFormat.ml",
                    810,
                    21
                  ]
                ];
        case /* Theta_ty */11 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      814,
                      21
                    ]
                  ];
            }
            switch (ty2.tag | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  return /* Theta_ty */__(11, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      /* tuple */[
                        "camlinternalFormat.ml",
                        814,
                        21
                      ]
                    ];
            }
            break;
        case /* Any_ty */12 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      818,
                      19
                    ]
                  ];
            }
            switch (ty2.tag | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  return /* Any_ty */__(12, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      /* tuple */[
                        "camlinternalFormat.ml",
                        818,
                        19
                      ]
                    ];
            }
            break;
        case /* Reader_ty */13 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      822,
                      22
                    ]
                  ];
            }
            switch (ty2.tag | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  return /* Reader_ty */__(13, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      /* tuple */[
                        "camlinternalFormat.ml",
                        822,
                        22
                      ]
                    ];
            }
            break;
        case /* Ignored_reader_ty */14 :
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    /* tuple */[
                      "camlinternalFormat.ml",
                      827,
                      30
                    ]
                  ];
            }
            switch (ty2.tag | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  exit = 4;
                  break;
              case /* Ignored_reader_ty */14 :
                  return /* Ignored_reader_ty */__(14, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      /* tuple */[
                        "camlinternalFormat.ml",
                        827,
                        30
                      ]
                    ];
            }
            break;
        
      }
    }
    switch (exit) {
      case 1 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  811,
                  21
                ]
              ];
      case 2 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  815,
                  21
                ]
              ];
      case 3 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  819,
                  19
                ]
              ];
      case 4 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  823,
                  22
                ]
              ];
      case 5 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  828,
                  30
                ]
              ];
      case 6 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  833,
                  26
                ]
              ];
      case 7 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  843,
                  28
                ]
              ];
      case 8 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  847,
                  23
                ]
              ];
      
    }
  }

  var Type_mismatch = create("CamlinternalFormat.Type_mismatch");

  function type_padding(pad, fmtty) {
    if (typeof pad === "number") {
      return /* Padding_fmtty_EBB */[
              /* No_padding */0,
              fmtty
            ];
    }
    if (!pad.tag) {
      return /* Padding_fmtty_EBB */[
              /* Lit_padding */__(0, [
                  pad[0],
                  pad[1]
                ]),
              fmtty
            ];
    }
    if (typeof fmtty === "number") {
      throw Type_mismatch;
    }
    if (fmtty.tag === /* Int_ty */2) {
      return /* Padding_fmtty_EBB */[
              /* Arg_padding */__(1, [pad[0]]),
              fmtty[0]
            ];
    }
    throw Type_mismatch;
  }

  function type_padprec(pad, prec, fmtty) {
    var match = type_padding(pad, fmtty);
    if (typeof prec !== "number") {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* Lit_precision */[prec[0]],
              match[1]
            ];
    }
    if (prec === 0) {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* No_precision */0,
              match[1]
            ];
    }
    var rest = match[1];
    if (typeof rest === "number") {
      throw Type_mismatch;
    }
    if (rest.tag === /* Int_ty */2) {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* Arg_precision */1,
              rest[0]
            ];
    }
    throw Type_mismatch;
  }

  function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
    if (typeof sub_fmtty === "number") {
      return /* Fmtty_fmt_EBB */[
              /* End_of_fmtty */0,
              type_format_gen(fmt, fmtty)
            ];
    }
    switch (sub_fmtty.tag | 0) {
      case /* Char_ty */0 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag) {
            throw Type_mismatch;
          }
          var match = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
          return /* Fmtty_fmt_EBB */[
                  /* Char_ty */__(0, [match[0]]),
                  match[1]
                ];
      case /* String_ty */1 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* String_ty */1) {
            var match$1 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* String_ty */__(1, [match$1[0]]),
                    match$1[1]
                  ];
          }
          throw Type_mismatch;
      case /* Int_ty */2 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Int_ty */2) {
            var match$2 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int_ty */__(2, [match$2[0]]),
                    match$2[1]
                  ];
          }
          throw Type_mismatch;
      case /* Int32_ty */3 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Int32_ty */3) {
            var match$3 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int32_ty */__(3, [match$3[0]]),
                    match$3[1]
                  ];
          }
          throw Type_mismatch;
      case /* Nativeint_ty */4 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Nativeint_ty */4) {
            var match$4 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Nativeint_ty */__(4, [match$4[0]]),
                    match$4[1]
                  ];
          }
          throw Type_mismatch;
      case /* Int64_ty */5 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Int64_ty */5) {
            var match$5 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int64_ty */__(5, [match$5[0]]),
                    match$5[1]
                  ];
          }
          throw Type_mismatch;
      case /* Float_ty */6 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Float_ty */6) {
            var match$6 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Float_ty */__(6, [match$6[0]]),
                    match$6[1]
                  ];
          }
          throw Type_mismatch;
      case /* Bool_ty */7 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Bool_ty */7) {
            var match$7 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Bool_ty */__(7, [match$7[0]]),
                    match$7[1]
                  ];
          }
          throw Type_mismatch;
      case /* Format_arg_ty */8 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Format_arg_ty */8) {
            var sub2_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[sub_fmtty[0]], /* Fmtty_EBB */[sub2_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$8 = type_ignored_format_substitution(sub_fmtty[1], fmt, fmtty[1]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_arg_ty */__(8, [
                        sub2_fmtty$prime,
                        match$8[0]
                      ]),
                    match$8[1]
                  ];
          }
          throw Type_mismatch;
      case /* Format_subst_ty */9 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Format_subst_ty */9) {
            var sub2_fmtty$prime$1 = fmtty[1];
            var sub1_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[0])], /* Fmtty_EBB */[erase_rel(sub1_fmtty$prime)])) {
              throw Type_mismatch;
            }
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[1])], /* Fmtty_EBB */[erase_rel(sub2_fmtty$prime$1)])) {
              throw Type_mismatch;
            }
            var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
            var match$9 = fmtty_rel_det(sub_fmtty$prime);
            _1(match$9[1], /* Refl */0);
            _1(match$9[3], /* Refl */0);
            var match$10 = type_ignored_format_substitution(erase_rel(sub_fmtty[2]), fmt, fmtty[2]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_subst_ty */__(9, [
                        sub1_fmtty$prime,
                        sub2_fmtty$prime$1,
                        symm(match$10[0])
                      ]),
                    match$10[1]
                  ];
          }
          throw Type_mismatch;
      case /* Alpha_ty */10 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Alpha_ty */10) {
            var match$11 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Alpha_ty */__(10, [match$11[0]]),
                    match$11[1]
                  ];
          }
          throw Type_mismatch;
      case /* Theta_ty */11 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Theta_ty */11) {
            var match$12 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Theta_ty */__(11, [match$12[0]]),
                    match$12[1]
                  ];
          }
          throw Type_mismatch;
      case /* Any_ty */12 :
          throw Type_mismatch;
      case /* Reader_ty */13 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Reader_ty */13) {
            var match$13 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Reader_ty */__(13, [match$13[0]]),
                    match$13[1]
                  ];
          }
          throw Type_mismatch;
      case /* Ignored_reader_ty */14 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Ignored_reader_ty */14) {
            var match$14 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Ignored_reader_ty */__(14, [match$14[0]]),
                    match$14[1]
                  ];
          }
          throw Type_mismatch;
      
    }
  }

  function type_format_gen(fmt, fmtty) {
    if (typeof fmt === "number") {
      return /* Fmt_fmtty_EBB */[
              /* End_of_format */0,
              fmtty
            ];
    }
    switch (fmt.tag | 0) {
      case /* Char */0 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag) {
            throw Type_mismatch;
          }
          var match = type_format_gen(fmt[0], fmtty[0]);
          return /* Fmt_fmtty_EBB */[
                  /* Char */__(0, [match[0]]),
                  match[1]
                ];
      case /* Caml_char */1 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag) {
            throw Type_mismatch;
          }
          var match$1 = type_format_gen(fmt[0], fmtty[0]);
          return /* Fmt_fmtty_EBB */[
                  /* Caml_char */__(1, [match$1[0]]),
                  match$1[1]
                ];
      case /* String */2 :
          var match$2 = type_padding(fmt[0], fmtty);
          var fmtty_rest = match$2[1];
          if (typeof fmtty_rest === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest.tag === /* String_ty */1) {
            var match$3 = type_format_gen(fmt[1], fmtty_rest[0]);
            return /* Fmt_fmtty_EBB */[
                    /* String */__(2, [
                        match$2[0],
                        match$3[0]
                      ]),
                    match$3[1]
                  ];
          }
          throw Type_mismatch;
      case /* Caml_string */3 :
          var match$4 = type_padding(fmt[0], fmtty);
          var fmtty_rest$1 = match$4[1];
          if (typeof fmtty_rest$1 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$1.tag === /* String_ty */1) {
            var match$5 = type_format_gen(fmt[1], fmtty_rest$1[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_string */__(3, [
                        match$4[0],
                        match$5[0]
                      ]),
                    match$5[1]
                  ];
          }
          throw Type_mismatch;
      case /* Int */4 :
          var match$6 = type_padprec(fmt[1], fmt[2], fmtty);
          var fmtty_rest$2 = match$6[2];
          if (typeof fmtty_rest$2 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$2.tag === /* Int_ty */2) {
            var match$7 = type_format_gen(fmt[3], fmtty_rest$2[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int */__(4, [
                        fmt[0],
                        match$6[0],
                        match$6[1],
                        match$7[0]
                      ]),
                    match$7[1]
                  ];
          }
          throw Type_mismatch;
      case /* Int32 */5 :
          var match$8 = type_padprec(fmt[1], fmt[2], fmtty);
          var fmtty_rest$3 = match$8[2];
          if (typeof fmtty_rest$3 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$3.tag === /* Int32_ty */3) {
            var match$9 = type_format_gen(fmt[3], fmtty_rest$3[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int32 */__(5, [
                        fmt[0],
                        match$8[0],
                        match$8[1],
                        match$9[0]
                      ]),
                    match$9[1]
                  ];
          }
          throw Type_mismatch;
      case /* Nativeint */6 :
          var match$10 = type_padprec(fmt[1], fmt[2], fmtty);
          var fmtty_rest$4 = match$10[2];
          if (typeof fmtty_rest$4 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$4.tag === /* Nativeint_ty */4) {
            var match$11 = type_format_gen(fmt[3], fmtty_rest$4[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Nativeint */__(6, [
                        fmt[0],
                        match$10[0],
                        match$10[1],
                        match$11[0]
                      ]),
                    match$11[1]
                  ];
          }
          throw Type_mismatch;
      case /* Int64 */7 :
          var match$12 = type_padprec(fmt[1], fmt[2], fmtty);
          var fmtty_rest$5 = match$12[2];
          if (typeof fmtty_rest$5 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$5.tag === /* Int64_ty */5) {
            var match$13 = type_format_gen(fmt[3], fmtty_rest$5[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int64 */__(7, [
                        fmt[0],
                        match$12[0],
                        match$12[1],
                        match$13[0]
                      ]),
                    match$13[1]
                  ];
          }
          throw Type_mismatch;
      case /* Float */8 :
          var match$14 = type_padprec(fmt[1], fmt[2], fmtty);
          var fmtty_rest$6 = match$14[2];
          if (typeof fmtty_rest$6 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$6.tag === /* Float_ty */6) {
            var match$15 = type_format_gen(fmt[3], fmtty_rest$6[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Float */__(8, [
                        fmt[0],
                        match$14[0],
                        match$14[1],
                        match$15[0]
                      ]),
                    match$15[1]
                  ];
          }
          throw Type_mismatch;
      case /* Bool */9 :
          var match$16 = type_padding(fmt[0], fmtty);
          var fmtty_rest$7 = match$16[1];
          if (typeof fmtty_rest$7 === "number") {
            throw Type_mismatch;
          }
          if (fmtty_rest$7.tag === /* Bool_ty */7) {
            var match$17 = type_format_gen(fmt[1], fmtty_rest$7[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Bool */__(9, [
                        match$16[0],
                        match$17[0]
                      ]),
                    match$17[1]
                  ];
          }
          throw Type_mismatch;
      case /* Flush */10 :
          var match$18 = type_format_gen(fmt[0], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Flush */__(10, [match$18[0]]),
                  match$18[1]
                ];
      case /* String_literal */11 :
          var match$19 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* String_literal */__(11, [
                      fmt[0],
                      match$19[0]
                    ]),
                  match$19[1]
                ];
      case /* Char_literal */12 :
          var match$20 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Char_literal */__(12, [
                      fmt[0],
                      match$20[0]
                    ]),
                  match$20[1]
                ];
      case /* Format_arg */13 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Format_arg_ty */8) {
            var sub_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[fmt[1]], /* Fmtty_EBB */[sub_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$21 = type_format_gen(fmt[2], fmtty[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Format_arg */__(13, [
                        fmt[0],
                        sub_fmtty$prime,
                        match$21[0]
                      ]),
                    match$21[1]
                  ];
          }
          throw Type_mismatch;
      case /* Format_subst */14 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Format_subst_ty */9) {
            var sub_fmtty1 = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(fmt[1])], /* Fmtty_EBB */[erase_rel(sub_fmtty1)])) {
              throw Type_mismatch;
            }
            var match$22 = type_format_gen(fmt[2], erase_rel(fmtty[2]));
            return /* Fmt_fmtty_EBB */[
                    /* Format_subst */__(14, [
                        fmt[0],
                        sub_fmtty1,
                        match$22[0]
                      ]),
                    match$22[1]
                  ];
          }
          throw Type_mismatch;
      case /* Alpha */15 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Alpha_ty */10) {
            var match$23 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Alpha */__(15, [match$23[0]]),
                    match$23[1]
                  ];
          }
          throw Type_mismatch;
      case /* Theta */16 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Theta_ty */11) {
            var match$24 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Theta */__(16, [match$24[0]]),
                    match$24[1]
                  ];
          }
          throw Type_mismatch;
      case /* Formatting_lit */17 :
          var match$25 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Formatting_lit */__(17, [
                      fmt[0],
                      match$25[0]
                    ]),
                  match$25[1]
                ];
      case /* Formatting_gen */18 :
          var formatting_gen = fmt[0];
          var fmt0 = fmt[1];
          if (formatting_gen.tag) {
            var match$26 = formatting_gen[0];
            var match$27 = type_format_gen(match$26[0], fmtty);
            var match$28 = type_format_gen(fmt0, match$27[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */__(18, [
                        /* Open_box */__(1, [/* Format */[
                              match$27[0],
                              match$26[1]
                            ]]),
                        match$28[0]
                      ]),
                    match$28[1]
                  ];
          }
          var match$29 = formatting_gen[0];
          var match$30 = type_format_gen(match$29[0], fmtty);
          var match$31 = type_format_gen(fmt0, match$30[1]);
          return /* Fmt_fmtty_EBB */[
                  /* Formatting_gen */__(18, [
                      /* Open_tag */__(0, [/* Format */[
                            match$30[0],
                            match$29[1]
                          ]]),
                      match$31[0]
                    ]),
                  match$31[1]
                ];
      case /* Reader */19 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Reader_ty */13) {
            var match$32 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Reader */__(19, [match$32[0]]),
                    match$32[1]
                  ];
          }
          throw Type_mismatch;
      case /* Scan_char_set */20 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* String_ty */1) {
            var match$33 = type_format_gen(fmt[2], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_char_set */__(20, [
                        fmt[0],
                        fmt[1],
                        match$33[0]
                      ]),
                    match$33[1]
                  ];
          }
          throw Type_mismatch;
      case /* Scan_get_counter */21 :
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          }
          if (fmtty.tag === /* Int_ty */2) {
            var match$34 = type_format_gen(fmt[1], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_get_counter */__(21, [
                        fmt[0],
                        match$34[0]
                      ]),
                    match$34[1]
                  ];
          }
          throw Type_mismatch;
      case /* Ignored_param */23 :
          var ign = fmt[0];
          var fmt$1 = fmt[1];
          if (typeof ign === "number") {
            if (ign !== /* Ignored_reader */2) {
              return type_ignored_param_one(ign, fmt$1, fmtty);
            }
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            }
            if (fmtty.tag === /* Ignored_reader_ty */14) {
              var match$35 = type_format_gen(fmt$1, fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Ignored_param */__(23, [
                          /* Ignored_reader */2,
                          match$35[0]
                        ]),
                      match$35[1]
                    ];
            }
            throw Type_mismatch;
          } else {
            switch (ign.tag | 0) {
              case /* Ignored_format_arg */8 :
                  return type_ignored_param_one(/* Ignored_format_arg */__(8, [
                                ign[0],
                                ign[1]
                              ]), fmt$1, fmtty);
              case /* Ignored_format_subst */9 :
                  var match$36 = type_ignored_format_substitution(ign[1], fmt$1, fmtty);
                  var match$37 = match$36[1];
                  return /* Fmt_fmtty_EBB */[
                          /* Ignored_param */__(23, [
                              /* Ignored_format_subst */__(9, [
                                  ign[0],
                                  match$36[0]
                                ]),
                              match$37[0]
                            ]),
                          match$37[1]
                        ];
              default:
                return type_ignored_param_one(ign, fmt$1, fmtty);
            }
          }
      case /* Scan_next_char */22 :
      case /* Custom */24 :
          throw Type_mismatch;
      
    }
  }

  function type_ignored_param_one(ign, fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    return /* Fmt_fmtty_EBB */[
            /* Ignored_param */__(23, [
                ign,
                match[0]
              ]),
            match[1]
          ];
  }

  function type_format(fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    if (typeof match[1] === "number") {
      return match[0];
    }
    throw Type_mismatch;
  }

  function recast(fmt, fmtty) {
    return type_format(fmt, erase_rel(symm(fmtty)));
  }

  function fix_padding(padty, width, str) {
    var len = str.length;
    var width$1 = abs(width);
    var padty$1 = width < 0 ? /* Left */0 : padty;
    if (width$1 <= len) {
      return str;
    }
    var res = make(width$1, padty$1 === /* Zeros */2 ? /* "0" */48 : /* " " */32);
    switch (padty$1) {
      case /* Left */0 :
          blit$1(str, 0, res, 0, len);
          break;
      case /* Right */1 :
          blit$1(str, 0, res, width$1 - len | 0, len);
          break;
      case /* Zeros */2 :
          if (len > 0 && (get(str, 0) === /* "+" */43 || get(str, 0) === /* "-" */45 || get(str, 0) === /* " " */32)) {
            res[0] = get(str, 0);
            blit$1(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
          } else if (len > 1 && get(str, 0) === /* "0" */48 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
            res[1] = get(str, 1);
            blit$1(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
          } else {
            blit$1(str, 0, res, width$1 - len | 0, len);
          }
          break;
      
    }
    return bytes_to_string(res);
  }

  function fix_int_precision(prec, str) {
    var prec$1 = abs(prec);
    var len = str.length;
    var c = get(str, 0);
    var exit = 0;
    if (c >= 58) {
      if (c >= 71) {
        if (c > 102 || c < 97) {
          return str;
        }
        exit = 2;
      } else {
        if (c < 65) {
          return str;
        }
        exit = 2;
      }
    } else if (c !== 32) {
      if (c < 43) {
        return str;
      }
      switch (c - 43 | 0) {
        case 0 :
        case 2 :
            exit = 1;
            break;
        case 1 :
        case 3 :
        case 4 :
            return str;
        case 5 :
            if ((prec$1 + 2 | 0) > len && len > 1 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
              var res = make(prec$1 + 2 | 0, /* "0" */48);
              res[1] = get(str, 1);
              blit$1(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
              return bytes_to_string(res);
            }
            exit = 2;
            break;
        case 6 :
        case 7 :
        case 8 :
        case 9 :
        case 10 :
        case 11 :
        case 12 :
        case 13 :
        case 14 :
            exit = 2;
            break;
        
      }
    } else {
      exit = 1;
    }
    switch (exit) {
      case 1 :
          if ((prec$1 + 1 | 0) <= len) {
            return str;
          }
          var res$1 = make(prec$1 + 1 | 0, /* "0" */48);
          res$1[0] = c;
          blit$1(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
          return bytes_to_string(res$1);
      case 2 :
          if (prec$1 <= len) {
            return str;
          }
          var res$2 = make(prec$1, /* "0" */48);
          blit$1(str, 0, res$2, prec$1 - len | 0, len);
          return bytes_to_string(res$2);
      
    }
  }

  function string_to_caml_string(str) {
    var str$1 = escaped$2(str);
    var l = str$1.length;
    var res = make(l + 2 | 0, /* "\"" */34);
    caml_blit_string(str$1, 0, res, 1, l);
    return bytes_to_string(res);
  }

  function format_of_iconv(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%d";
      case /* Int_pd */1 :
          return "%+d";
      case /* Int_sd */2 :
          return "% d";
      case /* Int_i */3 :
          return "%i";
      case /* Int_pi */4 :
          return "%+i";
      case /* Int_si */5 :
          return "% i";
      case /* Int_x */6 :
          return "%x";
      case /* Int_Cx */7 :
          return "%#x";
      case /* Int_X */8 :
          return "%X";
      case /* Int_CX */9 :
          return "%#X";
      case /* Int_o */10 :
          return "%o";
      case /* Int_Co */11 :
          return "%#o";
      case /* Int_u */12 :
          return "%u";
      
    }
  }

  function format_of_iconvL(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%Ld";
      case /* Int_pd */1 :
          return "%+Ld";
      case /* Int_sd */2 :
          return "% Ld";
      case /* Int_i */3 :
          return "%Li";
      case /* Int_pi */4 :
          return "%+Li";
      case /* Int_si */5 :
          return "% Li";
      case /* Int_x */6 :
          return "%Lx";
      case /* Int_Cx */7 :
          return "%#Lx";
      case /* Int_X */8 :
          return "%LX";
      case /* Int_CX */9 :
          return "%#LX";
      case /* Int_o */10 :
          return "%Lo";
      case /* Int_Co */11 :
          return "%#Lo";
      case /* Int_u */12 :
          return "%Lu";
      
    }
  }

  function format_of_iconvl(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%ld";
      case /* Int_pd */1 :
          return "%+ld";
      case /* Int_sd */2 :
          return "% ld";
      case /* Int_i */3 :
          return "%li";
      case /* Int_pi */4 :
          return "%+li";
      case /* Int_si */5 :
          return "% li";
      case /* Int_x */6 :
          return "%lx";
      case /* Int_Cx */7 :
          return "%#lx";
      case /* Int_X */8 :
          return "%lX";
      case /* Int_CX */9 :
          return "%#lX";
      case /* Int_o */10 :
          return "%lo";
      case /* Int_Co */11 :
          return "%#lo";
      case /* Int_u */12 :
          return "%lu";
      
    }
  }

  function format_of_iconvn(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%nd";
      case /* Int_pd */1 :
          return "%+nd";
      case /* Int_sd */2 :
          return "% nd";
      case /* Int_i */3 :
          return "%ni";
      case /* Int_pi */4 :
          return "%+ni";
      case /* Int_si */5 :
          return "% ni";
      case /* Int_x */6 :
          return "%nx";
      case /* Int_Cx */7 :
          return "%#nx";
      case /* Int_X */8 :
          return "%nX";
      case /* Int_CX */9 :
          return "%#nX";
      case /* Int_o */10 :
          return "%no";
      case /* Int_Co */11 :
          return "%#no";
      case /* Int_u */12 :
          return "%nu";
      
    }
  }

  function format_of_fconv(fconv, prec) {
    if (fconv === /* Float_F */15) {
      return "%.12g";
    }
    var prec$1 = abs(prec);
    var symb = char_of_fconv(fconv);
    var buf = {
      ind: 0,
      bytes: caml_create_bytes(16)
    };
    buffer_add_char(buf, /* "%" */37);
    bprint_fconv_flag(buf, fconv);
    buffer_add_char(buf, /* "." */46);
    buffer_add_string(buf, String(prec$1));
    buffer_add_char(buf, symb);
    return buffer_contents(buf);
  }

  function convert_int(iconv, n) {
    return caml_format_int(format_of_iconv(iconv), n);
  }

  function convert_int32(iconv, n) {
    return caml_int32_format(format_of_iconvl(iconv), n);
  }

  function convert_nativeint(iconv, n) {
    return caml_nativeint_format(format_of_iconvn(iconv), n);
  }

  function convert_int64(iconv, n) {
    return caml_int64_format(format_of_iconvL(iconv), n);
  }

  function convert_float(fconv, prec, x) {
    if (fconv >= 16) {
      var sign;
      if (fconv >= 17) {
        switch (fconv - 17 | 0) {
          case /* Float_sf */2 :
              sign = /* "-" */45;
              break;
          case /* Float_f */0 :
          case /* Float_e */3 :
              sign = /* "+" */43;
              break;
          case /* Float_pf */1 :
          case /* Float_pe */4 :
              sign = /* " " */32;
              break;
          
        }
      } else {
        sign = /* "-" */45;
      }
      var str = caml_hexstring_of_float(x, prec, sign);
      if (fconv >= 19) {
        return bytes_to_string(uppercase_ascii$1(bytes_of_string(str)));
      } else {
        return str;
      }
    }
    var str$1 = caml_format_float(format_of_fconv(fconv, prec), x);
    if (fconv !== /* Float_F */15) {
      return str$1;
    }
    var len = str$1.length;
    var is_valid = function (_i) {
      while(true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        var match = get(str$1, i);
        var switcher = match - 46 | 0;
        if (switcher > 23 || switcher < 0) {
          if (switcher === 55) {
            return true;
          }
          _i = i + 1 | 0;
          continue ;
        }
        if (switcher > 22 || switcher < 1) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }  };
    var match = classify_float(x);
    if (match !== 3) {
      if (match >= 4) {
        return "nan";
      } else if (is_valid(0)) {
        return str$1;
      } else {
        return str$1 + ".";
      }
    } else if (x < 0.0) {
      return "neg_infinity";
    } else {
      return "infinity";
    }
  }

  function format_caml_char(c) {
    var str = escaped(c);
    var l = str.length;
    var res = make(l + 2 | 0, /* "'" */39);
    caml_blit_string(str, 0, res, 1, l);
    return bytes_to_string(res);
  }

  function string_of_fmtty(fmtty) {
    var buf = {
      ind: 0,
      bytes: caml_create_bytes(16)
    };
    bprint_fmtty(buf, fmtty);
    return buffer_contents(buf);
  }

  function make_printf(_k, o, _acc, _fmt) {
    while(true) {
      var fmt = _fmt;
      var acc = _acc;
      var k = _k;
      if (typeof fmt === "number") {
        return _2(k, o, acc);
      }
      switch (fmt.tag | 0) {
        case /* Char */0 :
            var rest = fmt[0];
            return (function(k,acc,rest){
            return function (c) {
              var new_acc = /* Acc_data_char */__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest);
            }
            }(k,acc,rest));
        case /* Caml_char */1 :
            var rest$1 = fmt[0];
            return (function(k,acc,rest$1){
            return function (c) {
              var new_acc_001 = format_caml_char(c);
              var new_acc = /* Acc_data_string */__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$1);
            }
            }(k,acc,rest$1));
        case /* String */2 :
            return make_padding(k, o, acc, fmt[1], fmt[0], (function (str) {
                          return str;
                        }));
        case /* Caml_string */3 :
            return make_padding(k, o, acc, fmt[1], fmt[0], string_to_caml_string);
        case /* Int */4 :
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int, fmt[0]);
        case /* Int32 */5 :
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int32, fmt[0]);
        case /* Nativeint */6 :
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_nativeint, fmt[0]);
        case /* Int64 */7 :
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int64, fmt[0]);
        case /* Float */8 :
            var fmt$1 = fmt[3];
            var pad = fmt[1];
            var prec = fmt[2];
            var fconv = fmt[0];
            if (typeof pad === "number") {
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k,acc,fmt$1,fconv){
                  return function (p, x) {
                    var str = convert_float(fconv, p, x);
                    return make_printf(k, o, /* Acc_data_string */__(4, [
                                  acc,
                                  str
                                ]), fmt$1);
                  }
                  }(k,acc,fmt$1,fconv));
                } else {
                  return (function(k,acc,fmt$1,fconv){
                  return function (x) {
                    var str = convert_float(fconv, -6, x);
                    return make_printf(k, o, /* Acc_data_string */__(4, [
                                  acc,
                                  str
                                ]), fmt$1);
                  }
                  }(k,acc,fmt$1,fconv));
                }
              }
              var p = prec[0];
              return (function(k,acc,fmt$1,fconv,p){
              return function (x) {
                var str = convert_float(fconv, p, x);
                return make_printf(k, o, /* Acc_data_string */__(4, [
                              acc,
                              str
                            ]), fmt$1);
              }
              }(k,acc,fmt$1,fconv,p));
            }
            if (pad.tag) {
              var padty = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k,acc,fmt$1,fconv,padty){
                  return function (w, p, x) {
                    var str = fix_padding(padty, w, convert_float(fconv, p, x));
                    return make_printf(k, o, /* Acc_data_string */__(4, [
                                  acc,
                                  str
                                ]), fmt$1);
                  }
                  }(k,acc,fmt$1,fconv,padty));
                } else {
                  return (function(k,acc,fmt$1,fconv,padty){
                  return function (w, x) {
                    var str = convert_float(fconv, -6, x);
                    var str$prime = fix_padding(padty, w, str);
                    return make_printf(k, o, /* Acc_data_string */__(4, [
                                  acc,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k,acc,fmt$1,fconv,padty));
                }
              }
              var p$1 = prec[0];
              return (function(k,acc,fmt$1,fconv,padty,p$1){
              return function (w, x) {
                var str = fix_padding(padty, w, convert_float(fconv, p$1, x));
                return make_printf(k, o, /* Acc_data_string */__(4, [
                              acc,
                              str
                            ]), fmt$1);
              }
              }(k,acc,fmt$1,fconv,padty,p$1));
            }
            var w = pad[1];
            var padty$1 = pad[0];
            if (typeof prec === "number") {
              if (prec !== 0) {
                return (function(k,acc,fmt$1,fconv,padty$1,w){
                return function (p, x) {
                  var str = fix_padding(padty$1, w, convert_float(fconv, p, x));
                  return make_printf(k, o, /* Acc_data_string */__(4, [
                                acc,
                                str
                              ]), fmt$1);
                }
                }(k,acc,fmt$1,fconv,padty$1,w));
              } else {
                return (function(k,acc,fmt$1,fconv,padty$1,w){
                return function (x) {
                  var str = convert_float(fconv, -6, x);
                  var str$prime = fix_padding(padty$1, w, str);
                  return make_printf(k, o, /* Acc_data_string */__(4, [
                                acc,
                                str$prime
                              ]), fmt$1);
                }
                }(k,acc,fmt$1,fconv,padty$1,w));
              }
            }
            var p$2 = prec[0];
            return (function(k,acc,fmt$1,fconv,padty$1,w,p$2){
            return function (x) {
              var str = fix_padding(padty$1, w, convert_float(fconv, p$2, x));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt$1);
            }
            }(k,acc,fmt$1,fconv,padty$1,w,p$2));
        case /* Bool */9 :
            return make_padding(k, o, acc, fmt[1], fmt[0], string_of_bool);
        case /* Flush */10 :
            _fmt = fmt[0];
            _acc = /* Acc_flush */__(7, [acc]);
            continue ;
        case /* String_literal */11 :
            _fmt = fmt[1];
            _acc = /* Acc_string_literal */__(2, [
                acc,
                fmt[0]
              ]);
            continue ;
        case /* Char_literal */12 :
            _fmt = fmt[1];
            _acc = /* Acc_char_literal */__(3, [
                acc,
                fmt[0]
              ]);
            continue ;
        case /* Format_arg */13 :
            var rest$2 = fmt[2];
            var ty = string_of_fmtty(fmt[1]);
            return (function(k,acc,rest$2,ty){
            return function (str) {
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            ty
                          ]), rest$2);
            }
            }(k,acc,rest$2,ty));
        case /* Format_subst */14 :
            var rest$3 = fmt[2];
            var fmtty = fmt[1];
            return (function(k,acc,fmtty,rest$3){
            return function (param) {
              return make_printf(k, o, acc, concat_fmt(recast(param[0], fmtty), rest$3));
            }
            }(k,acc,fmtty,rest$3));
        case /* Alpha */15 :
            var rest$4 = fmt[0];
            return (function(k,acc,rest$4){
            return function (f, x) {
              return make_printf(k, o, /* Acc_delay */__(6, [
                            acc,
                            (function (o) {
                                return _2(f, o, x);
                              })
                          ]), rest$4);
            }
            }(k,acc,rest$4));
        case /* Theta */16 :
            var rest$5 = fmt[0];
            return (function(k,acc,rest$5){
            return function (f) {
              return make_printf(k, o, /* Acc_delay */__(6, [
                            acc,
                            f
                          ]), rest$5);
            }
            }(k,acc,rest$5));
        case /* Formatting_lit */17 :
            _fmt = fmt[1];
            _acc = /* Acc_formatting_lit */__(0, [
                acc,
                fmt[0]
              ]);
            continue ;
        case /* Formatting_gen */18 :
            var match = fmt[0];
            if (match.tag) {
              var rest$6 = fmt[1];
              var k$prime = (function(k,acc,rest$6){
              return function k$prime(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                              acc,
                              /* Acc_open_box */__(1, [kacc])
                            ]), rest$6);
              }
              }(k,acc,rest$6));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime;
              continue ;
            }
            var rest$7 = fmt[1];
            var k$prime$1 = (function(k,acc,rest$7){
            return function k$prime$1(koc, kacc) {
              return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                            acc,
                            /* Acc_open_tag */__(0, [kacc])
                          ]), rest$7);
            }
            }(k,acc,rest$7));
            _fmt = match[0][0];
            _acc = /* End_of_acc */0;
            _k = k$prime$1;
            continue ;
        case /* Reader */19 :
            throw [
                  assert_failure,
                  /* tuple */[
                    "camlinternalFormat.ml",
                    1525,
                    4
                  ]
                ];
        case /* Scan_char_set */20 :
            var rest$8 = fmt[2];
            var new_acc = /* Acc_invalid_arg */__(8, [
                acc,
                "Printf: bad conversion %["
              ]);
            return (function(k,rest$8,new_acc){
            return function (param) {
              return make_printf(k, o, new_acc, rest$8);
            }
            }(k,rest$8,new_acc));
        case /* Scan_get_counter */21 :
            var rest$9 = fmt[1];
            return (function(k,acc,rest$9){
            return function (n) {
              var new_acc_001 = caml_format_int("%u", n);
              var new_acc = /* Acc_data_string */__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$9);
            }
            }(k,acc,rest$9));
        case /* Scan_next_char */22 :
            var rest$10 = fmt[0];
            return (function(k,acc,rest$10){
            return function (c) {
              var new_acc = /* Acc_data_char */__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest$10);
            }
            }(k,acc,rest$10));
        case /* Ignored_param */23 :
            return make_ignored_param(k, o, acc, fmt[0], fmt[1]);
        case /* Custom */24 :
            return make_custom(k, o, acc, fmt[2], fmt[0], _1(fmt[1], undefined));
        
      }
    }}

  function make_ignored_param(k, o, acc, ign, fmt) {
    if (typeof ign !== "number") {
      if (ign.tag === /* Ignored_format_subst */9) {
        return make_from_fmtty(k, o, acc, ign[1], fmt);
      } else {
        return make_invalid_arg(k, o, acc, fmt);
      }
    }
    if (ign !== /* Ignored_reader */2) {
      return make_invalid_arg(k, o, acc, fmt);
    }
    throw [
          assert_failure,
          /* tuple */[
            "camlinternalFormat.ml",
            1593,
            39
          ]
        ];
  }

  function make_from_fmtty(k, o, acc, fmtty, fmt) {
    if (typeof fmtty === "number") {
      return make_invalid_arg(k, o, acc, fmt);
    }
    switch (fmtty.tag | 0) {
      case /* Char_ty */0 :
          var rest = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest, fmt);
            });
      case /* String_ty */1 :
          var rest$1 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$1, fmt);
            });
      case /* Int_ty */2 :
          var rest$2 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$2, fmt);
            });
      case /* Int32_ty */3 :
          var rest$3 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$3, fmt);
            });
      case /* Nativeint_ty */4 :
          var rest$4 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$4, fmt);
            });
      case /* Int64_ty */5 :
          var rest$5 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$5, fmt);
            });
      case /* Float_ty */6 :
          var rest$6 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$6, fmt);
            });
      case /* Bool_ty */7 :
          var rest$7 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$7, fmt);
            });
      case /* Format_arg_ty */8 :
          var rest$8 = fmtty[1];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$8, fmt);
            });
      case /* Format_subst_ty */9 :
          var rest$9 = fmtty[2];
          var ty = trans(symm(fmtty[0]), fmtty[1]);
          return (function (param) {
              return make_from_fmtty(k, o, acc, concat_fmtty(ty, rest$9), fmt);
            });
      case /* Alpha_ty */10 :
          var rest$10 = fmtty[0];
          return (function (param, param$1) {
              return make_from_fmtty(k, o, acc, rest$10, fmt);
            });
      case /* Theta_ty */11 :
          var rest$11 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$11, fmt);
            });
      case /* Any_ty */12 :
          var rest$12 = fmtty[0];
          return (function (param) {
              return make_from_fmtty(k, o, acc, rest$12, fmt);
            });
      case /* Reader_ty */13 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  1616,
                  31
                ]
              ];
      case /* Ignored_reader_ty */14 :
          throw [
                assert_failure,
                /* tuple */[
                  "camlinternalFormat.ml",
                  1617,
                  31
                ]
              ];
      
    }
  }

  function make_invalid_arg(k, o, acc, fmt) {
    return make_printf(k, o, /* Acc_invalid_arg */__(8, [
                  acc,
                  "Printf: bad conversion %_"
                ]), fmt);
  }

  function make_padding(k, o, acc, fmt, pad, trans) {
    if (typeof pad === "number") {
      return (function (x) {
          var new_acc_001 = _1(trans, x);
          var new_acc = /* Acc_data_string */__(4, [
              acc,
              new_acc_001
            ]);
          return make_printf(k, o, new_acc, fmt);
        });
    }
    if (pad.tag) {
      var padty = pad[0];
      return (function (w, x) {
          var new_acc_001 = fix_padding(padty, w, _1(trans, x));
          var new_acc = /* Acc_data_string */__(4, [
              acc,
              new_acc_001
            ]);
          return make_printf(k, o, new_acc, fmt);
        });
    }
    var width = pad[1];
    var padty$1 = pad[0];
    return (function (x) {
        var new_acc_001 = fix_padding(padty$1, width, _1(trans, x));
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  }

  function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans, iconv) {
    if (typeof pad === "number") {
      if (typeof prec === "number") {
        if (prec !== 0) {
          return (function (p, x) {
              var str = fix_int_precision(p, _2(trans, iconv, x));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        } else {
          return (function (x) {
              var str = _2(trans, iconv, x);
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        }
      }
      var p = prec[0];
      return (function (x) {
          var str = fix_int_precision(p, _2(trans, iconv, x));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
    if (pad.tag) {
      var padty = pad[0];
      if (typeof prec === "number") {
        if (prec !== 0) {
          return (function (w, p, x) {
              var str = fix_padding(padty, w, fix_int_precision(p, _2(trans, iconv, x)));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        } else {
          return (function (w, x) {
              var str = fix_padding(padty, w, _2(trans, iconv, x));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        }
      }
      var p$1 = prec[0];
      return (function (w, x) {
          var str = fix_padding(padty, w, fix_int_precision(p$1, _2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
    var w = pad[1];
    var padty$1 = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_padding(padty$1, w, fix_int_precision(p, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = fix_padding(padty$1, w, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    }
    var p$2 = prec[0];
    return (function (x) {
        var str = fix_padding(padty$1, w, fix_int_precision(p$2, _2(trans, iconv, x)));
        return make_printf(k, o, /* Acc_data_string */__(4, [
                      acc,
                      str
                    ]), fmt);
      });
  }

  function make_custom(k, o, acc, rest, arity, f) {
    if (!arity) {
      return make_printf(k, o, /* Acc_data_string */__(4, [
                    acc,
                    f
                  ]), rest);
    }
    var arity$1 = arity[0];
    return (function (x) {
        return make_custom(k, o, acc, rest, arity$1, _1(f, x));
      });
  }

  function strput_acc(b, _acc) {
    while(true) {
      var acc = _acc;
      var exit = 0;
      if (typeof acc === "number") {
        return ;
      }
      switch (acc.tag | 0) {
        case /* Acc_formatting_lit */0 :
            var s = string_of_formatting_lit(acc[1]);
            strput_acc(b, acc[0]);
            return add_string(b, s);
        case /* Acc_formatting_gen */1 :
            var acc$prime = acc[1];
            var p = acc[0];
            if (acc$prime.tag) {
              strput_acc(b, p);
              add_string(b, "@[");
              _acc = acc$prime[0];
              continue ;
            }
            strput_acc(b, p);
            add_string(b, "@{");
            _acc = acc$prime[0];
            continue ;
        case /* Acc_string_literal */2 :
        case /* Acc_data_string */4 :
            exit = 1;
            break;
        case /* Acc_char_literal */3 :
        case /* Acc_data_char */5 :
            exit = 2;
            break;
        case /* Acc_delay */6 :
            strput_acc(b, acc[0]);
            return add_string(b, _1(acc[1], undefined));
        case /* Acc_flush */7 :
            _acc = acc[0];
            continue ;
        case /* Acc_invalid_arg */8 :
            strput_acc(b, acc[0]);
            throw [
                  invalid_argument,
                  acc[1]
                ];
        
      }
      switch (exit) {
        case 1 :
            strput_acc(b, acc[0]);
            return add_string(b, acc[1]);
        case 2 :
            strput_acc(b, acc[0]);
            return add_char(b, acc[1]);
        
      }
    }}
  /* No side effect */

  function ksprintf(k, param) {
    var k$prime = function (param, acc) {
      var buf = create$1(64);
      strput_acc(buf, acc);
      return _1(k, contents(buf));
    };
    return make_printf(k$prime, undefined, /* End_of_acc */0, param[0]);
  }

  function sprintf(fmt) {
    return ksprintf((function (s) {
                  return s;
                }), fmt);
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function chars_of_string(s) {
    var len = s.length;
    var build = function (_acc, _index) {
      while(true) {
        var index = _index;
        var acc = _acc;
        if (index === len) {
          return acc;
        }
        _index = index + 1 | 0;
        _acc = /* :: */[
          get(s, index),
          acc
        ];
        continue ;
      }  };
    return rev(build(/* [] */0, 0));
  }

  function location_compare(left, right) {
    if (left.line === right.line) {
      return caml_int_compare(right.column, left.column);
    } else {
      return caml_int_compare(right.line, left.line);
    }
  }

  function string_of_location(param) {
    return _2(sprintf(/* Format */[
                    /* String_literal */__(11, [
                        "Ln ",
                        /* Int */__(4, [
                            /* Int_d */0,
                            /* No_padding */0,
                            /* No_precision */0,
                            /* String_literal */__(11, [
                                ", Col ",
                                /* Int */__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* End_of_format */0
                                  ])
                              ])
                          ])
                      ]),
                    "Ln %d, Col %d"
                  ]), param.line, param.column);
  }

  function parse_error_compare(left, right) {
    return location_compare(left.location, right.location);
  }

  function string_of_parse_error(param) {
    return _3(sprintf(/* Format */[
                    /* String_literal */__(11, [
                        "At ",
                        /* String */__(2, [
                            /* No_padding */0,
                            /* String_literal */__(11, [
                                "; Expecting ",
                                /* String */__(2, [
                                    /* No_padding */0,
                                    /* String_literal */__(11, [
                                        " but actual ",
                                        /* String */__(2, [
                                            /* No_padding */0,
                                            /* End_of_format */0
                                          ])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "At %s; Expecting %s but actual %s"
                  ]), string_of_location(param.location), param.expecting, param.actual);
  }

  function result_of_parse_success(param) {
    return param.result;
  }

  function bind(original_parser, new_parser, input) {
    var success = _1(original_parser, input);
    if (success.tag) {
      return /* Error */__(1, [success[0]]);
    }
    var success$1 = success[0];
    return _2(new_parser, success$1.result, {
                location: success$1.location,
                input_chars: success$1.remaining_chars
              });
  }

  function bind_with(original_parser, next_parser, failure_return, input) {
    var success = _1(original_parser, input);
    if (success.tag) {
      return /* Ok */__(0, [{
                  result: failure_return,
                  location: input.location,
                  remaining_chars: input.input_chars
                }]);
    }
    var success$1 = success[0];
    return _2(next_parser, success$1.result, {
                location: success$1.location,
                input_chars: success$1.remaining_chars
              });
  }

  function succeed_with(result, input) {
    return /* Ok */__(0, [{
                result: result,
                location: input.location,
                remaining_chars: input.input_chars
              }]);
  }

  function concatenate_error_messages(new_message, parser, input) {
    var err_list = _1(parser, input);
    if (!err_list.tag) {
      return err_list;
    }
    var err_list$1 = err_list[0];
    if (!err_list$1) {
      return /* Error */__(1, [/* :: */[
                  {
                    expecting: _1(new_message, ""),
                    actual: "No input",
                    location: input.location
                  },
                  /* [] */0
                ]]);
    }
    var messages = concat$1(" OR ", map((function (err) {
                return err.expecting;
              }), err_list$1));
    return /* Error */__(1, [/* :: */[
                {
                  expecting: _1(new_message, messages),
                  actual: err_list$1[0].actual,
                  location: input.location
                },
                /* [] */0
              ]]);
  }

  function change_last_failure_message(expecting, parser, input) {
    var err_list = _1(parser, input);
    if (!err_list.tag) {
      return err_list;
    }
    var err_list$1 = err_list[0];
    if (err_list$1) {
      return /* Error */__(1, [/* :: */[
                  {
                    expecting: expecting,
                    actual: err_list$1[0].actual,
                    location: input.location
                  },
                  err_list$1[1]
                ]]);
    } else {
      return /* Error */__(1, [/* :: */[
                  {
                    expecting: expecting,
                    actual: "",
                    location: input.location
                  },
                  /* [] */0
                ]]);
    }
  }

  function map$2(fn, parser) {
    return (function (param) {
        return bind(parser, (function (result) {
                      var partial_arg = _1(fn, result);
                      return (function (param) {
                          return succeed_with(partial_arg, param);
                        });
                    }), param);
      });
  }

  function try_first_then_second(first_parser, second_parser, tokens) {
    var ret = _1(first_parser, tokens);
    if (!ret.tag) {
      return ret;
    }
    var ret$1 = _1(second_parser, tokens);
    if (ret$1.tag) {
      return /* Error */__(1, [concat(/* :: */[
                      ret[0],
                      /* :: */[
                        ret$1[0],
                        /* [] */0
                      ]
                    ])]);
    } else {
      return ret$1;
    }
  }

  function attempt_in_order(parsers) {
    if (!parsers) {
      return (function (param) {
          return /* Error */__(1, [/* [] */0]);
        });
    }
    var head_parser = parsers[0];
    var partial_arg = attempt_in_order(parsers[1]);
    return (function (param) {
        return try_first_then_second(head_parser, partial_arg, param);
      });
  }

  function right(left_parser, right_parser) {
    return (function (param) {
        return bind(left_parser, (function (param) {
                      return right_parser;
                    }), param);
      });
  }

  function left(left_parser, right_parser) {
    return (function (param) {
        return bind(left_parser, (function (left) {
                      return (function (param) {
                          return bind(right_parser, (function (_right) {
                                        return (function (param) {
                                            return succeed_with(left, param);
                                          });
                                      }), param);
                        });
                    }), param);
      });
  }

  function cons(head_parser, tail_parser) {
    return (function (param) {
        return bind(head_parser, (function (head) {
                      return (function (param) {
                          return bind(tail_parser, (function (tail) {
                                        var partial_arg = /* :: */[
                                          head,
                                          tail
                                        ];
                                        return (function (param) {
                                            return succeed_with(partial_arg, param);
                                          });
                                      }), param);
                        });
                    }), param);
      });
  }

  function skip_zero_to_many(skip_parser) {
    var parser = function (param) {
      return bind(skip_parser, (function (param) {
                    return skip_zero_to_many(skip_parser);
                  }), param);
    };
    return (function (param) {
        return try_first_then_second(parser, (function (param) {
                      return succeed_with(undefined, param);
                    }), param);
      });
  }

  function zero_to_many(item_parser) {
    var parser = function (param) {
      return bind(item_parser, (function (item) {
                    var partial_arg = zero_to_many(item_parser);
                    return (function (param) {
                        return bind(partial_arg, (function (remaining) {
                                      var partial_arg = /* :: */[
                                        item,
                                        remaining
                                      ];
                                      return (function (param) {
                                          return succeed_with(partial_arg, param);
                                        });
                                    }), param);
                      });
                  }), param);
    };
    return (function (param) {
        return try_first_then_second(parser, (function (param) {
                      return succeed_with(/* [] */0, param);
                    }), param);
      });
  }

  function prefix_parser(prefix_parser$1, item_parser) {
    var aux = function (lst) {
      var partial_arg = rev(lst);
      return (function (param) {
          return bind_with(prefix_parser$1, (function (param) {
                        return (function (param) {
                            return bind(item_parser, (function (item) {
                                          return aux(/* :: */[
                                                      item,
                                                      lst
                                                    ]);
                                        }), param);
                          });
                      }), partial_arg, param);
        });
    };
    return aux(/* [] */0);
  }

  function one_to_many_delimited(item_parser, delimiter_parser) {
    return cons(item_parser, prefix_parser(delimiter_parser, item_parser));
  }

  function update_location(param, ch) {
    var line = param.line;
    if (ch !== 10 && ch !== 13) {
      return {
              column: param.column + 1 | 0,
              line: line
            };
    } else {
      return {
              column: 1,
              line: line + 1 | 0
            };
    }
  }

  function succeed_if(predicate, expecting, input) {
    var match = input.input_chars;
    if (!match) {
      return /* Error */__(1, [/* :: */[
                  {
                    expecting: expecting,
                    actual: "Ran out of characters",
                    location: input.location
                  },
                  /* [] */0
                ]]);
    }
    var head_char = match[0];
    if (_1(predicate, head_char)) {
      return /* Ok */__(0, [{
                  result: head_char,
                  location: update_location(input.location, head_char),
                  remaining_chars: match[1]
                }]);
    } else {
      return /* Error */__(1, [/* :: */[
                  {
                    expecting: expecting,
                    actual: _1(sprintf(/* Format */[
                              /* Char_literal */__(12, [
                                  /* "'" */39,
                                  /* Char */__(0, [/* Char_literal */__(12, [
                                          /* "'" */39,
                                          /* End_of_format */0
                                        ])])
                                ]),
                              "'%c'"
                            ]), head_char),
                    location: input.location
                  },
                  /* [] */0
                ]]);
    }
  }

  function equals(this_value) {
    var partial_arg = _1(sprintf(/* Format */[
              /* Char */__(0, [/* End_of_format */0]),
              "%c"
            ]), this_value);
    return (function (param) {
        return succeed_if((function (param) {
                      return this_value === param;
                    }), partial_arg, param);
      });
  }

  function one_of(valid_options) {
    var partial_arg = _1(sprintf(/* Format */[
              /* String_literal */__(11, [
                  "One of: ",
                  /* String */__(2, [
                      /* No_padding */0,
                      /* End_of_format */0
                    ])
                ]),
              "One of: %s"
            ]), concat$1(", ", map((function (param) {
                    return make$1(1, param);
                  }), valid_options)));
    return (function (param) {
        return succeed_if((function (token) {
                      return mem(token, valid_options);
                    }), partial_arg, param);
      });
  }

  function in_range(start_inclusive, end_inclusive) {
    var partial_arg = _2(sprintf(/* Format */[
              /* String_literal */__(11, [
                  "A character between ",
                  /* Char */__(0, [/* String_literal */__(11, [
                          " and ",
                          /* Char */__(0, [/* End_of_format */0])
                        ])])
                ]),
              "A character between %c and %c"
            ]), start_inclusive, end_inclusive);
    return (function (param) {
        return succeed_if((function (token) {
                      if (token >= start_inclusive) {
                        return token <= end_inclusive;
                      } else {
                        return false;
                      }
                    }), partial_arg, param);
      });
  }

  var space = one_of(/* :: */[
        /* " " */32,
        /* :: */[
          /* "\t" */9,
          /* :: */[
            /* "\r" */13,
            /* :: */[
              /* "\n" */10,
              /* [] */0
            ]
          ]
        ]
      ]);

  var newline = equals(/* "\n" */10);

  var tab = equals(/* "\t" */9);

  var upper = in_range(/* "A" */65, /* "Z" */90);

  var lower = in_range(/* "a" */97, /* "z" */122);

  var digit = in_range(/* "0" */48, /* "9" */57);

  var partial_arg = sprintf(/* Format */[
        /* String */__(2, [
            /* No_padding */0,
            /* End_of_format */0
          ]),
        "%s"
      ]);

  function letter(param) {
    return concatenate_error_messages(partial_arg, (function (param) {
                  return try_first_then_second(lower, upper, param);
                }), param);
  }

  var hex_digit = attempt_in_order(/* :: */[
        in_range(/* "a" */97, /* "f" */102),
        /* :: */[
          in_range(/* "A" */65, /* "F" */70),
          /* :: */[
            digit,
            /* [] */0
          ]
        ]
      ]);

  var skip_whitespace = skip_zero_to_many(space);

  var oct_digit = in_range(/* "0" */48, /* "7" */55);

  function token(str) {
    var len = str.length;
    var match_character_index = function (index) {
      if (index >= len) {
        return (function (param) {
            return succeed_with(str, param);
          });
      }
      var right_parser = match_character_index(index + 1 | 0);
      var left_parser = equals(get(str, index));
      return (function (param) {
          return bind(left_parser, (function (param) {
                        return right_parser;
                      }), param);
        });
    };
    if (len <= 0) {
      return failwith("token must be a non-empty string");
    }
    var right_parser = match_character_index(0);
    var partial_arg = function (param) {
      return bind(skip_whitespace, (function (param) {
                    return right_parser;
                  }), param);
    };
    return (function (param) {
        return change_last_failure_message(str, partial_arg, param);
      });
  }

  function parse(parser, s) {
    return _1(parser, {
                location: {
                  column: 1,
                  line: 1
                },
                input_chars: chars_of_string(trim$1(s))
              });
  }

  function parse_require_all(parser, s) {
    var errors = parse(parser, s);
    if (errors.tag) {
      return /* Error */__(1, [errors[0]]);
    }
    var match = errors[0];
    var remaining_chars = match.remaining_chars;
    var $$location = match.location;
    if (remaining_chars) {
      return /* Error */__(1, [/* :: */[
                  {
                    expecting: "End of input",
                    actual: _1(sprintf(/* Format */[
                              /* String_literal */__(11, [
                                  "Characters remaining: ",
                                  /* String */__(2, [
                                      /* No_padding */0,
                                      /* End_of_format */0
                                    ])
                                ]),
                              "Characters remaining: %s"
                            ]), concat$1("", map((function (param) {
                                    return make$1(1, param);
                                  }), remaining_chars))),
                    location: $$location
                  },
                  /* [] */0
                ]]);
    } else {
      return /* Ok */__(0, [{
                  result: match.result,
                  location: $$location,
                  remaining_chars: remaining_chars
                }]);
    }
  }

  var $great$great$eq = bind;

  var $less$pipe$great = try_first_then_second;

  var $great$great = right;

  var $less$less = left;
  /* space Not a pure module */

  function Make(funarg) {
    var height = function (param) {
      if (param) {
        return param[/* h */4];
      } else {
        return 0;
      }
    };
    var create = function (l, x, d, r) {
      var hl = height(l);
      var hr = height(r);
      return /* Node */[
              /* l */l,
              /* v */x,
              /* d */d,
              /* r */r,
              /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    };
    var singleton = function (x, d) {
      return /* Node */[
              /* l : Empty */0,
              /* v */x,
              /* d */d,
              /* r : Empty */0,
              /* h */1
            ];
    };
    var bal = function (l, x, d, r) {
      var hl = l ? l[/* h */4] : 0;
      var hr = r ? r[/* h */4] : 0;
      if (hl > (hr + 2 | 0)) {
        if (l) {
          var lr = l[/* r */3];
          var ld = l[/* d */2];
          var lv = l[/* v */1];
          var ll = l[/* l */0];
          if (height(ll) >= height(lr)) {
            return create(ll, lv, ld, create(lr, x, d, r));
          }
          if (lr) {
            return create(create(ll, lv, ld, lr[/* l */0]), lr[/* v */1], lr[/* d */2], create(lr[/* r */3], x, d, r));
          }
          throw [
                invalid_argument,
                "Map.bal"
              ];
        }
        throw [
              invalid_argument,
              "Map.bal"
            ];
      }
      if (hr <= (hl + 2 | 0)) {
        return /* Node */[
                /* l */l,
                /* v */x,
                /* d */d,
                /* r */r,
                /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
              ];
      }
      if (r) {
        var rr = r[/* r */3];
        var rd = r[/* d */2];
        var rv = r[/* v */1];
        var rl = r[/* l */0];
        if (height(rr) >= height(rl)) {
          return create(create(l, x, d, rl), rv, rd, rr);
        }
        if (rl) {
          return create(create(l, x, d, rl[/* l */0]), rl[/* v */1], rl[/* d */2], create(rl[/* r */3], rv, rd, rr));
        }
        throw [
              invalid_argument,
              "Map.bal"
            ];
      }
      throw [
            invalid_argument,
            "Map.bal"
          ];
    };
    var is_empty = function (param) {
      if (param) {
        return false;
      } else {
        return true;
      }
    };
    var add = function (x, data, m) {
      if (!m) {
        return /* Node */[
                /* l : Empty */0,
                /* v */x,
                /* d */data,
                /* r : Empty */0,
                /* h */1
              ];
      }
      var r = m[/* r */3];
      var d = m[/* d */2];
      var v = m[/* v */1];
      var l = m[/* l */0];
      var c = _2(funarg.compare, x, v);
      if (c === 0) {
        if (d === data) {
          return m;
        } else {
          return /* Node */[
                  /* l */l,
                  /* v */x,
                  /* d */data,
                  /* r */r,
                  /* h */m[/* h */4]
                ];
        }
      }
      if (c < 0) {
        var ll = add(x, data, l);
        if (l === ll) {
          return m;
        } else {
          return bal(ll, v, d, r);
        }
      }
      var rr = add(x, data, r);
      if (r === rr) {
        return m;
      } else {
        return bal(l, v, d, rr);
      }
    };
    var find = function (x, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var c = _2(funarg.compare, x, param[/* v */1]);
          if (c === 0) {
            return param[/* d */2];
          }
          _param = c < 0 ? param[/* l */0] : param[/* r */3];
          continue ;
        }
        throw not_found;
      }  };
    var find_first = function (f, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var v = param[/* v */1];
          if (_1(f, v)) {
            var _v0 = v;
            var _d0 = param[/* d */2];
            var _param$1 = param[/* l */0];
            while(true) {
              var param$1 = _param$1;
              var d0 = _d0;
              var v0 = _v0;
              if (!param$1) {
                return /* tuple */[
                        v0,
                        d0
                      ];
              }
              var v$1 = param$1[/* v */1];
              if (_1(f, v$1)) {
                _param$1 = param$1[/* l */0];
                _d0 = param$1[/* d */2];
                _v0 = v$1;
                continue ;
              }
              _param$1 = param$1[/* r */3];
              continue ;
            }        }
          _param = param[/* r */3];
          continue ;
        }
        throw not_found;
      }  };
    var find_first_opt = function (f, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return ;
        }
        var v = param[/* v */1];
        if (_1(f, v)) {
          var _v0 = v;
          var _d0 = param[/* d */2];
          var _param$1 = param[/* l */0];
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return /* tuple */[
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1[/* v */1];
            if (_1(f, v$1)) {
              _param$1 = param$1[/* l */0];
              _d0 = param$1[/* d */2];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* r */3];
            continue ;
          }      }
        _param = param[/* r */3];
        continue ;
      }  };
    var find_last = function (f, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var v = param[/* v */1];
          if (_1(f, v)) {
            var _v0 = v;
            var _d0 = param[/* d */2];
            var _param$1 = param[/* r */3];
            while(true) {
              var param$1 = _param$1;
              var d0 = _d0;
              var v0 = _v0;
              if (!param$1) {
                return /* tuple */[
                        v0,
                        d0
                      ];
              }
              var v$1 = param$1[/* v */1];
              if (_1(f, v$1)) {
                _param$1 = param$1[/* r */3];
                _d0 = param$1[/* d */2];
                _v0 = v$1;
                continue ;
              }
              _param$1 = param$1[/* l */0];
              continue ;
            }        }
          _param = param[/* l */0];
          continue ;
        }
        throw not_found;
      }  };
    var find_last_opt = function (f, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return ;
        }
        var v = param[/* v */1];
        if (_1(f, v)) {
          var _v0 = v;
          var _d0 = param[/* d */2];
          var _param$1 = param[/* r */3];
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return /* tuple */[
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1[/* v */1];
            if (_1(f, v$1)) {
              _param$1 = param$1[/* r */3];
              _d0 = param$1[/* d */2];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* l */0];
            continue ;
          }      }
        _param = param[/* l */0];
        continue ;
      }  };
    var find_opt = function (x, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return ;
        }
        var c = _2(funarg.compare, x, param[/* v */1]);
        if (c === 0) {
          return some(param[/* d */2]);
        }
        _param = c < 0 ? param[/* l */0] : param[/* r */3];
        continue ;
      }  };
    var mem = function (x, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return false;
        }
        var c = _2(funarg.compare, x, param[/* v */1]);
        if (c === 0) {
          return true;
        }
        _param = c < 0 ? param[/* l */0] : param[/* r */3];
        continue ;
      }  };
    var min_binding = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var l = param[/* l */0];
          if (!l) {
            return /* tuple */[
                    param[/* v */1],
                    param[/* d */2]
                  ];
          }
          _param = l;
          continue ;
        }
        throw not_found;
      }  };
    var min_binding_opt = function (_param) {
      while(true) {
        var param = _param;
        if (!param) {
          return ;
        }
        var l = param[/* l */0];
        if (!l) {
          return /* tuple */[
                  param[/* v */1],
                  param[/* d */2]
                ];
        }
        _param = l;
        continue ;
      }  };
    var max_binding = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var r = param[/* r */3];
          if (!r) {
            return /* tuple */[
                    param[/* v */1],
                    param[/* d */2]
                  ];
          }
          _param = r;
          continue ;
        }
        throw not_found;
      }  };
    var max_binding_opt = function (_param) {
      while(true) {
        var param = _param;
        if (!param) {
          return ;
        }
        var r = param[/* r */3];
        if (!r) {
          return /* tuple */[
                  param[/* v */1],
                  param[/* d */2]
                ];
        }
        _param = r;
        continue ;
      }  };
    var remove_min_binding = function (param) {
      if (param) {
        var l = param[/* l */0];
        if (l) {
          return bal(remove_min_binding(l), param[/* v */1], param[/* d */2], param[/* r */3]);
        } else {
          return param[/* r */3];
        }
      }
      throw [
            invalid_argument,
            "Map.remove_min_elt"
          ];
    };
    var merge = function (t1, t2) {
      if (!t1) {
        return t2;
      }
      if (!t2) {
        return t1;
      }
      var match = min_binding(t2);
      return bal(t1, match[0], match[1], remove_min_binding(t2));
    };
    var remove = function (x, m) {
      if (!m) {
        return /* Empty */0;
      }
      var r = m[/* r */3];
      var d = m[/* d */2];
      var v = m[/* v */1];
      var l = m[/* l */0];
      var c = _2(funarg.compare, x, v);
      if (c === 0) {
        return merge(l, r);
      }
      if (c < 0) {
        var ll = remove(x, l);
        if (l === ll) {
          return m;
        } else {
          return bal(ll, v, d, r);
        }
      }
      var rr = remove(x, r);
      if (r === rr) {
        return m;
      } else {
        return bal(l, v, d, rr);
      }
    };
    var update = function (x, f, m) {
      if (m) {
        var r = m[/* r */3];
        var d = m[/* d */2];
        var v = m[/* v */1];
        var l = m[/* l */0];
        var c = _2(funarg.compare, x, v);
        if (c === 0) {
          var data = _1(f, some(d));
          if (data === undefined) {
            return merge(l, r);
          }
          var data$1 = valFromOption(data);
          if (d === data$1) {
            return m;
          } else {
            return /* Node */[
                    /* l */l,
                    /* v */x,
                    /* d */data$1,
                    /* r */r,
                    /* h */m[/* h */4]
                  ];
          }
        }
        if (c < 0) {
          var ll = update(x, f, l);
          if (l === ll) {
            return m;
          } else {
            return bal(ll, v, d, r);
          }
        }
        var rr = update(x, f, r);
        if (r === rr) {
          return m;
        } else {
          return bal(l, v, d, rr);
        }
      }
      var data$2 = _1(f, undefined);
      if (data$2 !== undefined) {
        return /* Node */[
                /* l : Empty */0,
                /* v */x,
                /* d */valFromOption(data$2),
                /* r : Empty */0,
                /* h */1
              ];
      } else {
        return /* Empty */0;
      }
    };
    var iter = function (f, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return ;
        }
        iter(f, param[/* l */0]);
        _2(f, param[/* v */1], param[/* d */2]);
        _param = param[/* r */3];
        continue ;
      }  };
    var map = function (f, param) {
      if (!param) {
        return /* Empty */0;
      }
      var l$prime = map(f, param[/* l */0]);
      var d$prime = _1(f, param[/* d */2]);
      var r$prime = map(f, param[/* r */3]);
      return /* Node */[
              /* l */l$prime,
              /* v */param[/* v */1],
              /* d */d$prime,
              /* r */r$prime,
              /* h */param[/* h */4]
            ];
    };
    var mapi = function (f, param) {
      if (!param) {
        return /* Empty */0;
      }
      var v = param[/* v */1];
      var l$prime = mapi(f, param[/* l */0]);
      var d$prime = _2(f, v, param[/* d */2]);
      var r$prime = mapi(f, param[/* r */3]);
      return /* Node */[
              /* l */l$prime,
              /* v */v,
              /* d */d$prime,
              /* r */r$prime,
              /* h */param[/* h */4]
            ];
    };
    var fold = function (f, _m, _accu) {
      while(true) {
        var accu = _accu;
        var m = _m;
        if (!m) {
          return accu;
        }
        _accu = _3(f, m[/* v */1], m[/* d */2], fold(f, m[/* l */0], accu));
        _m = m[/* r */3];
        continue ;
      }  };
    var for_all = function (p, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return true;
        }
        if (!_2(p, param[/* v */1], param[/* d */2])) {
          return false;
        }
        if (!for_all(p, param[/* l */0])) {
          return false;
        }
        _param = param[/* r */3];
        continue ;
      }  };
    var exists = function (p, _param) {
      while(true) {
        var param = _param;
        if (!param) {
          return false;
        }
        if (_2(p, param[/* v */1], param[/* d */2])) {
          return true;
        }
        if (exists(p, param[/* l */0])) {
          return true;
        }
        _param = param[/* r */3];
        continue ;
      }  };
    var add_min_binding = function (k, x, param) {
      if (param) {
        return bal(add_min_binding(k, x, param[/* l */0]), param[/* v */1], param[/* d */2], param[/* r */3]);
      } else {
        return singleton(k, x);
      }
    };
    var add_max_binding = function (k, x, param) {
      if (param) {
        return bal(param[/* l */0], param[/* v */1], param[/* d */2], add_max_binding(k, x, param[/* r */3]));
      } else {
        return singleton(k, x);
      }
    };
    var join = function (l, v, d, r) {
      if (!l) {
        return add_min_binding(v, d, r);
      }
      if (!r) {
        return add_max_binding(v, d, l);
      }
      var rh = r[/* h */4];
      var lh = l[/* h */4];
      if (lh > (rh + 2 | 0)) {
        return bal(l[/* l */0], l[/* v */1], l[/* d */2], join(l[/* r */3], v, d, r));
      } else if (rh > (lh + 2 | 0)) {
        return bal(join(l, v, d, r[/* l */0]), r[/* v */1], r[/* d */2], r[/* r */3]);
      } else {
        return create(l, v, d, r);
      }
    };
    var concat = function (t1, t2) {
      if (!t1) {
        return t2;
      }
      if (!t2) {
        return t1;
      }
      var match = min_binding(t2);
      return join(t1, match[0], match[1], remove_min_binding(t2));
    };
    var concat_or_join = function (t1, v, d, t2) {
      if (d !== undefined) {
        return join(t1, v, valFromOption(d), t2);
      } else {
        return concat(t1, t2);
      }
    };
    var split = function (x, param) {
      if (!param) {
        return /* tuple */[
                /* Empty */0,
                undefined,
                /* Empty */0
              ];
      }
      var r = param[/* r */3];
      var d = param[/* d */2];
      var v = param[/* v */1];
      var l = param[/* l */0];
      var c = _2(funarg.compare, x, v);
      if (c === 0) {
        return /* tuple */[
                l,
                some(d),
                r
              ];
      }
      if (c < 0) {
        var match = split(x, l);
        return /* tuple */[
                match[0],
                match[1],
                join(match[2], v, d, r)
              ];
      }
      var match$1 = split(x, r);
      return /* tuple */[
              join(l, v, d, match$1[0]),
              match$1[1],
              match$1[2]
            ];
    };
    var merge$1 = function (f, s1, s2) {
      if (s1) {
        var v1 = s1[/* v */1];
        if (s1[/* h */4] >= height(s2)) {
          var match = split(v1, s2);
          return concat_or_join(merge$1(f, s1[/* l */0], match[0]), v1, _3(f, v1, some(s1[/* d */2]), match[1]), merge$1(f, s1[/* r */3], match[2]));
        }
        
      } else if (!s2) {
        return /* Empty */0;
      }
      if (s2) {
        var v2 = s2[/* v */1];
        var match$1 = split(v2, s1);
        return concat_or_join(merge$1(f, match$1[0], s2[/* l */0]), v2, _3(f, v2, match$1[1], some(s2[/* d */2])), merge$1(f, match$1[2], s2[/* r */3]));
      }
      throw [
            assert_failure,
            /* tuple */[
              "map.ml",
              393,
              10
            ]
          ];
    };
    var union = function (f, s1, s2) {
      if (!s1) {
        return s2;
      }
      if (!s2) {
        return s1;
      }
      var d2 = s2[/* d */2];
      var v2 = s2[/* v */1];
      var d1 = s1[/* d */2];
      var v1 = s1[/* v */1];
      if (s1[/* h */4] >= s2[/* h */4]) {
        var match = split(v1, s2);
        var d2$1 = match[1];
        var l = union(f, s1[/* l */0], match[0]);
        var r = union(f, s1[/* r */3], match[2]);
        if (d2$1 !== undefined) {
          return concat_or_join(l, v1, _3(f, v1, d1, valFromOption(d2$1)), r);
        } else {
          return join(l, v1, d1, r);
        }
      }
      var match$1 = split(v2, s1);
      var d1$1 = match$1[1];
      var l$1 = union(f, match$1[0], s2[/* l */0]);
      var r$1 = union(f, match$1[2], s2[/* r */3]);
      if (d1$1 !== undefined) {
        return concat_or_join(l$1, v2, _3(f, v2, valFromOption(d1$1), d2), r$1);
      } else {
        return join(l$1, v2, d2, r$1);
      }
    };
    var filter = function (p, m) {
      if (!m) {
        return /* Empty */0;
      }
      var r = m[/* r */3];
      var d = m[/* d */2];
      var v = m[/* v */1];
      var l = m[/* l */0];
      var l$prime = filter(p, l);
      var pvd = _2(p, v, d);
      var r$prime = filter(p, r);
      if (pvd) {
        if (l === l$prime && r === r$prime) {
          return m;
        } else {
          return join(l$prime, v, d, r$prime);
        }
      } else {
        return concat(l$prime, r$prime);
      }
    };
    var partition = function (p, param) {
      if (!param) {
        return /* tuple */[
                /* Empty */0,
                /* Empty */0
              ];
      }
      var d = param[/* d */2];
      var v = param[/* v */1];
      var match = partition(p, param[/* l */0]);
      var lf = match[1];
      var lt = match[0];
      var pvd = _2(p, v, d);
      var match$1 = partition(p, param[/* r */3]);
      var rf = match$1[1];
      var rt = match$1[0];
      if (pvd) {
        return /* tuple */[
                join(lt, v, d, rt),
                concat(lf, rf)
              ];
      } else {
        return /* tuple */[
                concat(lt, rt),
                join(lf, v, d, rf)
              ];
      }
    };
    var cons_enum = function (_m, _e) {
      while(true) {
        var e = _e;
        var m = _m;
        if (!m) {
          return e;
        }
        _e = /* More */[
          m[/* v */1],
          m[/* d */2],
          m[/* r */3],
          e
        ];
        _m = m[/* l */0];
        continue ;
      }  };
    var compare = function (cmp, m1, m2) {
      var _e1 = cons_enum(m1, /* End */0);
      var _e2 = cons_enum(m2, /* End */0);
      while(true) {
        var e2 = _e2;
        var e1 = _e1;
        if (!e1) {
          if (e2) {
            return -1;
          } else {
            return 0;
          }
        }
        if (!e2) {
          return 1;
        }
        var c = _2(funarg.compare, e1[0], e2[0]);
        if (c !== 0) {
          return c;
        }
        var c$1 = _2(cmp, e1[1], e2[1]);
        if (c$1 !== 0) {
          return c$1;
        }
        _e2 = cons_enum(e2[2], e2[3]);
        _e1 = cons_enum(e1[2], e1[3]);
        continue ;
      }  };
    var equal = function (cmp, m1, m2) {
      var _e1 = cons_enum(m1, /* End */0);
      var _e2 = cons_enum(m2, /* End */0);
      while(true) {
        var e2 = _e2;
        var e1 = _e1;
        if (!e1) {
          if (e2) {
            return false;
          } else {
            return true;
          }
        }
        if (!e2) {
          return false;
        }
        if (_2(funarg.compare, e1[0], e2[0]) !== 0) {
          return false;
        }
        if (!_2(cmp, e1[1], e2[1])) {
          return false;
        }
        _e2 = cons_enum(e2[2], e2[3]);
        _e1 = cons_enum(e1[2], e1[3]);
        continue ;
      }  };
    var cardinal = function (param) {
      if (param) {
        return (cardinal(param[/* l */0]) + 1 | 0) + cardinal(param[/* r */3]) | 0;
      } else {
        return 0;
      }
    };
    var bindings_aux = function (_accu, _param) {
      while(true) {
        var param = _param;
        var accu = _accu;
        if (!param) {
          return accu;
        }
        _param = param[/* l */0];
        _accu = /* :: */[
          /* tuple */[
            param[/* v */1],
            param[/* d */2]
          ],
          bindings_aux(accu, param[/* r */3])
        ];
        continue ;
      }  };
    var bindings = function (s) {
      return bindings_aux(/* [] */0, s);
    };
    return {
            empty: /* Empty */0,
            is_empty: is_empty,
            mem: mem,
            add: add,
            update: update,
            singleton: singleton,
            remove: remove,
            merge: merge$1,
            union: union,
            compare: compare,
            equal: equal,
            iter: iter,
            fold: fold,
            for_all: for_all,
            exists: exists,
            filter: filter,
            partition: partition,
            cardinal: cardinal,
            bindings: bindings,
            min_binding: min_binding,
            min_binding_opt: min_binding_opt,
            max_binding: max_binding,
            max_binding_opt: max_binding_opt,
            choose: min_binding,
            choose_opt: min_binding_opt,
            split: split,
            find: find,
            find_opt: find_opt,
            find_first: find_first,
            find_first_opt: find_first_opt,
            find_last: find_last,
            find_last_opt: find_last_opt,
            map: map,
            mapi: mapi
          };
  }
  /* No side effect */

  function map$3(f, a) {
    var l = a.length;
    if (l === 0) {
      return [];
    }
    var r = caml_make_vect(l, _1(f, a[0]));
    for(var i = 1; i < l; ++i){
      r[i] = _1(f, a[i]);
    }
    return r;
  }

  function to_list(a) {
    var _i = a.length - 1 | 0;
    var _res = /* [] */0;
    while(true) {
      var res = _res;
      var i = _i;
      if (i < 0) {
        return res;
      }
      _res = /* :: */[
        a[i],
        res
      ];
      _i = i - 1 | 0;
      continue ;
    }}

  function fold_right$1(f, a, x) {
    var r = x;
    for(var i = a.length - 1 | 0; i >= 0; --i){
      r = _2(f, a[i], r);
    }
    return r;
  }

  var Bottom = create("Array.Bottom");
  /* No side effect */

  function get$1(dict, k) {
    if ((k in dict)) {
      return some(dict[k]);
    }
    
  }
  /* No side effect */

  function classify(x) {
    var ty = typeof x;
    if (ty === "string") {
      return /* JSONString */__(0, [x]);
    } else if (ty === "number") {
      return /* JSONNumber */__(1, [x]);
    } else if (ty === "boolean") {
      if (x === true) {
        return /* JSONTrue */1;
      } else {
        return /* JSONFalse */0;
      }
    } else if (x === null) {
      return /* JSONNull */2;
    } else if (Array.isArray(x)) {
      return /* JSONArray */__(3, [x]);
    } else {
      return /* JSONObject */__(2, [x]);
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  var classify$1 = classify;
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function result_to_option(a) {
    if (a.tag) {
      return ;
    } else {
      return some(a[0]);
    }
  }

  function error(e) {
    if (e.tag) {
      return some(e[0]);
    }
    
  }

  function accumulate(param) {
    if (!param) {
      return /* Ok */__(0, [/* [] */0]);
    }
    var tl = param[1];
    var last = param[0];
    if (!tl) {
      if (last.tag) {
        return last;
      } else {
        return /* Ok */__(0, [/* :: */[
                    last[0],
                    /* [] */0
                  ]]);
      }
    }
    if (last.tag) {
      return last;
    }
    var e = accumulate(tl);
    if (e.tag) {
      return e;
    } else {
      return /* Ok */__(0, [/* :: */[
                  last[0],
                  e[0]
                ]]);
    }
  }

  function first(fst, e) {
    if (e.tag) {
      return e;
    } else {
      return fst;
    }
  }

  function error_of_first(fst, e) {
    if (e.tag) {
      return some(e[0]);
    } else {
      return error(fst);
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function height(param) {
    if (param) {
      return param[/* h */4];
    } else {
      return 0;
    }
  }

  function create$2(l, x, d, r) {
    var hl = height(l);
    var hr = height(r);
    return /* Node */[
            /* l */l,
            /* v */x,
            /* d */d,
            /* r */r,
            /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  }

  function singleton(x, d) {
    return /* Node */[
            /* l : Empty */0,
            /* v */x,
            /* d */d,
            /* r : Empty */0,
            /* h */1
          ];
  }

  function bal(l, x, d, r) {
    var hl = l ? l[/* h */4] : 0;
    var hr = r ? r[/* h */4] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[/* r */3];
        var ld = l[/* d */2];
        var lv = l[/* v */1];
        var ll = l[/* l */0];
        if (height(ll) >= height(lr)) {
          return create$2(ll, lv, ld, create$2(lr, x, d, r));
        }
        if (lr) {
          return create$2(create$2(ll, lv, ld, lr[/* l */0]), lr[/* v */1], lr[/* d */2], create$2(lr[/* r */3], x, d, r));
        }
        throw [
              invalid_argument,
              "Map.bal"
            ];
      }
      throw [
            invalid_argument,
            "Map.bal"
          ];
    }
    if (hr <= (hl + 2 | 0)) {
      return /* Node */[
              /* l */l,
              /* v */x,
              /* d */d,
              /* r */r,
              /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
    if (r) {
      var rr = r[/* r */3];
      var rd = r[/* d */2];
      var rv = r[/* v */1];
      var rl = r[/* l */0];
      if (height(rr) >= height(rl)) {
        return create$2(create$2(l, x, d, rl), rv, rd, rr);
      }
      if (rl) {
        return create$2(create$2(l, x, d, rl[/* l */0]), rl[/* v */1], rl[/* d */2], create$2(rl[/* r */3], rv, rd, rr));
      }
      throw [
            invalid_argument,
            "Map.bal"
          ];
    }
    throw [
          invalid_argument,
          "Map.bal"
        ];
  }

  function is_empty(param) {
    if (param) {
      return false;
    } else {
      return true;
    }
  }

  function add$1(x, data, m) {
    if (!m) {
      return /* Node */[
              /* l : Empty */0,
              /* v */x,
              /* d */data,
              /* r : Empty */0,
              /* h */1
            ];
    }
    var r = m[/* r */3];
    var d = m[/* d */2];
    var v = m[/* v */1];
    var l = m[/* l */0];
    var c = caml_string_compare(x, v);
    if (c === 0) {
      if (d === data) {
        return m;
      } else {
        return /* Node */[
                /* l */l,
                /* v */x,
                /* d */data,
                /* r */r,
                /* h */m[/* h */4]
              ];
      }
    }
    if (c < 0) {
      var ll = add$1(x, data, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = add$1(x, data, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  }

  function find(x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = caml_string_compare(x, param[/* v */1]);
        if (c === 0) {
          return param[/* d */2];
        }
        _param = c < 0 ? param[/* l */0] : param[/* r */3];
        continue ;
      }
      throw not_found;
    }}

  function find_first(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[/* v */1];
        if (_1(f, v)) {
          var _v0 = v;
          var _d0 = param[/* d */2];
          var _param$1 = param[/* l */0];
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return /* tuple */[
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1[/* v */1];
            if (_1(f, v$1)) {
              _param$1 = param$1[/* l */0];
              _d0 = param$1[/* d */2];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* r */3];
            continue ;
          }      }
        _param = param[/* r */3];
        continue ;
      }
      throw not_found;
    }}

  function find_first_opt(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param[/* v */1];
      if (_1(f, v)) {
        var _v0 = v;
        var _d0 = param[/* d */2];
        var _param$1 = param[/* l */0];
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return /* tuple */[
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1[/* v */1];
          if (_1(f, v$1)) {
            _param$1 = param$1[/* l */0];
            _d0 = param$1[/* d */2];
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1[/* r */3];
          continue ;
        }    }
      _param = param[/* r */3];
      continue ;
    }}

  function find_last(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[/* v */1];
        if (_1(f, v)) {
          var _v0 = v;
          var _d0 = param[/* d */2];
          var _param$1 = param[/* r */3];
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return /* tuple */[
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1[/* v */1];
            if (_1(f, v$1)) {
              _param$1 = param$1[/* r */3];
              _d0 = param$1[/* d */2];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* l */0];
            continue ;
          }      }
        _param = param[/* l */0];
        continue ;
      }
      throw not_found;
    }}

  function find_last_opt(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param[/* v */1];
      if (_1(f, v)) {
        var _v0 = v;
        var _d0 = param[/* d */2];
        var _param$1 = param[/* r */3];
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return /* tuple */[
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1[/* v */1];
          if (_1(f, v$1)) {
            _param$1 = param$1[/* r */3];
            _d0 = param$1[/* d */2];
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1[/* l */0];
          continue ;
        }    }
      _param = param[/* l */0];
      continue ;
    }}

  function find_opt(x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var c = caml_string_compare(x, param[/* v */1]);
      if (c === 0) {
        return some(param[/* d */2]);
      }
      _param = c < 0 ? param[/* l */0] : param[/* r */3];
      continue ;
    }}

  function mem$1(x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      var c = caml_string_compare(x, param[/* v */1]);
      if (c === 0) {
        return true;
      }
      _param = c < 0 ? param[/* l */0] : param[/* r */3];
      continue ;
    }}

  function min_binding(_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[/* l */0];
        if (!l) {
          return /* tuple */[
                  param[/* v */1],
                  param[/* d */2]
                ];
        }
        _param = l;
        continue ;
      }
      throw not_found;
    }}

  function min_binding_opt(_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var l = param[/* l */0];
      if (!l) {
        return /* tuple */[
                param[/* v */1],
                param[/* d */2]
              ];
      }
      _param = l;
      continue ;
    }}

  function max_binding(_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[/* r */3];
        if (!r) {
          return /* tuple */[
                  param[/* v */1],
                  param[/* d */2]
                ];
        }
        _param = r;
        continue ;
      }
      throw not_found;
    }}

  function max_binding_opt(_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var r = param[/* r */3];
      if (!r) {
        return /* tuple */[
                param[/* v */1],
                param[/* d */2]
              ];
      }
      _param = r;
      continue ;
    }}

  function remove_min_binding(param) {
    if (param) {
      var l = param[/* l */0];
      if (l) {
        return bal(remove_min_binding(l), param[/* v */1], param[/* d */2], param[/* r */3]);
      } else {
        return param[/* r */3];
      }
    }
    throw [
          invalid_argument,
          "Map.remove_min_elt"
        ];
  }

  function merge(t1, t2) {
    if (!t1) {
      return t2;
    }
    if (!t2) {
      return t1;
    }
    var match = min_binding(t2);
    return bal(t1, match[0], match[1], remove_min_binding(t2));
  }

  function remove(x, m) {
    if (!m) {
      return /* Empty */0;
    }
    var r = m[/* r */3];
    var d = m[/* d */2];
    var v = m[/* v */1];
    var l = m[/* l */0];
    var c = caml_string_compare(x, v);
    if (c === 0) {
      return merge(l, r);
    }
    if (c < 0) {
      var ll = remove(x, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = remove(x, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  }

  function update(x, f, m) {
    if (m) {
      var r = m[/* r */3];
      var d = m[/* d */2];
      var v = m[/* v */1];
      var l = m[/* l */0];
      var c = caml_string_compare(x, v);
      if (c === 0) {
        var data = _1(f, some(d));
        if (data === undefined) {
          return merge(l, r);
        }
        var data$1 = valFromOption(data);
        if (d === data$1) {
          return m;
        } else {
          return /* Node */[
                  /* l */l,
                  /* v */x,
                  /* d */data$1,
                  /* r */r,
                  /* h */m[/* h */4]
                ];
        }
      }
      if (c < 0) {
        var ll = update(x, f, l);
        if (l === ll) {
          return m;
        } else {
          return bal(ll, v, d, r);
        }
      }
      var rr = update(x, f, r);
      if (r === rr) {
        return m;
      } else {
        return bal(l, v, d, rr);
      }
    }
    var data$2 = _1(f, undefined);
    if (data$2 !== undefined) {
      return /* Node */[
              /* l : Empty */0,
              /* v */x,
              /* d */valFromOption(data$2),
              /* r : Empty */0,
              /* h */1
            ];
    } else {
      return /* Empty */0;
    }
  }

  function iter$1(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      iter$1(f, param[/* l */0]);
      _2(f, param[/* v */1], param[/* d */2]);
      _param = param[/* r */3];
      continue ;
    }}

  function map$4(f, param) {
    if (!param) {
      return /* Empty */0;
    }
    var l$prime = map$4(f, param[/* l */0]);
    var d$prime = _1(f, param[/* d */2]);
    var r$prime = map$4(f, param[/* r */3]);
    return /* Node */[
            /* l */l$prime,
            /* v */param[/* v */1],
            /* d */d$prime,
            /* r */r$prime,
            /* h */param[/* h */4]
          ];
  }

  function mapi(f, param) {
    if (!param) {
      return /* Empty */0;
    }
    var v = param[/* v */1];
    var l$prime = mapi(f, param[/* l */0]);
    var d$prime = _2(f, v, param[/* d */2]);
    var r$prime = mapi(f, param[/* r */3]);
    return /* Node */[
            /* l */l$prime,
            /* v */v,
            /* d */d$prime,
            /* r */r$prime,
            /* h */param[/* h */4]
          ];
  }

  function fold(f, _m, _accu) {
    while(true) {
      var accu = _accu;
      var m = _m;
      if (!m) {
        return accu;
      }
      _accu = _3(f, m[/* v */1], m[/* d */2], fold(f, m[/* l */0], accu));
      _m = m[/* r */3];
      continue ;
    }}

  function for_all(p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return true;
      }
      if (!_2(p, param[/* v */1], param[/* d */2])) {
        return false;
      }
      if (!for_all(p, param[/* l */0])) {
        return false;
      }
      _param = param[/* r */3];
      continue ;
    }}

  function exists$1(p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      if (_2(p, param[/* v */1], param[/* d */2])) {
        return true;
      }
      if (exists$1(p, param[/* l */0])) {
        return true;
      }
      _param = param[/* r */3];
      continue ;
    }}

  function add_min_binding(k, x, param) {
    if (param) {
      return bal(add_min_binding(k, x, param[/* l */0]), param[/* v */1], param[/* d */2], param[/* r */3]);
    } else {
      return singleton(k, x);
    }
  }

  function add_max_binding(k, x, param) {
    if (param) {
      return bal(param[/* l */0], param[/* v */1], param[/* d */2], add_max_binding(k, x, param[/* r */3]));
    } else {
      return singleton(k, x);
    }
  }

  function join(l, v, d, r) {
    if (!l) {
      return add_min_binding(v, d, r);
    }
    if (!r) {
      return add_max_binding(v, d, l);
    }
    var rh = r[/* h */4];
    var lh = l[/* h */4];
    if (lh > (rh + 2 | 0)) {
      return bal(l[/* l */0], l[/* v */1], l[/* d */2], join(l[/* r */3], v, d, r));
    } else if (rh > (lh + 2 | 0)) {
      return bal(join(l, v, d, r[/* l */0]), r[/* v */1], r[/* d */2], r[/* r */3]);
    } else {
      return create$2(l, v, d, r);
    }
  }

  function concat$2(t1, t2) {
    if (!t1) {
      return t2;
    }
    if (!t2) {
      return t1;
    }
    var match = min_binding(t2);
    return join(t1, match[0], match[1], remove_min_binding(t2));
  }

  function concat_or_join(t1, v, d, t2) {
    if (d !== undefined) {
      return join(t1, v, valFromOption(d), t2);
    } else {
      return concat$2(t1, t2);
    }
  }

  function split(x, param) {
    if (!param) {
      return /* tuple */[
              /* Empty */0,
              undefined,
              /* Empty */0
            ];
    }
    var r = param[/* r */3];
    var d = param[/* d */2];
    var v = param[/* v */1];
    var l = param[/* l */0];
    var c = caml_string_compare(x, v);
    if (c === 0) {
      return /* tuple */[
              l,
              some(d),
              r
            ];
    }
    if (c < 0) {
      var match = split(x, l);
      return /* tuple */[
              match[0],
              match[1],
              join(match[2], v, d, r)
            ];
    }
    var match$1 = split(x, r);
    return /* tuple */[
            join(l, v, d, match$1[0]),
            match$1[1],
            match$1[2]
          ];
  }

  function merge$1(f, s1, s2) {
    if (s1) {
      var v1 = s1[/* v */1];
      if (s1[/* h */4] >= height(s2)) {
        var match = split(v1, s2);
        return concat_or_join(merge$1(f, s1[/* l */0], match[0]), v1, _3(f, v1, some(s1[/* d */2]), match[1]), merge$1(f, s1[/* r */3], match[2]));
      }
      
    } else if (!s2) {
      return /* Empty */0;
    }
    if (s2) {
      var v2 = s2[/* v */1];
      var match$1 = split(v2, s1);
      return concat_or_join(merge$1(f, match$1[0], s2[/* l */0]), v2, _3(f, v2, match$1[1], some(s2[/* d */2])), merge$1(f, match$1[2], s2[/* r */3]));
    }
    throw [
          assert_failure,
          /* tuple */[
            "map.ml",
            393,
            10
          ]
        ];
  }

  function union(f, s1, s2) {
    if (!s1) {
      return s2;
    }
    if (!s2) {
      return s1;
    }
    var d2 = s2[/* d */2];
    var v2 = s2[/* v */1];
    var d1 = s1[/* d */2];
    var v1 = s1[/* v */1];
    if (s1[/* h */4] >= s2[/* h */4]) {
      var match = split(v1, s2);
      var d2$1 = match[1];
      var l = union(f, s1[/* l */0], match[0]);
      var r = union(f, s1[/* r */3], match[2]);
      if (d2$1 !== undefined) {
        return concat_or_join(l, v1, _3(f, v1, d1, valFromOption(d2$1)), r);
      } else {
        return join(l, v1, d1, r);
      }
    }
    var match$1 = split(v2, s1);
    var d1$1 = match$1[1];
    var l$1 = union(f, match$1[0], s2[/* l */0]);
    var r$1 = union(f, match$1[2], s2[/* r */3]);
    if (d1$1 !== undefined) {
      return concat_or_join(l$1, v2, _3(f, v2, valFromOption(d1$1), d2), r$1);
    } else {
      return join(l$1, v2, d2, r$1);
    }
  }

  function filter$1(p, m) {
    if (!m) {
      return /* Empty */0;
    }
    var r = m[/* r */3];
    var d = m[/* d */2];
    var v = m[/* v */1];
    var l = m[/* l */0];
    var l$prime = filter$1(p, l);
    var pvd = _2(p, v, d);
    var r$prime = filter$1(p, r);
    if (pvd) {
      if (l === l$prime && r === r$prime) {
        return m;
      } else {
        return join(l$prime, v, d, r$prime);
      }
    } else {
      return concat$2(l$prime, r$prime);
    }
  }

  function partition$1(p, param) {
    if (!param) {
      return /* tuple */[
              /* Empty */0,
              /* Empty */0
            ];
    }
    var d = param[/* d */2];
    var v = param[/* v */1];
    var match = partition$1(p, param[/* l */0]);
    var lf = match[1];
    var lt = match[0];
    var pvd = _2(p, v, d);
    var match$1 = partition$1(p, param[/* r */3]);
    var rf = match$1[1];
    var rt = match$1[0];
    if (pvd) {
      return /* tuple */[
              join(lt, v, d, rt),
              concat$2(lf, rf)
            ];
    } else {
      return /* tuple */[
              concat$2(lt, rt),
              join(lf, v, d, rf)
            ];
    }
  }

  function cons_enum(_m, _e) {
    while(true) {
      var e = _e;
      var m = _m;
      if (!m) {
        return e;
      }
      _e = /* More */[
        m[/* v */1],
        m[/* d */2],
        m[/* r */3],
        e
      ];
      _m = m[/* l */0];
      continue ;
    }}

  function compare$1(cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        if (e2) {
          return -1;
        } else {
          return 0;
        }
      }
      if (!e2) {
        return 1;
      }
      var c = caml_string_compare(e1[0], e2[0]);
      if (c !== 0) {
        return c;
      }
      var c$1 = _2(cmp, e1[1], e2[1]);
      if (c$1 !== 0) {
        return c$1;
      }
      _e2 = cons_enum(e2[2], e2[3]);
      _e1 = cons_enum(e1[2], e1[3]);
      continue ;
    }}

  function equal(cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        if (e2) {
          return false;
        } else {
          return true;
        }
      }
      if (!e2) {
        return false;
      }
      if (caml_string_compare(e1[0], e2[0]) !== 0) {
        return false;
      }
      if (!_2(cmp, e1[1], e2[1])) {
        return false;
      }
      _e2 = cons_enum(e2[2], e2[3]);
      _e1 = cons_enum(e1[2], e1[3]);
      continue ;
    }}

  function cardinal(param) {
    if (param) {
      return (cardinal(param[/* l */0]) + 1 | 0) + cardinal(param[/* r */3]) | 0;
    } else {
      return 0;
    }
  }

  function bindings_aux(_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (!param) {
        return accu;
      }
      _param = param[/* l */0];
      _accu = /* :: */[
        /* tuple */[
          param[/* v */1],
          param[/* d */2]
        ],
        bindings_aux(accu, param[/* r */3])
      ];
      continue ;
    }}

  function bindings(s) {
    return bindings_aux(/* [] */0, s);
  }

  var ObjectDict = {
    empty: /* Empty */0,
    is_empty: is_empty,
    mem: mem$1,
    add: add$1,
    update: update,
    singleton: singleton,
    remove: remove,
    merge: merge$1,
    union: union,
    compare: compare$1,
    equal: equal,
    iter: iter$1,
    fold: fold,
    for_all: for_all,
    exists: exists$1,
    filter: filter$1,
    partition: partition$1,
    cardinal: cardinal,
    bindings: bindings,
    min_binding: min_binding,
    min_binding_opt: min_binding_opt,
    max_binding: max_binding,
    max_binding_opt: max_binding_opt,
    choose: min_binding,
    choose_opt: min_binding_opt,
    split: split,
    find: find,
    find_opt: find_opt,
    find_first: find_first,
    find_first_opt: find_first_opt,
    find_last: find_last,
    find_last_opt: find_last_opt,
    map: map$4,
    mapi: mapi
  };

  var ParseFail = create("Tea_json.Decoder.ParseFail");

  var string = /* Decoder */[(function (value) {
        var s = classify$1(value);
        if (typeof s === "number" || s.tag) {
          return /* Error */__(1, ["Non-string value"]);
        } else {
          return /* Ok */__(0, [s[0]]);
        }
      })];

  var $$int = /* Decoder */[(function (value) {
        var n = classify$1(value);
        if (typeof n === "number") {
          return /* Error */__(1, ["Non-int value"]);
        }
        if (n.tag !== /* JSONNumber */1) {
          return /* Error */__(1, ["Non-int value"]);
        }
        var n$1 = n[0];
        if (n$1 > min_int$1 && n$1 < max_int$1) {
          return /* Ok */__(0, [n$1 | 0]);
        } else {
          return /* Error */__(1, ["number out of int range"]);
        }
      })];

  var $$float = /* Decoder */[(function (value) {
        var n = classify$1(value);
        if (typeof n === "number" || n.tag !== /* JSONNumber */1) {
          return /* Error */__(1, ["Non-float-value"]);
        } else {
          return /* Ok */__(0, [n[0]]);
        }
      })];

  var bool = /* Decoder */[(function (value) {
        var match = classify$1(value);
        if (typeof match !== "number") {
          return /* Error */__(1, ["Non-boolean value"]);
        }
        switch (match) {
          case /* JSONFalse */0 :
              return /* Ok */__(0, [false]);
          case /* JSONTrue */1 :
              return /* Ok */__(0, [true]);
          case /* JSONNull */2 :
              return /* Error */__(1, ["Non-boolean value"]);
          
        }
      })];

  function $$null(v) {
    return /* Decoder */[(function (value) {
                var match = classify$1(value);
                if (typeof match === "number" && match >= 2) {
                  return /* Ok */__(0, [v]);
                } else {
                  return /* Error */__(1, ["Non-null value"]);
                }
              })];
  }

  function list(decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var a = classify$1(value);
                if (typeof a === "number") {
                  return /* Error */__(1, ["Non-list value"]);
                }
                if (a.tag !== /* JSONArray */3) {
                  return /* Error */__(1, ["Non-list value"]);
                }
                var parse = function (v) {
                  var r = _1(decoder$1, v);
                  if (!r.tag) {
                    return r[0];
                  }
                  throw [
                        ParseFail,
                        r[0]
                      ];
                };
                try {
                  return /* Ok */__(0, [map(parse, to_list(a[0]))]);
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e[0] === ParseFail) {
                    return /* Error */__(1, ["list -> " + e[1]]);
                  }
                  throw e;
                }
              })];
  }

  function array(decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var a = classify$1(value);
                if (typeof a === "number") {
                  return /* Error */__(1, ["Non-array value"]);
                }
                if (a.tag !== /* JSONArray */3) {
                  return /* Error */__(1, ["Non-array value"]);
                }
                var parse = function (v) {
                  var r = _1(decoder$1, v);
                  if (!r.tag) {
                    return r[0];
                  }
                  throw [
                        ParseFail,
                        r[0]
                      ];
                };
                try {
                  return /* Ok */__(0, [map$3(parse, a[0])]);
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e[0] === ParseFail) {
                    return /* Error */__(1, ["array -> " + e[1]]);
                  }
                  throw e;
                }
              })];
  }

  function keyValuePairs(decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var o = classify$1(value);
                if (typeof o === "number") {
                  return /* Error */__(1, ["Non-keyValuePair value"]);
                }
                if (o.tag !== /* JSONObject */2) {
                  return /* Error */__(1, ["Non-keyValuePair value"]);
                }
                var o$1 = o[0];
                var keys = Object.keys(o$1);
                var parse = function (k, l) {
                  var v = get$1(o$1, k);
                  if (v !== undefined) {
                    var r = _1(decoder$1, valFromOption(v));
                    if (!r.tag) {
                      return /* :: */[
                              /* tuple */[
                                k,
                                r[0]
                              ],
                              l
                            ];
                    }
                    throw [
                          ParseFail,
                          r[0]
                        ];
                  }
                  throw [
                        ParseFail,
                        "Key is undefined: " + k
                      ];
                };
                try {
                  return /* Ok */__(0, [fold_right$1(parse, keys, /* [] */0)]);
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e[0] === ParseFail) {
                    return /* Error */__(1, ["Invalid keyValuePair parsing: " + e[1]]);
                  }
                  throw e;
                }
              })];
  }

  function dict(decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var o = classify$1(value);
                if (typeof o === "number") {
                  return /* Error */__(1, ["Non-dict value"]);
                }
                if (o.tag !== /* JSONObject */2) {
                  return /* Error */__(1, ["Non-dict value"]);
                }
                var o$1 = o[0];
                var keys = Object.keys(o$1);
                var parse = function (k, d) {
                  var v = get$1(o$1, k);
                  if (v !== undefined) {
                    var r = _1(decoder$1, valFromOption(v));
                    if (!r.tag) {
                      return add$1(k, r[0], d);
                    }
                    throw [
                          ParseFail,
                          r[0]
                        ];
                  }
                  throw [
                        ParseFail,
                        "Key is undefined: " + k
                      ];
                };
                try {
                  return /* Ok */__(0, [fold_right$1(parse, keys, /* Empty */0)]);
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e[0] === ParseFail) {
                    return /* Error */__(1, ["Invalid dict parsing: " + e[1]]);
                  }
                  throw e;
                }
              })];
  }

  function field(key, decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var o = classify$1(value);
                if (typeof o === "number") {
                  return /* Error */__(1, ["Non-fieldable value"]);
                }
                if (o.tag !== /* JSONObject */2) {
                  return /* Error */__(1, ["Non-fieldable value"]);
                }
                var v = get$1(o[0], key);
                if (v === undefined) {
                  return /* Error */__(1, ["Field Value is undefined: " + key]);
                }
                var o$1 = _1(decoder$1, valFromOption(v));
                if (o$1.tag) {
                  return /* Error */__(1, ["field `" + (key + ("` -> " + o$1[0]))]);
                } else {
                  return o$1;
                }
              })];
  }

  function at(fields, dec) {
    return fold_right(field, fields, dec);
  }

  function index(idx, decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var a = classify$1(value);
                if (typeof a === "number") {
                  return /* Error */__(1, ["Non-array value"]);
                }
                if (a.tag !== /* JSONArray */3) {
                  return /* Error */__(1, ["Non-array value"]);
                }
                var a$1 = a[0];
                if (idx < 0 || idx > a$1.length) {
                  return /* Error */__(1, ["Array index out of range: " + String(idx)]);
                } else {
                  return _1(decoder$1, caml_array_get(a$1, idx));
                }
              })];
  }

  function maybe(decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var r = _1(decoder$1, value);
                if (r.tag) {
                  return /* Ok */__(0, [undefined]);
                } else {
                  return /* Ok */__(0, [some(r[0])]);
                }
              })];
  }

  function oneOf(decoders) {
    return /* Decoder */[(function (value) {
                var parse = function (v, _param) {
                  while(true) {
                    var param = _param;
                    if (!param) {
                      return /* Error */__(1, ["No one-of's matched"]);
                    }
                    var rest = param[1];
                    try {
                      var ok = _1(param[0][0], v);
                      if (ok.tag) {
                        return parse(v, rest);
                      } else {
                        return ok;
                      }
                    }
                    catch (exn){
                      _param = rest;
                      continue ;
                    }
                  }              };
                return parse(value, decoders);
              })];
  }

  function map$1$1(mapper, decoder1) {
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var v1 = _1(decoder1$1, value);
                if (v1.tag) {
                  return /* Error */__(1, ["map " + v1[0]]);
                } else {
                  return /* Ok */__(0, [_1(mapper, v1[0])]);
                }
              })];
  }

  function map2(mapper, decoder1, decoder2) {
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                if (!match.tag && !match$1.tag) {
                  return /* Ok */__(0, [_2(mapper, match[0], match$1[0])]);
                }
                var e = error_of_first(match, match$1);
                if (e !== undefined) {
                  return /* Error */__(1, ["map2 -> " + e]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function map3(mapper, decoder1, decoder2, decoder3) {
    var decoder3$1 = decoder3[0];
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                if (!match.tag && !match$1.tag && !match$2.tag) {
                  return /* Ok */__(0, [_3(mapper, match[0], match$1[0], match$2[0])]);
                }
                var e = first(match$2, first(match$1, match));
                if (e.tag) {
                  return /* Error */__(1, ["map3 -> " + e[0]]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function map4(mapper, decoder1, decoder2, decoder3, decoder4) {
    var decoder4$1 = decoder4[0];
    var decoder3$1 = decoder3[0];
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                if (!match.tag && !match$1.tag && !match$2.tag && !match$3.tag) {
                  return /* Ok */__(0, [_4(mapper, match[0], match$1[0], match$2[0], match$3[0])]);
                }
                var e = first(match$3, first(match$2, first(match$1, match)));
                if (e.tag) {
                  return /* Error */__(1, ["map4 -> " + e[0]]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function map5(mapper, decoder1, decoder2, decoder3, decoder4, decoder5) {
    var decoder5$1 = decoder5[0];
    var decoder4$1 = decoder4[0];
    var decoder3$1 = decoder3[0];
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                if (!match.tag && !match$1.tag && !match$2.tag && !match$3.tag && !match$4.tag) {
                  return /* Ok */__(0, [_5(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0])]);
                }
                var e = first(match$4, first(match$3, first(match$2, first(match$1, match))));
                if (e.tag) {
                  return /* Error */__(1, ["map5 -> " + e[0]]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function map6(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6) {
    var decoder6$1 = decoder6[0];
    var decoder5$1 = decoder5[0];
    var decoder4$1 = decoder4[0];
    var decoder3$1 = decoder3[0];
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                var match$5 = _1(decoder6$1, value);
                if (!match.tag && !match$1.tag && !match$2.tag && !match$3.tag && !match$4.tag && !match$5.tag) {
                  return /* Ok */__(0, [_6(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0], match$5[0])]);
                }
                var e = first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match)))));
                if (e.tag) {
                  return /* Error */__(1, ["map6 -> " + e[0]]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function map7(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6, decoder7) {
    var decoder7$1 = decoder7[0];
    var decoder6$1 = decoder6[0];
    var decoder5$1 = decoder5[0];
    var decoder4$1 = decoder4[0];
    var decoder3$1 = decoder3[0];
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                var match$5 = _1(decoder6$1, value);
                var match$6 = _1(decoder7$1, value);
                if (!match.tag && !match$1.tag && !match$2.tag && !match$3.tag && !match$4.tag && !match$5.tag && !match$6.tag) {
                  return /* Ok */__(0, [_7(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0], match$5[0], match$6[0])]);
                }
                var e = first(match$6, first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match))))));
                if (e.tag) {
                  return /* Error */__(1, ["map7 -> " + e[0]]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function map8(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6, decoder7, decoder8) {
    var decoder8$1 = decoder8[0];
    var decoder7$1 = decoder7[0];
    var decoder6$1 = decoder6[0];
    var decoder5$1 = decoder5[0];
    var decoder4$1 = decoder4[0];
    var decoder3$1 = decoder3[0];
    var decoder2$1 = decoder2[0];
    var decoder1$1 = decoder1[0];
    return /* Decoder */[(function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                var match$5 = _1(decoder6$1, value);
                var match$6 = _1(decoder7$1, value);
                var match$7 = _1(decoder8$1, value);
                if (!match.tag && !match$1.tag && !match$2.tag && !match$3.tag && !match$4.tag && !match$5.tag && !match$6.tag && !match$7.tag) {
                  return /* Ok */__(0, [_8(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0], match$5[0], match$6[0], match$7[0])]);
                }
                var e = first(match$7, first(match$6, first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match)))))));
                if (e.tag) {
                  return /* Error */__(1, ["map8 -> " + e[0]]);
                }
                throw [
                      failure,
                      "Impossible case"
                    ];
              })];
  }

  function succeed(v) {
    return /* Decoder */[(function (_value) {
                return /* Ok */__(0, [v]);
              })];
  }

  function fail(e) {
    return /* Decoder */[(function (_value) {
                return /* Error */__(1, [e]);
              })];
  }

  var value = /* Decoder */[(function (value) {
        return /* Ok */__(0, [value]);
      })];

  function andThen(func, decoder) {
    var decoder$1 = decoder[0];
    return /* Decoder */[(function (value) {
                var r = _1(decoder$1, value);
                if (r.tag) {
                  return r;
                }
                var andThenDecoder = _1(func, r[0]);
                return _1(andThenDecoder[0], value);
              })];
  }

  function lazy_(func) {
    return andThen(func, /* Decoder */[(function (_value) {
                    return /* Ok */__(0, [undefined]);
                  })]);
  }

  function nullable(decoder) {
    return oneOf(/* :: */[
                $$null(undefined),
                /* :: */[
                  map$1$1((function (v) {
                          return some(v);
                        }), decoder),
                  /* [] */0
                ]
              ]);
  }

  function decodeValue(decoder, value) {
    try {
      return _1(decoder[0], value);
    }
    catch (raw_e){
      var e = internalToOCamlException(raw_e);
      if (e[0] === ParseFail) {
        return /* Error */__(1, [e[1]]);
      } else {
        return /* Error */__(1, ["Unknown JSON parsing error"]);
      }
    }
  }

  function decodeEvent(decoder, value) {
    try {
      return _1(decoder[0], value);
    }
    catch (raw_e){
      var e = internalToOCamlException(raw_e);
      if (e[0] === ParseFail) {
        return /* Error */__(1, [e[1]]);
      } else {
        return /* Error */__(1, ["Unknown JSON parsing error"]);
      }
    }
  }

  function decodeString(decoder, string) {
    try {
      var value = JSON.parse(string);
      return decodeValue(decoder, value);
    }
    catch (exn){
      return /* Error */__(1, ["Invalid JSON string"]);
    }
  }

  var Decoder = {
    ObjectDict: ObjectDict,
    ParseFail: ParseFail,
    string: string,
    $$int: $$int,
    $$float: $$float,
    bool: bool,
    $$null: $$null,
    list: list,
    array: array,
    keyValuePairs: keyValuePairs,
    dict: dict,
    field: field,
    at: at,
    index: index,
    maybe: maybe,
    oneOf: oneOf,
    map: map$1$1,
    map2: map2,
    map3: map3,
    map4: map4,
    map5: map5,
    map6: map6,
    map7: map7,
    map8: map8,
    succeed: succeed,
    fail: fail,
    value: value,
    andThen: andThen,
    lazy_: lazy_,
    nullable: nullable,
    decodeValue: decodeValue,
    decodeEvent: decodeEvent,
    decodeString: decodeString
  };
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function text(str) {
    return /* Text */__(1, [str]);
  }

  function div$1(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "div", key, unique, props, nodes);
  }

  function span(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "span", key, unique, props, nodes);
  }

  function p(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "p", key, unique, props, nodes);
  }

  function a(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "a", key, unique, props, nodes);
  }

  function h3(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "h3", key, unique, props, nodes);
  }

  function button(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "button", key, unique, props, nodes);
  }

  function textarea(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "textarea", key, unique, props, nodes);
  }

  function label(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "label", key, unique, props, nodes);
  }

  function ul(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "ul", key, unique, props, nodes);
  }

  function li(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "li", key, unique, props, nodes);
  }

  function hr(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "hr", key, unique, props, nodes);
  }

  function class$prime(name) {
    return /* RawProp */__(0, [
              "className",
              name
            ]);
  }

  function classList(classes) {
    return /* RawProp */__(0, [
              "className",
              concat$1(" ", map((function (param) {
                          return param[0];
                        }), filter((function (param) {
                                return param[1];
                              }))(classes)))
            ]);
  }

  function placeholder(str) {
    return /* RawProp */__(0, [
              "placeholder",
              str
            ]);
  }

  function value$1(str) {
    return /* RawProp */__(0, [
              "value",
              str
            ]);
  }

  var onCB$1 = onCB;

  function onInputOpt(keyOpt, msg) {
    var key = keyOpt !== undefined ? keyOpt : "";
    return onCB("input", key, (function (ev) {
                  var target = ev.target;
                  if (target === undefined) {
                    return ;
                  }
                  var value = target.value;
                  if (value !== undefined) {
                    return _1(msg, value);
                  }
                  
                }));
  }

  function onInput(keyOpt, msg) {
    var key = keyOpt !== undefined ? keyOpt : "";
    return onInputOpt(key, (function (ev) {
                  return some(_1(msg, ev));
                }));
  }

  function onClick(msg) {
    return onMsg("click", msg);
  }

  var defaultOptions = {
    stopPropagation: false,
    preventDefault: false
  };

  var targetValue = Decoder.at(/* :: */[
        "target",
        /* :: */[
          "value",
          /* [] */0
        ]
      ], Decoder.string);

  var targetChecked = Decoder.at(/* :: */[
        "target",
        /* :: */[
          "checked",
          /* [] */0
        ]
      ], Decoder.bool);

  var keyCode = Decoder.field("keyCode", Decoder.$$int);

  function max(value) {
    return /* Attribute */__(1, [
              "",
              "max",
              value
            ]);
  }

  function min(value) {
    return /* Attribute */__(1, [
              "",
              "min",
              value
            ]);
  }

  function step(value) {
    return /* Attribute */__(1, [
              "",
              "step",
              value
            ]);
  }

  function disabled(b) {
    if (b) {
      return /* Attribute */__(1, [
                "",
                "disabled",
                "true"
              ]);
    } else {
      return /* NoProp */0;
    }
  }

  function selected(b) {
    if (b) {
      return /* Attribute */__(1, [
                "",
                "selected",
                "true"
              ]);
    } else {
      return /* NoProp */0;
    }
  }

  function acceptCharset(c) {
    return /* Attribute */__(1, [
              "",
              "accept-charset",
              c
            ]);
  }

  function rel(value) {
    return /* Attribute */__(1, [
              "",
              "rel",
              value
            ]);
  }

  var Attributes = {
    max: max,
    min: min,
    step: step,
    disabled: disabled,
    selected: selected,
    acceptCharset: acceptCharset,
    rel: rel
  };

  var noNode$1 = noNode;

  var noProp = /* NoProp */0;
  /* targetValue Not a pure module */

  var lazy_tag = 246;

  var forward_tag = 250;
  /* No side effect */

  var Undefined = create("CamlinternalLazy.Undefined");

  function raise_undefined(param) {
    throw Undefined;
  }

  function force_lazy_block(blk) {
    var closure = blk[0];
    blk[0] = raise_undefined;
    try {
      var result = _1(closure, undefined);
      blk[0] = result;
      caml_obj_set_tag(blk, forward_tag);
      return result;
    }
    catch (e){
      blk[0] = (function (param) {
          throw e;
        });
      throw e;
    }
  }

  function force(lzv) {
    var t = lzv.tag | 0;
    if (t === forward_tag) {
      return lzv[0];
    } else if (t !== lazy_tag) {
      return lzv;
    } else {
      return force_lazy_block(lzv);
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function take(n, lst) {
    var recur = function (_acc, _list_remaining, _num_remaining) {
      while(true) {
        var num_remaining = _num_remaining;
        var list_remaining = _list_remaining;
        var acc = _acc;
        if (num_remaining === 0) {
          return /* tuple */[
                  acc,
                  list_remaining
                ];
        }
        if (!list_remaining) {
          return /* tuple */[
                  acc,
                  /* [] */0
                ];
        }
        _num_remaining = num_remaining - 1 | 0;
        _list_remaining = list_remaining[1];
        _acc = /* :: */[
          list_remaining[0],
          acc
        ];
        continue ;
      }  };
    var match = recur(/* [] */0, lst, n);
    return /* tuple */[
            rev(match[0]),
            match[1]
          ];
  }

  function apply(v, fn) {
    return _1(fn, v);
  }

  function bind$1(lst, fn) {
    return concat(map(fn, lst));
  }

  function concat_map(fn, lst) {
    return concat(map(fn, lst));
  }

  function list_from_option(item) {
    if (item !== undefined) {
      return /* :: */[
              valFromOption(item),
              /* [] */0
            ];
    } else {
      return /* [] */0;
    }
  }

  function first_inconsistent_opt(lst, fn) {
    if (lst) {
      var _last = _1(fn, lst[0]);
      var _param = lst[1];
      while(true) {
        var param = _param;
        var last = _last;
        if (!param) {
          return ;
        }
        var current = _1(fn, param[0]);
        if (!caml_equal(current, last)) {
          return /* tuple */[
                  last,
                  current
                ];
        }
        _param = param[1];
        _last = current;
        continue ;
      }  }
    
  }

  var ListEx = {
    take: take,
    apply: apply,
    bind: bind$1,
    concat_map: concat_map,
    $great$great$eq: bind$1,
    list_from_option: list_from_option,
    first_inconsistent_opt: first_inconsistent_opt
  };

  function AggregateMap(Ord) {
    var $$Map$1 = Make(Ord);
    var make = function (key_of, lst) {
      return fold_left((function (map, item) {
                    return _3($$Map$1.update, _1(key_of, item), (function (param) {
                                  if (param !== undefined) {
                                    return /* :: */[
                                            item,
                                            param
                                          ];
                                  } else {
                                    return /* :: */[
                                            item,
                                            /* [] */0
                                          ];
                                  }
                                }), map);
                  }), $$Map$1.empty, lst);
    };
    var keys = function (map$1) {
      return map((function (prim) {
                    return prim[0];
                  }), _1($$Map$1.bindings, map$1));
    };
    var find_opt = function (key, map) {
      return _2($$Map$1.find_opt, key, map);
    };
    return {
            $$Map: $$Map$1,
            make: make,
            keys: keys,
            find_opt: find_opt
          };
  }

  function on_keyed(eventName, key, decoder) {
    return onCB$1(eventName, key, (function ($$event) {
                  if (defaultOptions.stopPropagation) {
                    $$event.stopPropagation();
                  }
                  if (defaultOptions.preventDefault) {
                    $$event.preventDefault();
                  }
                  return result_to_option(Decoder.decodeEvent(decoder, $$event));
                }));
  }

  function keydown(key, msg, keydown_predicate) {
    var ctrlKey = Decoder.field("ctrlKey", Decoder.bool);
    var decode_keydown_info = Decoder.map2((function (keyCode, ctrlKey) {
            return {
                    ctrlKey: ctrlKey,
                    keyCode: keyCode
                  };
          }), keyCode, ctrlKey);
    var keydown_to_message = function (info) {
      if (_1(keydown_predicate, info)) {
        return Decoder.succeed(msg);
      } else {
        return Decoder.fail("Incorrect keys");
      }
    };
    return on_keyed("keydown", key, Decoder.andThen(keydown_to_message, decode_keydown_info));
  }

  var Keydown = {
    keydown: keydown
  };

  var TeaHtmlEx = {
    on_keyed: on_keyed,
    Keydown: Keydown
  };

  function map$5(fn, ret) {
    if (ret.tag) {
      return ret;
    } else {
      return /* Ok */__(0, [_1(fn, ret[0])]);
    }
  }

  function map_error(fn, err) {
    if (err.tag) {
      return /* Error */__(1, [_1(fn, err[0])]);
    } else {
      return err;
    }
  }

  function flatten$1(ret) {
    if (ret.tag) {
      return ret;
    } else {
      return ret[0];
    }
  }

  function flat_map(fn, result) {
    return flatten$1(map$5(fn, result));
  }

  function bind$1$1(result, fn) {
    return flatten$1(map$5(fn, result));
  }

  var ResultEx = {
    map: map$5,
    map_error: map_error,
    flatten: flatten$1,
    flat_map: flat_map,
    bind: bind$1$1,
    $great$great$eq: bind$1$1
  };

  function $$return(v) {
    return /* LCons */[
            v,
            /* EndOfStream */0
          ];
  }

  function push(value, stream) {
    return /* LCons */[
            value,
            stream
          ];
  }

  function map$1$2(fn, param) {
    if (!param) {
      return /* EndOfStream */0;
    }
    var delayed_stream = param[1];
    return /* LCons */[
            _1(fn, param[0]),
            caml_lazy_make((function (param) {
                    return map$1$2(fn, force(delayed_stream));
                  }))
          ];
  }

  function filter$2(pred, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return /* EndOfStream */0;
      }
      var delayed_stream = param[1];
      var value = param[0];
      if (_1(pred, value)) {
        return /* LCons */[
                value,
                caml_lazy_make((function(delayed_stream){
                    return function (param) {
                      return filter$2(pred, force(delayed_stream));
                    }
                    }(delayed_stream)))
              ];
      }
      _param = force(delayed_stream);
      continue ;
    }}

  function interleave_delayed(s1, delayed_s2) {
    if (!s1) {
      return force(delayed_s2);
    }
    var delayed_tail_s1 = s1[1];
    return /* LCons */[
            s1[0],
            caml_lazy_make((function (param) {
                    return interleave_delayed(force(delayed_s2), delayed_tail_s1);
                  }))
          ];
  }

  function append_delayed(s1, delayed_s2) {
    if (!s1) {
      return force(delayed_s2);
    }
    var delayed_tail_s1 = s1[1];
    return /* LCons */[
            s1[0],
            caml_lazy_make((function (param) {
                    return append_delayed(force(delayed_tail_s1), delayed_s2);
                  }))
          ];
  }

  function flatten$1$1(param) {
    if (!param) {
      return /* EndOfStream */0;
    }
    var delayed_stream = param[1];
    return interleave_delayed(param[0], caml_lazy_make((function (param) {
                      return flatten$1$1(force(delayed_stream));
                    })));
  }

  function bind$2(stream, fn) {
    return flatten$1$1(map$1$2(fn, stream));
  }

  function from_list(param) {
    if (!param) {
      return /* EndOfStream */0;
    }
    var cdr = param[1];
    return /* LCons */[
            param[0],
            caml_lazy_make((function (param) {
                    return from_list(cdr);
                  }))
          ];
  }

  function from_option(v) {
    if (v !== undefined) {
      return /* LCons */[
              valFromOption(v),
              /* EndOfStream */0
            ];
    } else {
      return /* EndOfStream */0;
    }
  }

  var LazyStream = {
    $$return: $$return,
    unit: $$return,
    push: push,
    map: map$1$2,
    filter: filter$2,
    interleave_delayed: interleave_delayed,
    append_delayed: append_delayed,
    flatten: flatten$1$1,
    bind: bind$2,
    $great$great$eq: bind$2,
    from_list: from_list,
    from_option: from_option
  };
  /* Tea_html Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function compare$2(left, right) {
    return caml_string_compare(left[0], right[0]);
  }

  function make$2(name) {
    return /* VariableName */[name];
  }

  function make_numbered(variable, num) {
    return /* VariableName */[_2(sprintf(/* Format */[
                      /* String */__(2, [
                          /* No_padding */0,
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "%s%d"
                    ]), variable[0], num)];
  }

  function to_string$1(name) {
    return _1(sprintf(/* Format */[
                    /* Char_literal */__(12, [
                        /* "?" */63,
                        /* String */__(2, [
                            /* No_padding */0,
                            /* End_of_format */0
                          ])
                      ]),
                    "?%s"
                  ]), name[0]);
  }

  var VariableName = {
    compare: compare$2,
    make: make$2,
    make_numbered: make_numbered,
    to_string: to_string$1
  };

  function make$1$1(name) {
    return /* RelationName */[name];
  }

  function compare$1$1(left, right) {
    return caml_string_compare(left[0], right[0]);
  }

  function equals$1(left, right) {
    return left[0] === right[0];
  }

  function to_string$1$1(name) {
    return name[0];
  }

  var RelationName = {
    make: make$1$1,
    compare: compare$1$1,
    equals: equals$1,
    to_string: to_string$1$1
  };

  function make_relation(name, related_terms) {
    return /* Relation */__(1, [{
                relation_name: /* RelationName */[name],
                related_terms: related_terms
              }]);
  }

  function make_variable(name) {
    return /* Variable */__(0, [/* VariableName */[name]]);
  }

  function to_string$2(variable) {
    if (!variable.tag) {
      return to_string$1(variable[0]);
    }
    var match = variable[0];
    var related_terms = match.related_terms;
    var name = match.relation_name[0];
    if (related_terms) {
      return _2(sprintf(/* Format */[
                      /* String */__(2, [
                          /* No_padding */0,
                          /* Char_literal */__(12, [
                              /* "(" */40,
                              /* String */__(2, [
                                  /* No_padding */0,
                                  /* Char_literal */__(12, [
                                      /* ")" */41,
                                      /* End_of_format */0
                                    ])
                                ])
                            ])
                        ]),
                      "%s(%s)"
                    ]), name, concat$1(", ", map(to_string$2, related_terms)));
    } else {
      return name;
    }
  }

  function relation_arities(param) {
    if (!param.tag) {
      return /* [] */0;
    }
    var match = param[0];
    var related_terms = match.related_terms;
    return /* :: */[
            /* tuple */[
              match.relation_name,
              length(related_terms)
            ],
            ListEx.concat_map(relation_arities, related_terms)
          ];
  }

  var Term = {
    make_relation: make_relation,
    make_variable: make_variable,
    to_string: to_string$2,
    relation_arities: relation_arities
  };

  function to_string$3(term) {
    switch (term.tag | 0) {
      case /* Term */0 :
          return to_string$2(term[0]);
      case /* EqualityAssertion */1 :
          return _2(sprintf(/* Format */[
                          /* Char_literal */__(12, [
                              /* "<" */60,
                              /* String */__(2, [
                                  /* No_padding */0,
                                  /* String_literal */__(11, [
                                      " = ",
                                      /* String */__(2, [
                                          /* No_padding */0,
                                          /* Char_literal */__(12, [
                                              /* ">" */62,
                                              /* End_of_format */0
                                            ])
                                        ])
                                    ])
                                ])
                            ]),
                          "<%s = %s>"
                        ]), to_string$2(term[0]), to_string$2(term[1]));
      case /* InequalityAssert */2 :
          return _2(sprintf(/* Format */[
                          /* Char_literal */__(12, [
                              /* "<" */60,
                              /* String */__(2, [
                                  /* No_padding */0,
                                  /* String_literal */__(11, [
                                      " /= ",
                                      /* String */__(2, [
                                          /* No_padding */0,
                                          /* Char_literal */__(12, [
                                              /* ">" */62,
                                              /* End_of_format */0
                                            ])
                                        ])
                                    ])
                                ])
                            ]),
                          "<%s /= %s>"
                        ]), to_string$2(term[0]), to_string$2(term[1]));
      
    }
  }

  function relation_arities$1(term) {
    switch (term.tag | 0) {
      case /* Term */0 :
          return relation_arities(term[0]);
      
    }
    return concat(/* :: */[
                relation_arities(term[0]),
                /* :: */[
                  relation_arities(term[1]),
                  /* [] */0
                ]
              ]);
  }

  var ComplexTerm = {
    to_string: to_string$3,
    relation_arities: relation_arities$1
  };

  function to_string$4(terms) {
    return concat$1(" and ", map(to_string$3, terms));
  }

  var Query = {
    empty: /* [] */0,
    to_string: to_string$4
  };

  var FrameMap = Make(VariableName);

  var empty$1 = FrameMap.empty;

  function extend(param, map) {
    return _3(FrameMap.add, param[0], param[1], map);
  }

  function lookup(key, map) {
    var term = _2(FrameMap.find_opt, key, map);
    if (term === undefined) {
      return ;
    }
    if (term.tag) {
      return term;
    }
    var term$prime = lookup(term[0], map);
    if (term$prime !== undefined) {
      return term$prime;
    } else {
      return term;
    }
  }

  function instantiate(frame) {
    var resolve_term = function ($$var) {
      if (!$$var.tag) {
        var variable_name = $$var[0];
        var bound_to_variable = lookup(variable_name, frame);
        if (bound_to_variable !== undefined) {
          return resolve_term(bound_to_variable);
        } else {
          return /* Variable */__(0, [/* VariableName */["?"]]);
        }
      }
      var match = $$var[0];
      return /* Relation */__(1, [{
                  relation_name: match.relation_name,
                  related_terms: map(resolve_term, match.related_terms)
                }]);
    };
    return resolve_term;
  }

  function variable_bindings_in_query(query, frame) {
    var resolve_variable_name = function (variable_name) {
      var bound_to_variable = lookup(variable_name, frame);
      if (bound_to_variable !== undefined) {
        return resolve_term(bound_to_variable);
      } else {
        return /* Variable */__(0, [/* VariableName */["?"]]);
      }
    };
    var visit_term = function (map, $$var) {
      if ($$var.tag) {
        return fold_left(visit_term, map, $$var[0].related_terms);
      }
      var $$var$1 = $$var[0];
      return extend(/* tuple */[
                  $$var$1,
                  resolve_variable_name($$var$1)
                ], map);
    };
    var resolve_term = function ($$var) {
      if (!$$var.tag) {
        return resolve_variable_name($$var[0]);
      }
      var match = $$var[0];
      return /* Relation */__(1, [{
                  relation_name: match.relation_name,
                  related_terms: map(resolve_term, match.related_terms)
                }]);
    };
    var visit_complex = function (map, term) {
      switch (term.tag | 0) {
        case /* Term */0 :
            return visit_term(map, term[0]);
        
      }
      return visit_term(visit_term(map, term[0]), term[1]);
    };
    return _1(FrameMap.bindings, fold_left(visit_complex, empty$1, query));
  }

  function to_strings(query, frame) {
    var bindings = variable_bindings_in_query(query, frame);
    if (bindings) {
      return map((function (param) {
                    return _2(sprintf(/* Format */[
                                    /* String */__(2, [
                                        /* No_padding */0,
                                        /* String_literal */__(11, [
                                            " := ",
                                            /* String */__(2, [
                                                /* No_padding */0,
                                                /* End_of_format */0
                                              ])
                                          ])
                                      ]),
                                    "%s := %s"
                                  ]), to_string$1(param[0]), to_string$2(param[1]));
                  }), bindings);
    } else {
      return /* [] */0;
    }
  }

  function term_depends_on_variable(term, depends_on_variable, frame) {
    var recurse = function (_var$prime) {
      while(true) {
        var var$prime = _var$prime;
        if (var$prime.tag) {
          return exists(recurse, var$prime[0].related_terms);
        }
        var var$prime$1 = var$prime[0];
        if (caml_equal(var$prime$1, depends_on_variable)) {
          return true;
        }
        var value_of_var = lookup(var$prime$1, frame);
        if (value_of_var === undefined) {
          return false;
        }
        _var$prime = value_of_var;
        continue ;
      }  };
    return recurse(term);
  }

  var Frame = {
    FrameMap: FrameMap,
    empty: empty$1,
    extend: extend,
    lookup: lookup,
    instantiate: instantiate,
    variable_bindings_in_query: variable_bindings_in_query,
    to_strings: to_strings,
    term_depends_on_variable: term_depends_on_variable
  };

  function to_string$5(param) {
    var antecedents = param.antecedents;
    var consequent_string = to_string$2(param.consequent);
    var tmp;
    if (antecedents) {
      var antecedents_string = to_string$4(antecedents);
      tmp = _2(sprintf(/* Format */[
                /* String */__(2, [
                    /* No_padding */0,
                    /* String_literal */__(11, [
                        " when ",
                        /* String */__(2, [
                            /* No_padding */0,
                            /* End_of_format */0
                          ])
                      ])
                  ]),
                "%s when %s"
              ]), consequent_string, antecedents_string);
    } else {
      tmp = consequent_string;
    }
    return _1(sprintf(/* Format */[
                    /* String */__(2, [
                        /* No_padding */0,
                        /* Char_literal */__(12, [
                            /* "." */46,
                            /* End_of_format */0
                          ])
                      ]),
                    "%s."
                  ]), tmp);
  }

  function relation_arities$2(param) {
    return concat(/* :: */[
                flatten(map(relation_arities$1, param.antecedents)),
                /* :: */[
                  relation_arities(param.consequent),
                  /* [] */0
                ]
              ]);
  }

  var rule_counter = {
    contents: 0
  };

  function rename_term_variables(assertion) {
    if (!assertion.tag) {
      return /* Variable */__(0, [make_numbered(assertion[0], rule_counter.contents)]);
    }
    var match = assertion[0];
    var new_related_terms = map(rename_term_variables, match.related_terms);
    return /* Relation */__(1, [{
                relation_name: match.relation_name,
                related_terms: new_related_terms
              }]);
  }

  function rename_complex_term_variables(assertion) {
    switch (assertion.tag | 0) {
      case /* Term */0 :
          return /* Term */__(0, [rename_term_variables(assertion[0])]);
      case /* EqualityAssertion */1 :
          var left$prime = rename_term_variables(assertion[0]);
          return /* EqualityAssertion */__(1, [
                    left$prime,
                    rename_term_variables(assertion[1])
                  ]);
      case /* InequalityAssert */2 :
          var left$prime$1 = rename_term_variables(assertion[0]);
          return /* InequalityAssert */__(2, [
                    left$prime$1,
                    rename_term_variables(assertion[1])
                  ]);
      
    }
  }

  function rename(rule) {
    rule_counter.contents = rule_counter.contents + 1 | 0;
    var antecedents$prime = map(rename_complex_term_variables, rule.antecedents);
    return {
            antecedents: antecedents$prime,
            consequent: rename_term_variables(rule.consequent)
          };
  }

  var Rule = {
    to_string: to_string$5,
    relation_arities: relation_arities$2,
    rename_rule_variables: rename
  };

  var RuleIndex = Make({
        compare: compare
      });

  function rule_from_entry(param) {
    return param.rule;
  }

  function identifier_of_rule_entry(param) {
    return _1(sprintf(/* Format */[
                    /* Int */__(4, [
                        /* Int_d */0,
                        /* No_padding */0,
                        /* No_precision */0,
                        /* End_of_format */0
                      ]),
                    "%d"
                  ]), param.id);
  }

  function is_same(left, right) {
    return left.id === right.id;
  }

  function update_rule_entry(entry, rule) {
    console.log(_1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "Update rule entry: ",
                      /* String */__(2, [
                          /* No_padding */0,
                          /* End_of_format */0
                        ])
                    ]),
                  "Update rule entry: %s"
                ]), to_string$5(rule)));
    return {
            id: entry.id,
            rule: rule
          };
  }

  var empty_indexed_by_consequent_relation = RuleIndex.empty;

  var empty$1$1 = {
    all_rules: /* [] */0,
    indexed_by_consequent_relation: empty_indexed_by_consequent_relation
  };

  function fetch_for_query(db, query) {
    var tmp;
    if (query.tag) {
      var rules = _2(RuleIndex.find_opt, query[0].relation_name[0], db.indexed_by_consequent_relation);
      tmp = rules !== undefined ? rules : /* [] */0;
    } else {
      tmp = db.all_rules;
    }
    return LazyStream.from_list(rev(tmp));
  }

  function all_rules(param) {
    return rev(param.all_rules);
  }

  var current_id = {
    contents: 1
  };

  function new_id(param) {
    current_id.contents = current_id.contents + 1 | 0;
    return current_id.contents;
  }

  function remove_rule(db, param) {
    var id = param.id;
    var filter$1 = filter((function (entry) {
            return entry.id !== id;
          }));
    var all_rules = _1(filter$1, db.all_rules);
    var remove = function (rules$prime) {
      if (rules$prime !== undefined) {
        return _1(filter$1, rules$prime);
      } else {
        return /* [] */0;
      }
    };
    var match = param.rule.consequent;
    if (match.tag) {
      return {
              all_rules: all_rules,
              indexed_by_consequent_relation: _3(RuleIndex.update, match[0].relation_name[0], remove, db.indexed_by_consequent_relation)
            };
    } else {
      return {
              all_rules: all_rules,
              indexed_by_consequent_relation: db.indexed_by_consequent_relation
            };
    }
  }

  function update_rule(db, updated_rule_entry) {
    var update_rule_entries = function (rule_entries) {
      return map((function (rule_entry) {
                    if (rule_entry.id === updated_rule_entry.id) {
                      return updated_rule_entry;
                    } else {
                      return rule_entry;
                    }
                  }), rule_entries);
    };
    var all_rules = update_rule_entries(db.all_rules);
    var update_for_key = function (rules$prime) {
      if (rules$prime !== undefined) {
        return update_rule_entries(rules$prime);
      } else {
        return /* :: */[
                updated_rule_entry,
                /* [] */0
              ];
      }
    };
    console.log(_1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "Updating rule in database: ",
                      /* String */__(2, [
                          /* No_padding */0,
                          /* End_of_format */0
                        ])
                    ]),
                  "Updating rule in database: %s"
                ]), to_string$5(updated_rule_entry.rule)));
    var match = updated_rule_entry.rule.consequent;
    if (match.tag) {
      return {
              all_rules: all_rules,
              indexed_by_consequent_relation: _3(RuleIndex.update, match[0].relation_name[0], update_for_key, db.indexed_by_consequent_relation)
            };
    } else {
      return {
              all_rules: all_rules,
              indexed_by_consequent_relation: db.indexed_by_consequent_relation
            };
    }
  }

  function add_rule(db, rule) {
    var entry_id = new_id();
    var entry = {
      id: entry_id,
      rule: rule
    };
    var update_rule = function (rules$prime) {
      if (rules$prime !== undefined) {
        return /* :: */[
                entry,
                rules$prime
              ];
      } else {
        return /* :: */[
                entry,
                /* [] */0
              ];
      }
    };
    var match = rule.consequent;
    if (match.tag) {
      return {
              all_rules: /* :: */[
                entry,
                db.all_rules
              ],
              indexed_by_consequent_relation: _3(RuleIndex.update, match[0].relation_name[0], update_rule, db.indexed_by_consequent_relation)
            };
    } else {
      return {
              all_rules: /* :: */[
                entry,
                db.all_rules
              ],
              indexed_by_consequent_relation: db.indexed_by_consequent_relation
            };
    }
  }

  var RuleDatabase = {
    empty: empty$1$1,
    rule_from_entry: rule_from_entry,
    identifier_of_rule_entry: identifier_of_rule_entry,
    update_rule_entry: update_rule_entry,
    is_same: is_same,
    remove_rule: remove_rule,
    add_rule: add_rule,
    update_rule: update_rule,
    fetch_for_query: fetch_for_query,
    all_rules: all_rules
  };

  var Types = {
    VariableName: VariableName,
    RelationName: RelationName,
    Term: Term,
    ComplexTerm: ComplexTerm,
    Query: Query,
    Frame: Frame,
    Rule: Rule,
    RuleDatabase: RuleDatabase
  };

  var RelationMap = AggregateMap({
        compare: compare$1$1
      });

  var rule_database_snapshot = all_rules;

  function arity_mismatch_messages(relation_arities_opt, relation_names) {
    return fold_left((function (messages, relation_name) {
                  var relation_arities = _1(relation_arities_opt, relation_name);
                  if (relation_arities === undefined) {
                    return messages;
                  }
                  var match = ListEx.first_inconsistent_opt(relation_arities, (function (prim) {
                          return prim[1];
                        }));
                  if (match !== undefined) {
                    return /* :: */[
                            _3(sprintf(/* Format */[
                                      /* String_literal */__(11, [
                                          "Relation '",
                                          /* String */__(2, [
                                              /* No_padding */0,
                                              /* String_literal */__(11, [
                                                  "' has inconsistent number of terms applied of ",
                                                  /* Int */__(4, [
                                                      /* Int_d */0,
                                                      /* No_padding */0,
                                                      /* No_precision */0,
                                                      /* String_literal */__(11, [
                                                          " and ",
                                                          /* Int */__(4, [
                                                              /* Int_d */0,
                                                              /* No_padding */0,
                                                              /* No_precision */0,
                                                              /* End_of_format */0
                                                            ])
                                                        ])
                                                    ])
                                                ])
                                            ])
                                        ]),
                                      "Relation '%s' has inconsistent number of terms applied of %d and %d"
                                    ]), relation_name[0], match[0], match[1]),
                            messages
                          ];
                  } else {
                    return messages;
                  }
                }), /* [] */0, relation_names);
  }

  function relation_map_of_rules(rules) {
    return _2(RelationMap.make, (function (prim) {
                  return prim[0];
                }), ListEx.concat_map(relation_arities$2, rules));
  }

  function unique_relation_names_of_rule(rule) {
    return _1(RelationMap.keys, _2(RelationMap.make, (function (prim) {
                      return prim[0];
                    }), relation_arities$2(rule)));
  }

  function issues_in_existing_rule(rule_database_snapshot, rule_entry_to_validate) {
    var rule_map = relation_map_of_rules(map(rule_from_entry, /* :: */[
              rule_entry_to_validate,
              filter((function (entry) {
                        return !is_same(entry, rule_entry_to_validate);
                      }))(rule_database_snapshot)
            ]));
    return arity_mismatch_messages((function (relation_name) {
                  return _2(RelationMap.find_opt, relation_name, rule_map);
                }), unique_relation_names_of_rule(rule_from_entry(rule_entry_to_validate)));
  }

  function issues_in_new_rule(rule_database_snapshot, rule_to_validate) {
    var rule_map = relation_map_of_rules(/* :: */[
          rule_to_validate,
          map(rule_from_entry, rule_database_snapshot)
        ]);
    return arity_mismatch_messages((function (relation_name) {
                  return _2(RelationMap.find_opt, relation_name, rule_map);
                }), unique_relation_names_of_rule(rule_to_validate));
  }

  function issues_in_query(rule_database_snapshot, query_to_validate) {
    var query_relation_arities = ListEx.concat_map(relation_arities$1, query_to_validate);
    var rule_map = _2(RelationMap.make, (function (prim) {
            return prim[0];
          }), concat(/* :: */[
              query_relation_arities,
              /* :: */[
                ListEx.concat_map(relation_arities$2, map(rule_from_entry, rule_database_snapshot)),
                /* [] */0
              ]
            ]));
    return arity_mismatch_messages((function (relation_name) {
                  return _2(RelationMap.find_opt, relation_name, rule_map);
                }), _1(RelationMap.keys, _2(RelationMap.make, (function (prim) {
                          return prim[0];
                        }), query_relation_arities)));
  }

  var Validator = {
    rule_database_snapshot: rule_database_snapshot,
    issues_in_existing_rule: issues_in_existing_rule,
    issues_in_new_rule: issues_in_new_rule,
    issues_in_query: issues_in_query
  };

  function name_parser(purpose) {
    var partial_arg = equals(/* "_" */95);
    var partial_arg$1 = function (param) {
      return $less$pipe$great(letter, partial_arg, param);
    };
    var partial_arg$2 = _1(sprintf(/* Format */[
              /* String */__(2, [
                  /* No_padding */0,
                  /* String_literal */__(11, [
                      " requires ",
                      /* String */__(2, [
                          /* No_padding */0,
                          /* End_of_format */0
                        ])
                    ])
                ]),
              "%s requires %s"
            ]), purpose);
    var partial_arg$3 = function (param) {
      return concatenate_error_messages(partial_arg$2, partial_arg$1, param);
    };
    return (function (param) {
        return $great$great$eq(partial_arg$3, (function (first_letter) {
                      return map$2((function (char_list) {
                                    return concat$1("", map((function (param) {
                                                      return make$1(1, param);
                                                    }), /* :: */[
                                                    first_letter,
                                                    char_list
                                                  ]));
                                  }), zero_to_many(attempt_in_order(/* :: */[
                                          letter,
                                          /* :: */[
                                            digit,
                                            /* :: */[
                                              equals(/* "_" */95),
                                              /* :: */[
                                                equals(/* "-" */45),
                                                /* [] */0
                                              ]
                                            ]
                                          ]
                                        ])));
                    }), param);
      });
  }

  var partial_arg$1 = $great$great(equals(/* "?" */63), map$2((function (str) {
              return /* Variable */__(0, [/* VariableName */[str]]);
            }), name_parser("Variable")));

  function variable_parser(param) {
    return change_last_failure_message("Variable starting with ?", partial_arg$1, param);
  }

  var is_equal_parser = $great$great(token("= "), (function (param) {
          return succeed_with(true, param);
        }));

  var is_inequal_parser = $great$great(token("/= "), (function (param) {
          return succeed_with(false, param);
        }));

  function inequality_parser(param) {
    return $less$pipe$great(is_equal_parser, is_inequal_parser, param);
  }

  function conjunction_parser(item_parser) {
    return one_to_many_delimited(item_parser, $great$great($great$great(skip_whitespace, token("and")), skip_whitespace));
  }

  function comparison_parser(input) {
    return $great$great$eq($great$great(equals(/* "<" */60), simple_term_parser), (function (left_term) {
                  return (function (param) {
                      return $great$great$eq(inequality_parser, (function (is_equal) {
                                    var partial_arg = $less$less(simple_term_parser, equals(/* ">" */62));
                                    return (function (param) {
                                        return $great$great$eq(partial_arg, (function (right_term) {
                                                      var partial_arg = is_equal ? /* EqualityAssertion */__(1, [
                                                            left_term,
                                                            right_term
                                                          ]) : /* InequalityAssert */__(2, [
                                                            left_term,
                                                            right_term
                                                          ]);
                                                      return (function (param) {
                                                          return succeed_with(partial_arg, param);
                                                        });
                                                    }), param);
                                      });
                                  }), param);
                    });
                }), input);
  }

  function simple_term_parser(input) {
    return $less$pipe$great(variable_parser, relational_term_parser, input);
  }

  function complex_term_parser(input) {
    return $less$pipe$great(map$2((function (term) {
                      return /* Term */__(0, [term]);
                    }), simple_term_parser), comparison_parser, input);
  }

  function simple_terms_parser(input) {
    return one_to_many_delimited($less$less(simple_term_parser, skip_whitespace), $great$great(equals(/* "," */44), skip_whitespace))(input);
  }

  function relational_term_parser(input) {
    return $great$great$eq($less$less(name_parser("Relation"), skip_whitespace), (function (name) {
                  var relation_name = /* RelationName */[name];
                  var partial_arg = /* Relation */__(1, [{
                        relation_name: relation_name,
                        related_terms: /* [] */0
                      }]);
                  var partial_arg$1 = $less$less(equals(/* "(" */40), skip_whitespace);
                  return (function (param) {
                      return bind_with(partial_arg$1, (function (param) {
                                    return map$2((function (related_terms) {
                                                  return /* Relation */__(1, [{
                                                              relation_name: relation_name,
                                                              related_terms: related_terms
                                                            }]);
                                                }), $less$less($less$less(simple_terms_parser, skip_whitespace), equals(/* ")" */41)));
                                  }), partial_arg, param);
                    });
                }), input);
  }

  function complex_terms_parser(input) {
    return conjunction_parser(complex_term_parser)(input);
  }

  function query_parser(input) {
    return conjunction_parser(complex_term_parser)(input);
  }

  function rule_parser(input) {
    return $less$less((function (param) {
                    return $great$great$eq(simple_term_parser, (function (consequent) {
                                  var partial_arg = {
                                    antecedents: /* [] */0,
                                    consequent: consequent
                                  };
                                  var partial_arg$1 = function (param) {
                                    return succeed_with(partial_arg, param);
                                  };
                                  var partial_arg$2 = map$2((function (antecedents) {
                                          return {
                                                  antecedents: antecedents,
                                                  consequent: consequent
                                                };
                                        }), $great$great($great$great($great$great(skip_whitespace, token("when")), skip_whitespace), complex_terms_parser));
                                  return (function (param) {
                                      return $less$pipe$great(partial_arg$2, partial_arg$1, param);
                                    });
                                }), param);
                  }), equals(/* "." */46))(input);
  }

  function rule_database_result_from_rule_strings(rule_strings) {
    return fold_left((function (rule_database_result, rule) {
                  return ResultEx.flat_map((function (rule_database) {
                                return ResultEx.flat_map((function (param) {
                                              var result = param.result;
                                              var issues = issues_in_new_rule(all_rules(rule_database), result);
                                              if (length(issues) > 0) {
                                                return /* Error */__(1, [issues]);
                                              } else {
                                                return /* Ok */__(0, [add_rule(rule_database, result)]);
                                              }
                                            }), ResultEx.map_error((function (err) {
                                                  return map(string_of_parse_error, err);
                                                }), parse_require_all(rule_parser, rule)));
                              }), rule_database_result);
                }), /* Ok */__(0, [empty$1$1]), rule_strings);
  }

  var Parser = {
    rule_parser: rule_parser,
    query_parser: query_parser,
    rule_database_result_from_rule_strings: rule_database_result_from_rule_strings
  };

  function put_negations_at_end(terms) {
    var is_negation = function (param) {
      switch (param.tag | 0) {
        case /* Term */0 :
        case /* EqualityAssertion */1 :
            return false;
        case /* InequalityAssert */2 :
            return true;
        
      }
    };
    var match = partition(is_negation, terms);
    return concat(/* :: */[
                match[1],
                /* :: */[
                  match[0],
                  /* [] */0
                ]
              ]);
  }

  function query_complex_terms(db, terms) {
    var solution_stream_from_complex_term_list = function (_complex_term_list, _solution_stream) {
      while(true) {
        var solution_stream = _solution_stream;
        var complex_term_list = _complex_term_list;
        if (!complex_term_list) {
          return solution_stream;
        }
        _solution_stream = solution_stream_from_complex_term(complex_term_list[0], solution_stream);
        _complex_term_list = complex_term_list[1];
        continue ;
      }  };
    var solution_stream_from_complex_term = function (complex_term, solution_stream) {
      switch (complex_term.tag | 0) {
        case /* Term */0 :
            var term = complex_term[0];
            return LazyStream.$great$great$eq(solution_stream, (function (param) {
                          return LazyStream.$great$great$eq(fetch_for_query(db, term), (function (param$1) {
                                        var rule = rule_from_entry(param$1);
                                        var clean_rule = rename(rule);
                                        var solution$prime = solution_opt_by_unification(term, clean_rule.consequent, param);
                                        if (solution$prime !== undefined) {
                                          return solution_stream_from_complex_term_list(clean_rule.antecedents, LazyStream.$$return({
                                                          frame: solution$prime.frame,
                                                          rules_applied: /* :: */[
                                                            param$1,
                                                            solution$prime.rules_applied
                                                          ]
                                                        }));
                                        } else {
                                          return /* EndOfStream */0;
                                        }
                                      }));
                        }));
        case /* EqualityAssertion */1 :
            var right = complex_term[1];
            var left = complex_term[0];
            return LazyStream.$great$great$eq(solution_stream, (function (solution) {
                          return LazyStream.from_option(solution_opt_by_unification(left, right, solution));
                        }));
        case /* InequalityAssert */2 :
            var right$1 = complex_term[1];
            var left$1 = complex_term[0];
            var solution_stream_where_no_unification = function (solution) {
              var match = solution_opt_by_unification(left$1, right$1, solution);
              if (match !== undefined) {
                return /* EndOfStream */0;
              } else {
                return LazyStream.$$return(solution);
              }
            };
            return LazyStream.$great$great$eq(solution_stream, solution_stream_where_no_unification);
        
      }
    };
    var solution_opt_by_unification = function (left_term, right_term, solution) {
      if (caml_equal(left_term, right_term)) {
        return solution;
      }
      if (!left_term.tag) {
        return solution_opt_by_unification_or_extension_of_variable(left_term[0], right_term, solution);
      }
      var left_relation = left_term[0];
      if (!right_term.tag) {
        return solution_opt_by_unification_or_extension_of_variable(right_term[0], left_term, solution);
      }
      var right_relation = right_term[0];
      if (equals$1(left_relation.relation_name, right_relation.relation_name)) {
        var left_terms = left_relation.related_terms;
        var right_terms = right_relation.related_terms;
        return fold_left((function (solution_opt, param) {
                      if (solution_opt !== undefined) {
                        return solution_opt_by_unification(param[0], param[1], solution_opt);
                      }
                      
                    }), solution, combine(left_terms, right_terms));
      }
      
    };
    var solution_opt_by_unification_or_extension_of_variable = function (variable_name, value_term, solution) {
      var term_bound_to_variable = lookup(variable_name, solution.frame);
      if (term_bound_to_variable !== undefined) {
        return solution_opt_by_unification(term_bound_to_variable, value_term, solution);
      }
      if (value_term.tag) {
        if (term_depends_on_variable(value_term, variable_name, solution.frame)) {
          return ;
        } else {
          return {
                  frame: extend(/* tuple */[
                        variable_name,
                        value_term
                      ], solution.frame),
                  rules_applied: solution.rules_applied
                };
        }
      }
      var term_bound_to_value = lookup(value_term[0], solution.frame);
      if (term_bound_to_value !== undefined) {
        return solution_opt_by_unification(/* Variable */__(0, [variable_name]), term_bound_to_value, solution);
      } else {
        return {
                frame: extend(/* tuple */[
                      variable_name,
                      value_term
                    ], solution.frame),
                rules_applied: solution.rules_applied
              };
      }
    };
    var partial_arg = put_negations_at_end(terms);
    return (function (param) {
        return solution_stream_from_complex_term_list(partial_arg, param);
      });
  }

  function query(db, query$1) {
    return query_complex_terms(db, query$1)(LazyStream.$$return({
                    frame: empty$1,
                    rules_applied: /* [] */0
                  }));
  }

  var Evaluator = {
    query: query
  };
  /* FrameMap Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function empty$2(param) {
    return {
            text: "",
            compilation_result: /* Error */__(1, [/* [] */0])
          };
  }

  function edit(string_of_item, item) {
    return {
            text: _1(string_of_item, item),
            compilation_result: /* Ok */__(0, [item])
          };
  }

  function make$3(text, parser, validator) {
    var errors = parse_require_all(parser, text);
    var tmp;
    if (errors.tag) {
      var match = sort(parse_error_compare, errors[0]);
      if (match) {
        var first_error = match[0];
        var errors$prime_001 = filter((function (err) {
                  return parse_error_compare(err, first_error) <= 0;
                }))(match[1]);
        var errors$prime = /* :: */[
          first_error,
          errors$prime_001
        ];
        tmp = /* Error */__(1, [map(string_of_parse_error, errors$prime)]);
      } else {
        tmp = /* Error */__(1, [/* [] */0]);
      }
    } else {
      var result = errors[0].result;
      var validation_messages = _1(validator, result);
      tmp = validation_messages ? /* Error */__(1, [validation_messages]) : /* Ok */__(0, [result]);
    }
    return {
            text: text,
            compilation_result: tmp
          };
  }

  var CompiledTextEditing = {
    empty: empty$2,
    edit: edit,
    make: make$3
  };

  function next_solution(info) {
    var match = info.solution_stream;
    if (match) {
      return {
              initiating_query: info.initiating_query,
              solution_stream: force(match[1]),
              displayed_solutions: /* :: */[
                match[0],
                info.displayed_solutions
              ]
            };
    } else {
      return info;
    }
  }

  var ExecutingQueryInfo = {
    next_solution: next_solution
  };

  function init(param) {
    return {
            rule_database: Types.RuleDatabase.empty,
            example_queries: /* [] */0,
            interaction_mode: /* ViewingRules */0
          };
  }

  var ApplicationModel = {
    CompiledTextEditing: CompiledTextEditing,
    ExecutingQueryInfo: ExecutingQueryInfo,
    init: init
  };

  function initiateEditRule(param_0) {
    return /* InitiateEditRule */__(0, [param_0]);
  }

  function initiateEditQuery(param_0) {
    return /* InitiateEditQuery */__(1, [param_0]);
  }

  function chooseExample(param_0) {
    return /* ChooseExample */__(2, [param_0]);
  }

  function updateText(param_0) {
    return /* UpdateText */__(3, [param_0]);
  }

  function addRule(param_0) {
    return /* AddRule */__(4, [param_0]);
  }

  function editRuleEntry(param_0) {
    return /* EditRuleEntry */__(5, [param_0]);
  }

  function deleteRule(param_0) {
    return /* DeleteRule */__(6, [param_0]);
  }

  function executeQuery(param_0) {
    return /* ExecuteQuery */__(7, [param_0]);
  }

  var Message = {
    viewRules: /* ViewRules */0,
    initiateChooseExample: /* InitiateChooseExample */1,
    initiateAddRule: /* InitiateAddRule */2,
    initiateEditRule: initiateEditRule,
    initiateEditQuery: initiateEditQuery,
    chooseExample: chooseExample,
    updateText: updateText,
    addRule: addRule,
    editRuleEntry: editRuleEntry,
    deleteRule: deleteRule,
    executeQuery: executeQuery,
    nextFrame: /* NextFrame */3
  };

  function update$1(param, msg) {
    var interaction_mode = param.interaction_mode;
    var example_queries = param.example_queries;
    var rule_database = param.rule_database;
    var tmp;
    if (typeof msg === "number") {
      switch (msg) {
        case /* ViewRules */0 :
            tmp = {
              rule_database: rule_database,
              example_queries: example_queries,
              interaction_mode: /* ViewingRules */0
            };
            break;
        case /* InitiateChooseExample */1 :
            tmp = {
              rule_database: rule_database,
              example_queries: example_queries,
              interaction_mode: /* ChoosingExample */__(0, [examples])
            };
            break;
        case /* InitiateAddRule */2 :
            tmp = {
              rule_database: rule_database,
              example_queries: example_queries,
              interaction_mode: /* AddingRule */__(1, [{
                    text: "",
                    compilation_result: /* Error */__(1, [/* [] */0])
                  }])
            };
            break;
        case /* NextFrame */3 :
            tmp = typeof interaction_mode === "number" || interaction_mode.tag !== /* ExecutingQuery */4 ? ({
                  rule_database: rule_database,
                  example_queries: example_queries,
                  interaction_mode: interaction_mode
                }) : ({
                  rule_database: rule_database,
                  example_queries: example_queries,
                  interaction_mode: /* ExecutingQuery */__(4, [next_solution(interaction_mode[0])])
                });
            break;
        
      }
    } else {
      switch (msg.tag | 0) {
        case /* InitiateEditRule */0 :
            var rule_entry = msg[0];
            var rule = _1(Types.RuleDatabase.rule_from_entry, rule_entry);
            tmp = {
              rule_database: rule_database,
              example_queries: example_queries,
              interaction_mode: /* EditingRule */__(2, [
                  rule_entry,
                  edit(Types.Rule.to_string, rule)
                ])
            };
            break;
        case /* InitiateEditQuery */1 :
            tmp = {
              rule_database: rule_database,
              example_queries: example_queries,
              interaction_mode: /* EditingQuery */__(3, [edit(Types.Query.to_string, msg[0])])
            };
            break;
        case /* ChooseExample */2 :
            var example = msg[0];
            var rule_database$prime = Parser.rule_database_result_from_rule_strings(example.rules);
            var tmp$1;
            if (rule_database$prime.tag) {
              console.error(rule_database$prime[0]);
              tmp$1 = rule_database;
            } else {
              tmp$1 = rule_database$prime[0];
            }
            var example_parse_successes = accumulate(map((function (param) {
                        return parse_require_all(Parser.query_parser, param);
                      }), example.queries));
            var tmp$2;
            if (example_parse_successes.tag) {
              console.error(example_parse_successes[0]);
              tmp$2 = /* [] */0;
            } else {
              tmp$2 = map(result_of_parse_success, example_parse_successes[0]);
            }
            tmp = {
              rule_database: tmp$1,
              example_queries: tmp$2,
              interaction_mode: /* ViewingRules */0
            };
            break;
        case /* UpdateText */3 :
            var text = msg[0];
            var snapshot = Validator.rule_database_snapshot(rule_database);
            if (typeof interaction_mode === "number") {
              tmp = {
                rule_database: rule_database,
                example_queries: example_queries,
                interaction_mode: interaction_mode
              };
            } else {
              switch (interaction_mode.tag | 0) {
                case /* AddingRule */1 :
                    tmp = {
                      rule_database: rule_database,
                      example_queries: example_queries,
                      interaction_mode: /* AddingRule */__(1, [make$3(text, Parser.rule_parser, (function (param) {
                                  return Validator.issues_in_new_rule(snapshot, param);
                                }))])
                    };
                    break;
                case /* EditingRule */2 :
                    var rule_entry$1 = interaction_mode[0];
                    var validator = function (rule) {
                      return Validator.issues_in_existing_rule(snapshot, _2(Types.RuleDatabase.update_rule_entry, rule_entry$1, rule));
                    };
                    tmp = {
                      rule_database: rule_database,
                      example_queries: example_queries,
                      interaction_mode: /* EditingRule */__(2, [
                          rule_entry$1,
                          make$3(text, Parser.rule_parser, validator)
                        ])
                    };
                    break;
                case /* EditingQuery */3 :
                    tmp = {
                      rule_database: rule_database,
                      example_queries: example_queries,
                      interaction_mode: /* EditingQuery */__(3, [make$3(text, Parser.query_parser, (function (param) {
                                  return Validator.issues_in_query(snapshot, param);
                                }))])
                    };
                    break;
                default:
                  tmp = {
                    rule_database: rule_database,
                    example_queries: example_queries,
                    interaction_mode: interaction_mode
                  };
              }
            }
            break;
        case /* AddRule */4 :
            tmp = {
              rule_database: _2(Types.RuleDatabase.add_rule, rule_database, msg[0]),
              example_queries: example_queries,
              interaction_mode: /* AddingRule */__(1, [{
                    text: "",
                    compilation_result: /* Error */__(1, [/* [] */0])
                  }])
            };
            break;
        case /* EditRuleEntry */5 :
            tmp = {
              rule_database: _2(Types.RuleDatabase.update_rule, rule_database, msg[0]),
              example_queries: example_queries,
              interaction_mode: /* ViewingRules */0
            };
            break;
        case /* DeleteRule */6 :
            tmp = {
              rule_database: _2(Types.RuleDatabase.remove_rule, rule_database, msg[0]),
              example_queries: example_queries,
              interaction_mode: interaction_mode
            };
            break;
        case /* ExecuteQuery */7 :
            var initiating_query = msg[0];
            var solution_stream = Evaluator.query(rule_database, initiating_query);
            tmp = {
              rule_database: rule_database,
              example_queries: example_queries,
              interaction_mode: /* ExecutingQuery */__(4, [{
                    initiating_query: initiating_query,
                    solution_stream: solution_stream,
                    displayed_solutions: /* [] */0
                  }])
            };
            break;
        
      }
    }
    return /* tuple */[
            tmp,
            /* NoCmd */0
          ];
  }
  /* ParserM Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function addEventListener$1(typ, listener, options) {
    return window.addEventListener(typ, listener, options);
  }

  function removeEventListener$1(typ, listener, options) {
    return window.removeEventListener(typ, listener, options);
  }

  function requestAnimationFrame_polyfill(param) {
    return (// requestAnimationFrame polyfill
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }()));
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function polyfills(param) {
    remove_polyfill();
    requestAnimationFrame_polyfill();
    
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function programStateWrapper(initModel, pump, shutdown) {
    var model = {
      contents: initModel
    };
    var callbacks = {
      contents: {
        enqueue: (function (_msg) {
            console.log("INVALID enqueue CALL!");
            
          })
      }
    };
    var pumperInterface = _1(pump, callbacks);
    var pending = {
      contents: undefined
    };
    var handler = function (msg) {
      var msgs = pending.contents;
      if (msgs !== undefined) {
        pending.contents = /* :: */[
          msg,
          msgs
        ];
        return ;
      }
      pending.contents = /* [] */0;
      var newModel = _2(pumperInterface.handleMsg, model.contents, msg);
      model.contents = newModel;
      var msgs$1 = pending.contents;
      if (msgs$1 !== undefined) {
        if (msgs$1) {
          pending.contents = undefined;
          return iter(handler, rev(msgs$1));
        } else {
          pending.contents = undefined;
          return ;
        }
      }
      throw [
            failure,
            "INVALID message queue state, should never be None during message processing!"
          ];
    };
    var finalizedCBs = {
      enqueue: handler
    };
    callbacks.contents = finalizedCBs;
    var pi_requestShutdown = function (param) {
      callbacks.contents = {
        enqueue: (function (_msg) {
            console.log("INVALID message enqueued when shut down");
            
          })
      };
      var cmd = _1(shutdown, model.contents);
      _1(pumperInterface.shutdown, cmd);
      
    };
    var render_string = function (param) {
      return _1(pumperInterface.render_string, model.contents);
    };
    _1(pumperInterface.startup, undefined);
    return {
            pushMsg: handler,
            shutdown: pi_requestShutdown,
            getHtmlString: render_string
          };
  }

  function programLoop(update, view, subscriptions, initModel, initCmd, parentNode) {
    if (parentNode === undefined) {
      return (function (callbacks) {
          var oldSub = {
            contents: /* NoSub */0
          };
          var handleSubscriptionChange = function (model) {
            var newSub = _1(subscriptions, model);
            oldSub.contents = run$1(callbacks, callbacks, oldSub.contents, newSub);
            
          };
          return {
                  startup: (function (param) {
                      run(callbacks, initCmd);
                      handleSubscriptionChange(initModel);
                      
                    }),
                  render_string: (function (model) {
                      return renderToHtmlString(_1(view, model));
                    }),
                  handleMsg: (function (model, msg) {
                      var match = _2(update, model, msg);
                      var newModel = match[0];
                      run(callbacks, match[1]);
                      handleSubscriptionChange(newModel);
                      return newModel;
                    }),
                  shutdown: (function (cmd) {
                      run(callbacks, cmd);
                      oldSub.contents = run$1(callbacks, callbacks, oldSub.contents, /* NoSub */0);
                      
                    })
                };
        });
    }
    var parentNode$1 = valFromOption(parentNode);
    return (function (callbacks) {
        var priorRenderedVdom = {
          contents: /* [] */0
        };
        var latestModel = {
          contents: initModel
        };
        var nextFrameID = {
          contents: undefined
        };
        var doRender = function (_delta) {
          var _id = nextFrameID.contents;
          if (_id === undefined) {
            return ;
          }
          var newVdom_000 = _1(view, latestModel.contents);
          var newVdom = /* :: */[
            newVdom_000,
            /* [] */0
          ];
          var justRenderedVdom = patchVNodesIntoElement(callbacks, parentNode$1, priorRenderedVdom.contents, newVdom);
          priorRenderedVdom.contents = justRenderedVdom;
          nextFrameID.contents = undefined;
          
        };
        var scheduleRender = function (param) {
          var match = nextFrameID.contents;
          if (match !== undefined) {
            return ;
          } else {
            nextFrameID.contents = -1;
            return doRender();
          }
        };
        var clearPnode = function (param) {
          while(parentNode$1.childNodes.length > 0) {
            var firstChild = parentNode$1.firstChild;
            if (firstChild !== null) {
              parentNode$1.removeChild(firstChild);
            }
            
          }        
        };
        var oldSub = {
          contents: /* NoSub */0
        };
        var handleSubscriptionChange = function (model) {
          var newSub = _1(subscriptions, model);
          oldSub.contents = run$1(callbacks, callbacks, oldSub.contents, newSub);
          
        };
        var handlerStartup = function (param) {
          clearPnode();
          run(callbacks, initCmd);
          handleSubscriptionChange(latestModel.contents);
          nextFrameID.contents = -1;
          doRender();
          
        };
        var render_string = function (model) {
          return renderToHtmlString(_1(view, model));
        };
        var handler = function (model, msg) {
          var match = _2(update, model, msg);
          var newModel = match[0];
          latestModel.contents = newModel;
          run(callbacks, match[1]);
          scheduleRender();
          handleSubscriptionChange(newModel);
          return newModel;
        };
        var handlerShutdown = function (cmd) {
          nextFrameID.contents = undefined;
          run(callbacks, cmd);
          oldSub.contents = run$1(callbacks, callbacks, oldSub.contents, /* NoSub */0);
          priorRenderedVdom.contents = /* [] */0;
          clearPnode();
          
        };
        return {
                startup: handlerStartup,
                render_string: render_string,
                handleMsg: handler,
                shutdown: handlerShutdown
              };
      });
  }

  function program(param, pnode, flags) {
    polyfills();
    var match = _1(param.init, flags);
    var initModel = match[0];
    var opnode = (pnode == null) ? undefined : some(pnode);
    var pumpInterface = programLoop(param.update, param.view, param.subscriptions, initModel, match[1], opnode);
    return programStateWrapper(initModel, pumpInterface, param.shutdown);
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function asRecord($$location) {
    return {
            href: $$location.href,
            protocol: $$location.protocol,
            host: $$location.host,
            hostname: $$location.hostname,
            port: $$location.port,
            pathname: $$location.pathname,
            search: $$location.search,
            hash: $$location.hash,
            username: $$location.username,
            password: $$location.password,
            origin: $$location.origin
          };
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  var notifier = {
    contents: undefined
  };

  function notifyUrlChange(param) {
    var cb = notifier.contents;
    if (cb === undefined) {
      return ;
    }
    var $$location = asRecord(document.location);
    _1(cb, $$location);
    
  }

  function subscribe(tagger) {
    var enableCall = function (callbacks) {
      var notifyHandler = function ($$location) {
        return _1(callbacks.enqueue, _1(tagger, $$location));
      };
      notifier.contents = notifyHandler;
      var handler = function (_event) {
        return notifyUrlChange();
      };
      addEventListener$1("popstate", handler, false);
      return (function (param) {
          return removeEventListener$1("popstate", handler, false);
        });
    };
    return registration("navigation", enableCall);
  }

  function navigationProgram(locationToMessage, stuff) {
    var init = function (flag) {
      return _2(stuff.init, flag, asRecord(document.location));
    };
    var subscriptions = function (model) {
      return /* Batch */__(0, [/* :: */[
                  subscribe(locationToMessage),
                  /* :: */[
                    _1(stuff.subscriptions, model),
                    /* [] */0
                  ]
                ]]);
    };
    var partial_arg_update = stuff.update;
    var partial_arg_view = stuff.view;
    var partial_arg_shutdown = stuff.shutdown;
    var partial_arg = {
      init: init,
      update: partial_arg_update,
      view: partial_arg_view,
      subscriptions: subscriptions,
      shutdown: partial_arg_shutdown
    };
    return (function (param, param$1) {
        return program(partial_arg, param, param$1);
      });
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  var style = "\n        html {\n            height: 100%\n        }\n\n        body {\n            height: 100%;\n            background-color: #eee;\n            display: flex;\n            flex-direction: column;\n            font-family: sans-serif;\n            padding: 0;\n            margin: 0;\n        }\n\n        p {\n            font-size: 14px;\n        }\n\n        h3 {\n            margin-bottom: 3px;\n        }\n    ";

  var button_bar_class = "button-bar";

  var delete_class = "delete";

  function delete_button(msg) {
    return button(undefined, undefined, /* :: */[
                onClick(msg),
                /* :: */[
                  class$prime(delete_class),
                  /* [] */0
                ]
              ], /* :: */[
                text("X"),
                /* [] */0
              ]);
  }

  function button$1(enabledOpt, title, msg) {
    var enabled = enabledOpt !== undefined ? enabledOpt : true;
    return button(undefined, undefined, /* :: */[
                onClick(msg),
                /* :: */[
                  Attributes.disabled(!enabled),
                  /* [] */0
                ]
              ], /* :: */[
                text(title),
                /* [] */0
              ]);
  }

  function button_bar(buttons) {
    return div$1(undefined, undefined, /* :: */[
                class$prime(button_bar_class),
                /* [] */0
              ], buttons);
  }

  var blue_color = "#48a9dc";

  var style$1 = "\n\n        ." + (String(button_bar_class) + (" {\n            padding-top: 5px; \n            padding-bottom: 5px;\n        }\n\n        button {\n            background-color: white;\n            color: #555;\n            box-shadow: 0 0 0 1px " + (String(blue_color) + (";\n            border: none;\n            border-radius: 4px;\n            padding: 6px;\n            margin-right: 8px;\n            font-size: 14px;\n        }\n\n        button." + (String(delete_class) + (" {\n            background-color: #f00;\n            box-shadow: 0 0 2px 2px rgba(127,0,0,.5);\n            font-weight: bold;\n            color: #fff;\n            padding-left: 8px;\n            padding-right: 8px;\n            border-radius: 4px;\n            display: inline-block;\n        }\n\n        button:active {\n            background-color: " + (String(blue_color) + (";\n            color: white;\n        }\n\n        button:disabled {\n            background-color: #ddd;\n            color: #90adbd;\n        }\n\n        a, a:active, a:visited {\n            display: inline-block;\n            color: " + (String(blue_color) + ("\n        }\n\n        a, a:active, a:visited {\n            display: inline-block;\n            color: " + (String(blue_color) + "\n        }\n    ")))))))))));

  var panels_class = "panels";

  var panel_class = "panel";

  var panel_header_class = "panel-header";

  var panel_body_class = "panel-body";

  function panel_view(header, body) {
    return div$1(undefined, undefined, /* :: */[
                class$prime(panel_class),
                /* [] */0
              ], /* :: */[
                div$1(undefined, undefined, /* :: */[
                      class$prime(panel_header_class),
                      /* [] */0
                    ], /* :: */[
                      text(header),
                      /* [] */0
                    ]),
                /* :: */[
                  div$1(undefined, undefined, /* :: */[
                        class$prime(panel_body_class),
                        /* [] */0
                      ], body),
                  /* [] */0
                ]
              ]);
  }

  function panels_container_view(panels) {
    return div$1(undefined, undefined, /* :: */[
                class$prime(panels_class),
                /* [] */0
              ], panels);
  }

  var style$2 = "\n        div." + (String(panels_class) + (" {\n            height: 98%;\n        }\n\n        div." + (String(panel_header_class) + (" {\n            background-color: #248;\n            color: white;\n            font-weight: bold;\n            padding: 4px;\n        }   \n\n        div." + (String(panel_class) + (" {\n            overflow-y: auto;\n            background-color: white;\n            margin-top: 5px;\n        }     \n        \n\n        @media screen and (max-width: 1023px) {\n            div." + (String(panel_class) + (" {\n                float: left;\n                width: 99%;\n                margin-top: 10px;\n                border: solid 1px #aaa;\n            }\n        }\n\n        @media screen and (min-width: 1024px) {\n            div." + (String(panel_class) + (" {\n                float: left;\n                margin-left: 5px;\n                margin-right: 5px;\n                width: 48%;\n                height: 98%;\n                border: solid 1px #aaa;\n            }\n        }\n\n        div." + (String(panel_body_class) + " {\n            padding: 6px;\n        }\n    ")))))))))));

  var section_class = "section";

  var style$3 = "\n\n    ";

  function view(title, content) {
    return div$1(undefined, undefined, /* :: */[
                class$prime(section_class),
                /* [] */0
              ], /* :: */[
                h3(undefined, undefined, /* [] */0, /* :: */[
                      text(title),
                      /* [] */0
                    ]),
                /* :: */[
                  hr(undefined, undefined, /* [] */0, /* [] */0),
                  /* :: */[
                    div$1(undefined, undefined, /* [] */0, content),
                    /* [] */0
                  ]
                ]
              ]);
  }

  var variable_class = "variable";

  var fact_name_class = "fact";

  var relation_name_class = "relation";

  var punctuation_class = "punctuation";

  var rule_item_class = "rule-item";

  var rule_used_class = "rule-used";

  var rule_display_class = "rule-display";

  var style$4 = "\n        ." + (String(variable_class) + (" {\n            color: #ff0; \n            display: inline-block;\n        }\n\n        ." + (String(fact_name_class) + (" {\n            color: #0f0;\n            display: inline-block;\n        }\n        \n        ." + (String(relation_name_class) + (" {\n            color: #6af;\n            font-weight: bold;\n            display: inline-block;\n        }\n\n        ." + (String(punctuation_class) + (" {\n            color: white;\n            font-weight: bold;\n        }\n\n        ." + (String(rule_display_class) + (" {\n            background-color: black;\n            font-family: Consolas, monospace;\n            padding: 4px;\n        }\n\n        ." + (String(rule_item_class) + (" {\n            color: black;\n            background-color: black;\n\n            display: flex;\n            align-items: center;            \n\n            border-radius: 6px;\n            padding: 6px;\n            box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);\n\n            margin-bottom: 12px;\n        }\n\n        ." + (String(rule_item_class) + ("." + (String(rule_used_class) + " {\n            box-shadow: 0 0 2px 4px #f44;\n        }\n\n        ul {\n            list-style: none;\n            margin-block-start: 0;\n            margin-block-end: 0;\n        }\n    ")))))))))))))));

  function punctuation_view(str) {
    return span(undefined, undefined, /* :: */[
                class$prime(punctuation_class),
                /* [] */0
              ], /* :: */[
                text(str),
                /* [] */0
              ]);
  }

  function term_view(param) {
    if (!param.tag) {
      return span(undefined, undefined, /* :: */[
                  class$prime(variable_class),
                  /* [] */0
                ], /* :: */[
                  text(_1(sprintf(/* Format */[
                                /* Char_literal */__(12, [
                                    /* "?" */63,
                                    /* String */__(2, [
                                        /* No_padding */0,
                                        /* End_of_format */0
                                      ])
                                  ]),
                                "?%s"
                              ]), param[0][0])),
                  /* [] */0
                ]);
    }
    var match = param[0];
    var related_terms = match.related_terms;
    var name = match.relation_name[0];
    if (related_terms) {
      return span(undefined, undefined, /* [] */0, /* :: */[
                  span(undefined, undefined, /* :: */[
                        class$prime(relation_name_class),
                        /* [] */0
                      ], /* :: */[
                        text(name),
                        /* [] */0
                      ]),
                  /* :: */[
                    punctuation_view("("),
                    /* :: */[
                      term_view(related_terms[0]),
                      /* :: */[
                        span(undefined, undefined, /* [] */0, map((function (term) {
                                    return span(undefined, undefined, /* [] */0, /* :: */[
                                                punctuation_view(", "),
                                                /* :: */[
                                                  term_view(term),
                                                  /* [] */0
                                                ]
                                              ]);
                                  }), related_terms[1])),
                        /* :: */[
                          punctuation_view(")"),
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]);
    } else {
      return span(undefined, undefined, /* :: */[
                  class$prime(fact_name_class),
                  /* [] */0
                ], /* :: */[
                  text(name),
                  /* [] */0
                ]);
    }
  }

  function complex_term_view(term) {
    switch (term.tag | 0) {
      case /* Term */0 :
          return term_view(term[0]);
      case /* EqualityAssertion */1 :
          return span(undefined, undefined, /* [] */0, /* :: */[
                      term_view(term[0]),
                      /* :: */[
                        punctuation_view("="),
                        /* :: */[
                          term_view(term[1]),
                          /* [] */0
                        ]
                      ]
                    ]);
      case /* InequalityAssert */2 :
          return span(undefined, undefined, /* [] */0, /* :: */[
                      term_view(term[0]),
                      /* :: */[
                        punctuation_view("/="),
                        /* :: */[
                          term_view(term[1]),
                          /* [] */0
                        ]
                      ]
                    ]);
      
    }
  }

  function rule_display(rule) {
    var antecedents = rule.antecedents;
    var introduced_complex = function (introducer, term) {
      return li(undefined, undefined, /* [] */0, /* :: */[
                  punctuation_view(introducer),
                  /* :: */[
                    complex_term_view(term),
                    /* [] */0
                  ]
                ]);
    };
    var tmp;
    if (antecedents) {
      var first = antecedents[0];
      var match = rev(antecedents[1]);
      tmp = match ? ul(undefined, undefined, /* [] */0, concat(/* :: */[
                  /* :: */[
                    introduced_complex("when ", first),
                    /* [] */0
                  ],
                  /* :: */[
                    map((function (param) {
                            return introduced_complex("and ", param);
                          }), rev(match[1])),
                    /* :: */[
                      /* :: */[
                        li(undefined, undefined, /* [] */0, /* :: */[
                              punctuation_view("and "),
                              /* :: */[
                                complex_term_view(match[0]),
                                /* :: */[
                                  punctuation_view("."),
                                  /* [] */0
                                ]
                              ]
                            ]),
                        /* [] */0
                      ],
                      /* [] */0
                    ]
                  ]
                ])) : span(undefined, undefined, /* [] */0, /* :: */[
              punctuation_view(" when "),
              /* :: */[
                complex_term_view(first),
                /* :: */[
                  punctuation_view("."),
                  /* [] */0
                ]
              ]
            ]);
    } else {
      tmp = punctuation_view(".");
    }
    return div$1(undefined, undefined, /* :: */[
                class$prime(rule_display_class),
                /* [] */0
              ], /* :: */[
                term_view(rule.consequent),
                /* :: */[
                  tmp,
                  /* [] */0
                ]
              ]);
  }

  function query_display(complex_terms) {
    return div$1(undefined, undefined, /* :: */[
                class$prime(rule_display_class),
                /* [] */0
              ], /* :: */[
                ul(undefined, undefined, /* [] */0, map((function (complex_term) {
                            return li(undefined, undefined, /* [] */0, /* :: */[
                                        complex_term_view(complex_term),
                                        /* [] */0
                                      ]);
                          }), complex_terms)),
                /* [] */0
              ]);
  }

  function editable(rule_entry) {
    var rule = _1(Types.RuleDatabase.rule_from_entry, rule_entry);
    return div$1(undefined, undefined, /* :: */[
                classList(/* :: */[
                      /* tuple */[
                        rule_item_class,
                        true
                      ],
                      /* :: */[
                        /* tuple */[
                          rule_used_class,
                          false
                        ],
                        /* [] */0
                      ]
                    ]),
                /* [] */0
              ], /* :: */[
                delete_button(Message.deleteRule(rule_entry)),
                /* :: */[
                  a(undefined, undefined, /* :: */[
                        onClick(Message.initiateEditRule(rule_entry)),
                        /* [] */0
                      ], /* :: */[
                        rule_display(rule),
                        /* [] */0
                      ]),
                  /* [] */0
                ]
              ]);
  }

  function readonly(rule_entries_applied, rule_entry) {
    var should_highlight = exists((function (applied) {
            return _2(Types.RuleDatabase.is_same, applied, rule_entry);
          }), rule_entries_applied);
    return div$1(undefined, undefined, /* :: */[
                classList(/* :: */[
                      /* tuple */[
                        rule_item_class,
                        true
                      ],
                      /* :: */[
                        /* tuple */[
                          rule_used_class,
                          should_highlight
                        ],
                        /* [] */0
                      ]
                    ]),
                /* [] */0
              ], /* :: */[
                rule_display(_1(Types.RuleDatabase.rule_from_entry, rule_entry)),
                /* [] */0
              ]);
  }

  var language_editing_class = "language-editing";

  var errors_container_class = "errors-container";

  var editing_container_class = "editing-container";

  var style$5 = "\n        input {\n            margin-left: 6px;\n        }          \n        \n        ." + (String(language_editing_class) + (" {\n            width: 96%;\n            font-family: Consolas, monospace;\n            background-color: black;\n            color: white;\n        }\n\n        ." + (String(errors_container_class) + (" ul {\n            padding-left: 20px;\n            list-style: square;\n        }\n\n        ." + (String(editing_container_class) + (" {\n            margin-bottom: 16px;\n        }\n\n        ." + (String(errors_container_class) + " li {\n            color: #800;\n            font-size: 14px;\n        }\n    ")))))));

  function view$1(editing, header, result_button_caption, message_of_result, cancel_message, placeholder_text) {
    var parse_error_result_view = function (errors) {
      if (errors) {
        return div$1(undefined, undefined, /* :: */[
                    class$prime(errors_container_class),
                    /* [] */0
                  ], /* :: */[
                    ul(undefined, undefined, /* [] */0, map((function (err) {
                                return li(undefined, undefined, /* [] */0, /* :: */[
                                            text(err),
                                            /* [] */0
                                          ]);
                              }), errors)),
                    /* [] */0
                  ]);
      } else {
        return noNode$1;
      }
    };
    var result = editing.compilation_result;
    if (result.tag) {
      return div$1(undefined, undefined, /* :: */[
                  class$prime(editing_container_class),
                  /* [] */0
                ], /* :: */[
                  label(undefined, undefined, /* [] */0, /* :: */[
                        text(header),
                        /* [] */0
                      ]),
                  /* :: */[
                    textarea(undefined, undefined, /* :: */[
                          onInput(undefined, Message.updateText),
                          /* :: */[
                            class$prime(language_editing_class),
                            /* :: */[
                              placeholder(placeholder_text),
                              /* :: */[
                                value$1(editing.text),
                                /* :: */[
                                  noProp,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ], /* [] */0),
                    /* :: */[
                      noNode$1,
                      /* :: */[
                        button_bar(/* :: */[
                              parse_error_result_view(result[0]),
                              /* :: */[
                                button$1(undefined, "Cancel", cancel_message),
                                /* [] */0
                              ]
                            ]),
                        /* [] */0
                      ]
                    ]
                  ]
                ]);
    }
    var msg = _1(message_of_result, result[0]);
    return div$1(undefined, undefined, /* :: */[
                class$prime(editing_container_class),
                /* [] */0
              ], /* :: */[
                label(undefined, undefined, /* [] */0, /* :: */[
                      text(header),
                      /* [] */0
                    ]),
                /* :: */[
                  textarea(undefined, undefined, /* :: */[
                        onInput(undefined, Message.updateText),
                        /* :: */[
                          class$prime(language_editing_class),
                          /* :: */[
                            placeholder(placeholder_text),
                            /* :: */[
                              value$1(editing.text),
                              /* :: */[
                                _3(TeaHtmlEx.Keydown.keydown, editing.text, msg, (function (keydown_info) {
                                        if (keydown_info.keyCode === 13) {
                                          return keydown_info.ctrlKey;
                                        } else {
                                          return false;
                                        }
                                      })),
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ], /* [] */0),
                  /* :: */[
                    div$1(undefined, undefined, /* [] */0, /* :: */[
                          text(_1(sprintf(/* Format */[
                                        /* String_literal */__(11, [
                                            "(ctrl+enter to ",
                                            /* String */__(2, [
                                                /* No_padding */0,
                                                /* Char_literal */__(12, [
                                                    /* ")" */41,
                                                    /* End_of_format */0
                                                  ])
                                              ])
                                          ]),
                                        "(ctrl+enter to %s)"
                                      ]), result_button_caption)),
                          /* [] */0
                        ]),
                    /* :: */[
                      button_bar(/* :: */[
                            button$1(undefined, result_button_caption, msg),
                            /* :: */[
                              button$1(undefined, "Cancel", cancel_message),
                              /* [] */0
                            ]
                          ]),
                      /* [] */0
                    ]
                  ]
                ]
              ]);
  }

  var style$6 = "";

  function view$2(model) {
    var rules = _1(Types.RuleDatabase.all_rules, model.rule_database);
    var readonly_rules_view = function (rules_applied) {
      return div$1(undefined, undefined, /* [] */0, map((function (param) {
                        return readonly(rules_applied, param);
                      }), rules));
    };
    var editable_rules_view = function (param) {
      return div$1(undefined, "editable_rules", /* [] */0, /* :: */[
                  p(undefined, undefined, /* [] */0, /* :: */[
                        text(rules ? "Click the rule text of any rule to edit/update that rule. Clicking X removes the rule from the database WITHOUT a prompt." : "Click <Add Rule/Fact> to start adding rules to the database."),
                        /* [] */0
                      ]),
                  /* :: */[
                    div$1(undefined, undefined, /* [] */0, map(editable, rules)),
                    /* [] */0
                  ]
                ]);
    };
    var match = model.interaction_mode;
    var header;
    header = typeof match === "number" || match.tag ? "Rules and Facts" : "Select an Example";
    var examples = model.interaction_mode;
    var tmp;
    if (typeof examples === "number") {
      tmp = div$1(undefined, "viewing_rules", /* [] */0, /* :: */[
            button_bar(/* :: */[
                  button$1(undefined, "Add Rule / Fact", /* InitiateAddRule */2),
                  /* :: */[
                    rules ? button$1(undefined, "Query", /* InitiateEditQuery */__(1, [/* [] */0])) : noNode$1,
                    /* :: */[
                      button$1(undefined, "Select Example", /* InitiateChooseExample */1),
                      /* [] */0
                    ]
                  ]
                ]),
            /* :: */[
              hr(undefined, undefined, /* [] */0, /* [] */0),
              /* :: */[
                editable_rules_view(),
                /* [] */0
              ]
            ]
          ]);
    } else {
      switch (examples.tag | 0) {
        case /* ChoosingExample */0 :
            var example_button = function (example) {
              return button$1(undefined, example.name, /* ChooseExample */__(2, [example]));
            };
            tmp = div$1(undefined, "choosing_example", /* [] */0, /* :: */[
                  p(undefined, undefined, /* [] */0, /* :: */[
                        text("Select an example to load rules and example queries"),
                        /* [] */0
                      ]),
                  /* :: */[
                    button_bar(map(example_button, examples[0])),
                    /* :: */[
                      button$1(undefined, "Cancel", /* ViewRules */0),
                      /* [] */0
                    ]
                  ]
                ]);
            break;
        case /* AddingRule */1 :
            tmp = div$1(undefined, "adding_rule", /* [] */0, /* :: */[
                  view$1(examples[0], "New Rule", "Add Rule", Message.addRule, /* ViewRules */0, "New rule..."),
                  /* :: */[
                    hr(undefined, undefined, /* [] */0, /* [] */0),
                    /* :: */[
                      readonly_rules_view(/* [] */0),
                      /* [] */0
                    ]
                  ]
                ]);
            break;
        case /* EditingRule */2 :
            var rule_entry = examples[0];
            tmp = div$1(undefined, "editing_rule", /* [] */0, /* :: */[
                  view$1(examples[1], "Editing Rule", "Update Rule", (function (updated_rule) {
                          return Message.editRuleEntry(_2(Types.RuleDatabase.update_rule_entry, rule_entry, updated_rule));
                        }), /* ViewRules */0, "Edit rule..."),
                  /* :: */[
                    hr(undefined, undefined, /* [] */0, /* [] */0),
                    /* :: */[
                      readonly_rules_view(/* :: */[
                            rule_entry,
                            /* [] */0
                          ]),
                      /* [] */0
                    ]
                  ]
                ]);
            break;
        case /* EditingQuery */3 :
            tmp = readonly_rules_view(/* [] */0);
            break;
        case /* ExecutingQuery */4 :
            var solution_stream = examples[0].solution_stream;
            tmp = readonly_rules_view(solution_stream ? solution_stream[0].rules_applied : /* [] */0);
            break;
        
      }
    }
    return panel_view(header, /* :: */[
                tmp,
                /* [] */0
              ]);
  }

  var solution_frame_class = "solution-frame";

  var no_solution_class = "no-solution";

  var example_query_class = "example-query";

  var style$7 = " \n\n    div." + (String(example_query_class) + (" {\n        border-radius: 3px;\n        padding: 5px;\n        margin-bottom: 6px;\n        background-color: #444;\n    }\n\n    div." + (String(no_solution_class) + (" {\n        margin: 4px;\n        padding: 6px;\n        border-radius: 3px;\n        border-color: #aaa;\n        border-width: 1px;\n        border-style: solid;\n        background-color: #fcc;\n    }\n\n    div." + (String(solution_frame_class) + (" {\n        margin: 4px;\n        padding: 4px;\n        border-radius: 3px;\n        border-color: #aaa;\n        border-width: 1px;\n        border-style: solid;\n        background-color: #cfc;\n    }\n\n    div." + (String(solution_frame_class) + " > h3 {\n        font-size: 16px;\n        font-weight: bold;\n        margin: 4px;\n    }\n    \n    ")))))));

  function executing_query_view(param) {
    var displayed_solutions = param.displayed_solutions;
    var solution_stream = param.solution_stream;
    var initiating_query = param.initiating_query;
    var query_view = function (param) {
      return view("Query", /* :: */[
                  query_display(initiating_query),
                  /* [] */0
                ]);
    };
    var solution_view = function (solution) {
      var bindings = _2(Types.Frame.to_strings, initiating_query, solution.frame);
      if (bindings) {
        return div$1(undefined, undefined, /* :: */[
                    class$prime(solution_frame_class),
                    /* [] */0
                  ], /* :: */[
                    h3(undefined, undefined, /* [] */0, /* :: */[
                          text("Satisfied With Variable Substitution(s)"),
                          /* [] */0
                        ]),
                    /* :: */[
                      ul(undefined, undefined, /* [] */0, map((function (txt) {
                                  return li(undefined, undefined, /* [] */0, /* :: */[
                                              text(txt),
                                              /* [] */0
                                            ]);
                                }), bindings)),
                      /* [] */0
                    ]
                  ]);
      } else {
        return div$1(undefined, undefined, /* :: */[
                    class$prime(solution_frame_class),
                    /* [] */0
                  ], /* :: */[
                    h3(undefined, undefined, /* [] */0, /* :: */[
                          text("Satisfied Without Variable Sustitution"),
                          /* [] */0
                        ]),
                    /* :: */[
                      ul(undefined, undefined, /* [] */0, /* [] */0),
                      /* [] */0
                    ]
                  ]);
      }
    };
    var tmp;
    if (displayed_solutions) {
      var count = length(displayed_solutions);
      tmp = view(_1(sprintf(/* Format */[
                    /* String_literal */__(11, [
                        "Prior Solutions (",
                        /* Int */__(4, [
                            /* Int_d */0,
                            /* No_padding */0,
                            /* No_precision */0,
                            /* Char_literal */__(12, [
                                /* ")" */41,
                                /* End_of_format */0
                              ])
                          ])
                      ]),
                    "Prior Solutions (%d)"
                  ]), count), /* :: */[
            label(undefined, undefined, /* [] */0, /* :: */[
                  text("OBSERVE: Some solutions may appear more than once because. There can be multiple paths to reach the same solution and LitLog does not remove duplicate solutions from the display."),
                  /* [] */0
                ]),
            map(solution_view, displayed_solutions)
          ]);
    } else {
      tmp = noNode$1;
    }
    return div$1(undefined, "executing_query", /* [] */0, /* :: */[
                solution_stream ? div$1(undefined, "solutions_remaining", /* [] */0, /* :: */[
                        button_bar(/* :: */[
                              button$1(undefined, "Next Solution", /* NextFrame */3),
                              /* :: */[
                                button$1(undefined, "New Query", /* InitiateEditQuery */__(1, [initiating_query])),
                                /* :: */[
                                  button$1(undefined, "Cancel", /* ViewRules */0),
                                  /* [] */0
                                ]
                              ]
                            ]),
                        /* :: */[
                          query_view(),
                          /* :: */[
                            view("Current Solution", /* :: */[
                                  label(undefined, undefined, /* [] */0, /* :: */[
                                        text("OBSERVE: All rules and facts applied in the discovery of the current solution are highlighted in the Rules and Facts panel."),
                                        /* [] */0
                                      ]),
                                  /* :: */[
                                    solution_view(solution_stream[0]),
                                    /* [] */0
                                  ]
                                ]),
                            /* [] */0
                          ]
                        ]
                      ]) : div$1(undefined, "end_of_stream", /* [] */0, /* :: */[
                        button_bar(/* :: */[
                              button$1(undefined, "New Query", /* InitiateEditQuery */__(1, [initiating_query])),
                              /* :: */[
                                button$1(undefined, "Manage Rules", /* ViewRules */0),
                                /* [] */0
                              ]
                            ]),
                        /* :: */[
                          query_view(),
                          /* :: */[
                            view("All Solutions Found", /* :: */[
                                  label(undefined, undefined, /* [] */0, /* :: */[
                                        text("All of the solutions to the query have been found."),
                                        /* [] */0
                                      ]),
                                  /* [] */0
                                ]),
                            /* :: */[
                              displayed_solutions ? noNode$1 : div$1(undefined, undefined, /* :: */[
                                      class$prime(no_solution_class),
                                      /* [] */0
                                    ], /* :: */[
                                      text("No Solution"),
                                      /* [] */0
                                    ]),
                              /* [] */0
                            ]
                          ]
                        ]
                      ]),
                /* :: */[
                  tmp,
                  /* [] */0
                ]
              ]);
  }

  function editing_query_view(editing_query, query_list) {
    var choose_query_view = function (query) {
      return div$1(undefined, undefined, /* :: */[
                  class$prime(example_query_class),
                  /* :: */[
                    onClick(Message.updateText(_1(Types.Query.to_string, query))),
                    /* [] */0
                  ]
                ], /* :: */[
                  query_display(query),
                  /* [] */0
                ]);
    };
    return div$1(undefined, "editing_query", /* [] */0, /* :: */[
                view$1(editing_query, "Query", "Execute Query", Message.executeQuery, /* ViewRules */0, "New query..."),
                /* :: */[
                  query_list ? div$1(undefined, undefined, /* [] */0, /* :: */[
                          label(undefined, undefined, /* [] */0, /* :: */[
                                text("Example Queries. Click a query below to populate the query entry box with that query."),
                                /* [] */0
                              ]),
                          /* :: */[
                            div$1(undefined, undefined, /* [] */0, map(choose_query_view, query_list)),
                            /* [] */0
                          ]
                        ]) : noNode$1,
                  /* [] */0
                ]
              ]);
  }

  function instructions_view(param) {
    var paragraph = function (txt) {
      return p(undefined, undefined, /* [] */0, /* :: */[
                  text(txt),
                  /* [] */0
                ]);
    };
    var relation = function (fact_name, relations) {
      return _2(Types.Term.make_relation, fact_name, relations);
    };
    var rule = function (consequent, antecedent_terms) {
      return {
              antecedents: map((function (term) {
                      return /* Term */__(0, [term]);
                    }), antecedent_terms),
              consequent: consequent
            };
    };
    var consequent = relation("OrangesAreSpherical", /* [] */0);
    var consequent$1 = relation("oranges_are_spherical", /* [] */0);
    var consequent$2 = relation("Spherical", /* :: */[
          relation("Oranges", /* [] */0),
          /* [] */0
        ]);
    var consequent$3 = relation("Spherical", /* :: */[
          relation("SoccerBalls", /* [] */0),
          /* [] */0
        ]);
    var consequent$4 = relation("Spherical", /* :: */[
          relation("BasketBalls", /* [] */0),
          /* [] */0
        ]);
    var consequent$5 = relation("MotherOf", /* :: */[
          relation("Sally", /* [] */0),
          /* :: */[
            relation("Bob", /* [] */0),
            /* [] */0
          ]
        ]);
    var consequent$6 = relation("SumOf", /* :: */[
          relation("Two", /* [] */0),
          /* :: */[
            relation("Two", /* [] */0),
            /* :: */[
              relation("Four", /* [] */0),
              /* [] */0
            ]
          ]
        ]);
    return div$1(undefined, "instructions", /* [] */0, /* :: */[
                paragraph("LitLog, short for Literate Logic programming, is a subset of Prolog with a simpler syntax and an on-line editor. \n                The goal of LitLog is offer a path to quickly learning the basics of declarative logic programming in three lunch breaks or less."),
                /* :: */[
                  paragraph("When Logic Programming fits the problem space, it beats other programming paradigms by orders of magnitude so it is a helpful tool to\n            have in your mental toolbox (even if an applicable problem may only arise once in a decade). It is also just neat and that alone is worth a few lunch periods."),
                  /* :: */[
                    paragraph("The act of declarative logic programming is building a knowledge database that can be queried. It is the query powers that are surprising and interesting."),
                    /* :: */[
                      paragraph("Rules & Facts are the two forms of knowledge representation."),
                      /* :: */[
                        paragraph("FACTs are unconditionally true statements. As soon as a fact is entered into the database it is known to be true. \n            A Fact can relate other terms together or it can stand on its own. An example of a Fact that stands on its own without any relationships might be"),
                        /* :: */[
                          rule_display({
                                antecedents: /* [] */0,
                                consequent: consequent
                              }),
                          /* :: */[
                            paragraph("A Fact is represented as an identifier written in any case. Spaces cannot be used inside Fact names but underscores can be. The above fact could have also been written"),
                            /* :: */[
                              rule_display({
                                    antecedents: /* [] */0,
                                    consequent: consequent$1
                                  }),
                              /* :: */[
                                paragraph("Facts can also express the truth of a _relationship_ between things. A Fact that expresses a relationship with a single term can be viewed as a declaration of \n            inclusion in a Set (a Predicate). For example, the Fact above could be represented, more usefully, as"),
                                /* :: */[
                                  rule_display({
                                        antecedents: /* [] */0,
                                        consequent: consequent$2
                                      }),
                                  /* :: */[
                                    paragraph("The form above now expresses that Oranges are in the set of spherical things. The knowledge database could list other spherical things"),
                                    /* :: */[
                                      rule_display({
                                            antecedents: /* [] */0,
                                            consequent: consequent$3
                                          }),
                                      /* :: */[
                                        rule_display({
                                              antecedents: /* [] */0,
                                              consequent: consequent$4
                                            }),
                                        /* :: */[
                                          paragraph("Facts can express relationships between multiple things. For example, a fact which expresses a Mother-Child relationship between Sally and Bob"),
                                          /* :: */[
                                            rule_display({
                                                  antecedents: /* [] */0,
                                                  consequent: consequent$5
                                                }),
                                            /* :: */[
                                              paragraph("Another example might be a relation named 'SumOf' that expresses that two and two relate to four "),
                                              /* :: */[
                                                rule_display({
                                                      antecedents: /* [] */0,
                                                      consequent: consequent$6
                                                    }),
                                                /* :: */[
                                                  paragraph("While Facts are uncondtionally true, a RULE specifies a _conclusion_ whose truth is dependent upon one or more conditions. For example, we might instruct the logic database that \n            Sally being the Mother of Bob also means that Sally is a Parent of Bob."),
                                                  /* :: */[
                                                    rule_display(rule(relation("ParentOf", /* :: */[
                                                                  relation("Sally", /* [] */0),
                                                                  /* :: */[
                                                                    relation("Bob", /* [] */0),
                                                                    /* [] */0
                                                                  ]
                                                                ]), /* :: */[
                                                              relation("MotherOf", /* :: */[
                                                                    relation("Sally", /* [] */0),
                                                                    /* :: */[
                                                                      relation("Bob", /* [] */0),
                                                                      /* [] */0
                                                                    ]
                                                                  ]),
                                                              /* [] */0
                                                            ])),
                                                    /* :: */[
                                                      paragraph("Observe that the rule above is unfortunately specific. It is not a general statement about all mothers and sons but rather a specific statement about two specific individuals.\n            In order to get the power of generalization (abstraction) we need to introduce variables."),
                                                      /* :: */[
                                                        paragraph("Variables are written with a ? prefix. To make a general statement about all mothers also being parents we would write"),
                                                        /* :: */[
                                                          rule_display(rule(relation("ParentOf", /* :: */[
                                                                        /* Variable */__(0, [/* VariableName */["Mother"]]),
                                                                        /* :: */[
                                                                          /* Variable */__(0, [/* VariableName */["Child"]]),
                                                                          /* [] */0
                                                                        ]
                                                                      ]), /* :: */[
                                                                    relation("MotherOf", /* :: */[
                                                                          /* Variable */__(0, [/* VariableName */["Mother"]]),
                                                                          /* :: */[
                                                                            /* Variable */__(0, [/* VariableName */["Child"]]),
                                                                            /* [] */0
                                                                          ]
                                                                        ]),
                                                                    /* [] */0
                                                                  ])),
                                                          /* :: */[
                                                            paragraph("Rules can state multiple conditions that must be true for the rule to be true. To encode the transitive property of the GreaterThan relationship we might write"),
                                                            /* :: */[
                                                              rule_display(rule(relation("GreaterThan", /* :: */[
                                                                            /* Variable */__(0, [/* VariableName */["A"]]),
                                                                            /* :: */[
                                                                              /* Variable */__(0, [/* VariableName */["C"]]),
                                                                              /* [] */0
                                                                            ]
                                                                          ]), /* :: */[
                                                                        relation("GreaterThan", /* :: */[
                                                                              /* Variable */__(0, [/* VariableName */["A"]]),
                                                                              /* :: */[
                                                                                /* Variable */__(0, [/* VariableName */["B"]]),
                                                                                /* [] */0
                                                                              ]
                                                                            ]),
                                                                        /* :: */[
                                                                          relation("GreaterThan", /* :: */[
                                                                                /* Variable */__(0, [/* VariableName */["B"]]),
                                                                                /* :: */[
                                                                                  /* Variable */__(0, [/* VariableName */["C"]]),
                                                                                  /* [] */0
                                                                                ]
                                                                              ]),
                                                                          /* [] */0
                                                                        ]
                                                                      ])),
                                                              /* :: */[
                                                                paragraph("Facts, Rules, and Variables are nearly the extent of how knowledge is represented in LitLog. Now we turn to the truly fun part QUERIES!!!\n            "),
                                                                /* [] */0
                                                              ]
                                                            ]
                                                          ]
                                                        ]
                                                      ]
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]);
  }

  function view$3(model) {
    var query_panel = function (header, content) {
      return panel_view(header, /* :: */[
                  content,
                  /* [] */0
                ]);
    };
    var editing_query = model.interaction_mode;
    if (typeof editing_query === "number") {
      return query_panel("Instructions", instructions_view());
    }
    switch (editing_query.tag | 0) {
      case /* EditingQuery */3 :
          return query_panel("Query", editing_query_view(editing_query[0], model.example_queries));
      case /* ExecutingQuery */4 :
          return query_panel("Query", executing_query_view(editing_query[0]));
      default:
        return query_panel("Instructions", instructions_view());
    }
  }

  var style$8 = concat$1(" ", /* :: */[
        style,
        /* :: */[
          style$1,
          /* :: */[
            style$2,
            /* :: */[
              style$3,
              /* :: */[
                style$4,
                /* :: */[
                  style$5,
                  /* :: */[
                    style$6,
                    /* :: */[
                      style$7,
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]);

  function view$4(model) {
    return panels_container_view(/* :: */[
                view$2(model),
                /* :: */[
                  view$3(model),
                  /* [] */0
                ]
              ]);
  }
  /* style Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  var program$1 = navigationProgram((function (_location) {
          return Message.viewRules;
        }), {
        init: (function (param, param$1) {
            return /* tuple */[
                    ApplicationModel.init(undefined),
                    /* NoCmd */0
                  ];
          }),
        update: update$1,
        view: view$4,
        subscriptions: (function (param) {
            return none$1;
          }),
        shutdown: (function (param) {
            return none;
          })
      });

  function main(web_node, param) {
    var style = document.createElement("style");
    document.head.appendChild(style);
    style.innerHTML = style$8;
    return _2(program$1, web_node, undefined);
  }
  /* program Not a pure module */

  exports.main = main;

  return exports;

}({}));
