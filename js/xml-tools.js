

function formatXML() {
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
