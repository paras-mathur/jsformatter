var inputCodeMirror = CodeMirror($('#input-col')[0], {
  lineNumbers: true,
  placeholder: "Code goes here...",
  mode: "javascript",
  extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});

var config = {
  "indent_size": 2,
  // Collapse curly brackets
  "brace_style": "collapse",

  // Break chained method calls across subsequent lines
  "break_chained_methods": true,

  // End output with newline
  "end_with_newline": true,

  // Evaluate code
  "eval_code": false,

  // Indentation character
  "indent_char": " ",

  // Initial indentation level
  "indent_level": 0,

  // Indent with tabs, overrides 'indent_size' and 'indent_char'
  "indent_with_tabs": false,

  // Enable jslint-stricter mode
  "jslint_happy": false,

  // Preserve array indentation
  "keep_array_indentation": false,

  // Preserve function indentation
  "keep_function_indentation": false,

  // Number of line-breaks to be preserved in one chunk
  "max_preserve_newlines": 10,

  // Preserve newlines
  "preserve_newlines": true,

  // Add a space before an anonymous function's parentheses, i.e. function ()
  "space_after_anon_function": true,

  // Add a space before the conditional statement i.e. 'if (true)'
  "space_before_conditional": true,

  // Add padding spaces within empty parentheses i.e. 'f( )'
  "space_in_empty_paren": false,

  // Add padding spaces within parentheses i.e. 'f( a, b )'
  "space_in_paren": false,

  // Decode printable characters encoded in xNN notation
  "unescape_strings": false,

  // Wrap lines at next opportunity after N characters
  "wrap_line_length": 0

}

var outputCodeMirror = CodeMirror($('#output-col')[0], {
  lineNumbers: true,
  placeholder: "Formatted code here...",
  mode: "javascript",
  extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});

inputCodeMirror.on("change",function(cm,obj){
               if( isHTML(inputCodeMirror.getValue()) ){
                inputCodeMirror.setOption("mode", "htmlmixed");
                outputCodeMirror.setOption("mode", "htmlmixed");
               } else {
                  inputCodeMirror.setOption("mode", "javascript");
                  outputCodeMirror.setOption("mode", "javascript");
               }         
});

function isHTML(source) {
  var trimmed = source.replace(/^[ \t\n\r]+/, '');
  return trimmed && (trimmed.substring(0, 1) === '<');
}

function formatJS() {
  var data = inputCodeMirror.getValue();
  var formattedCode;

  if (isHTML(data)) {
    formattedCode = html_beautify(data, config);
  } else {
    formattedCode = js_beautify(data, config);
  }

  outputCodeMirror.setValue(formattedCode);
  $('textarea#output-textarea').val(formattedCode);
  /* Get the text field */
  var copyText = document.getElementById("output-textarea");

  /* Select the text field */
  copyText.select();
  
  document.execCommand("copy");
}
