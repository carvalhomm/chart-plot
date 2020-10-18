import React from 'react';
import { connect } from 'react-redux';
import { Serie } from '../../models/Serie.interface';
import './BottomArea.scss';

class BottomArea extends React.Component<any, any> {

    public canGenerateChart(series: Serie[]): boolean {
        if (!series) { return false; }
        let hasSpan = false;
        let hasAtLeastOneData = false;
        for (const serie of series) {
            if (serie.type === 'span') {
                hasSpan = true;
                if (hasAtLeastOneData) {
                    break;
                }
                continue;
            }
            if (serie.type === 'data') {
                hasAtLeastOneData = true;
                if (hasSpan) {
                    break;
                }
            }
        }
        return hasSpan && hasAtLeastOneData;
    }
    render() {
        const enableButton = this.canGenerateChart(this.props.inputData);
        const classButton = enableButton ? 'add-new' : 'disabled';
        return (
            <footer>
                <button disabled={!enableButton} className={'primary-button ' + classButton} onClick={(e) =>{ console.log('clicked', this.props); this.props.sendGenerateChart(true)}}>GENERATE CHART</button>
            </footer>
        );
    }
}

const mapStateToProps = (store: any) => ({
    inputData: store.inputData.data
});

export default connect(mapStateToProps)(BottomArea);
