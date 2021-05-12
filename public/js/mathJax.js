/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Converts the input and output into mathJax
 * @param {} input The input from website.
 * @param {} output The output to the website
 */
const convert = (input, output) => {
  MathJax.texReset();
  const options = MathJax.getMetricsFor(output);
  MathJax.tex2chtmlPromise(input, options).then((node) => {
    output.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  }).catch((err) => {
    output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err
      .message));
  }).then(() => {});
};
