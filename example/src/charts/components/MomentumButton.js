import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import getSummary from './MomentumResults/GetSummary';

export default class MomentumButton extends React.Component {

    toggleResults() {
        getSummary()
    }

    render() {
        return (
            <div>
                <br></br>
                <Button onClick={this.toggleResults} variant="outline-primary">Run Strategy</Button>
            </div>
        )
    }
}