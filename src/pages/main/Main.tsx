import React from 'react';
import { connect } from 'react-redux';
import BottomArea from '../../components/bottom-area/BottomArea';
import ChartGenerator from '../../components/chart-generator/ChartGenerator';
import InputArea from '../../components/input-area/InputArea';
import IfDirective from '../../directives/IfDirective';

class MainPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log('props main --> ', props);
        this.state = {
            shouldGenerate: false
        };
    }

    public sendGenerateChart = (shouldGenerate: boolean) => {
        console.log('generating chart ---> ', shouldGenerate);
        this.setState({shouldGenerate});
    }

    render() {
        return (
            <div className="app-base">
                <InputArea></InputArea>
                <IfDirective condition={this.state.shouldGenerate}>
                    <ChartGenerator series={this.props.inputData}></ChartGenerator>
                </IfDirective>
                <IfDirective condition={!this.state.shouldGenerate}>
                    <div>
                        <span>No chart to exhibit</span>
                    </div>
                </IfDirective>
                <BottomArea sendGenerateChart={this.sendGenerateChart}></BottomArea>
            </div>
        );
    }
}

const mapStateToProps = (store: any) => ({
    inputData: store.inputData.data
});

export default connect(mapStateToProps)(MainPage);
