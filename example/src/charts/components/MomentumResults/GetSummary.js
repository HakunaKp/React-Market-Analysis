import AAPL1Min390Summary from '../../../momentum/summaries/AAPL/1Min_390DecisionSummary.txt';

export default function getSummary() {
    var decisions = AAPL1Min390Summary
    fetch(decisions)
    .then(decisions => decisions.text())
    .then(text => {
        alert(text);
    });
}