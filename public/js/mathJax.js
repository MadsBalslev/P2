/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const convert = (input, output) => {
  MathJax.texReset();
  const options = MathJax.getMetricsFor(output);
  MathJax.tex2svgPromise(input, options).then((node) => {
    output.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  }).catch((err) => {
    output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err
      .message));
  }).then(() => {});
};
