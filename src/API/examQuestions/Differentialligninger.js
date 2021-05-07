const { randNum } = require('../../helper');
var MathJaxInit = {
        insertScript: function(doc) {
            var googleFix = '.MathJax .mn {background: inherit;} .MathJax .mi {color: inherit;} .MathJax .mo {background:. inherit;}';
            var style = do .createElement('style');
                style.innerText = googleFix;
            try {
                style.textContent = googleFix;
            } catch (e) {}
            doc.getElementsByTagName('body')[0].appendChild(style);

            var script = doc.createElement('script'),
                config;
            script.src = 'MathJax/MathJax.js?config=TeX-MML-AM_HTMLorMML.js';
            script.type = 
        }
    }
    /**
     * Represents a power integral exercise.
     * @constructor
     */
function differentialLigningExercise() {
    const { A, B, C, D } = diffLigningVars();
    this.txt = 'Find den fulstændige løsning til differentialligningen.';
    this.type = 'differentialligning';
    this.point = 10;
    this.tegn = '';
    this.exerciseVars = { Differentialligning: `y' = ${B}y*(${A}-y)` };
    this.facit = '';
}

function particularDifferentialExercise() {
    const { A, B, C, D } = diffLigningVars();
    this.txt = 'Find den partikulære løsning til differentialligningen.';
    this.type = 'differentialligning';
    this.point = 10;
    this.tegn = '';
    this.exerciseVars = {
        Differentialligning: ``};
    this.facit = '';
}

const diffLigningVars = () => {
    const A = randNum(8) + 1;
    const B = randNum(8) + 1;
    const C = randNum(8) + 1;
    const D = randNum(15) + 1;

    return { A, B, C, D }
}


const numOfTasks = 2;
module.exports = {
    PowerIntegralExercise,
    numOfTasks,
};