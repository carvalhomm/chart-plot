import React from 'react';
import { Serie } from '../../models/Serie.interface';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend
} from 'bizcharts'

interface Data {
    series: Serie[];
}

interface ChartSerie extends Serie {
    label: string;
}

export default class ChartGenerator extends React.Component<Data, Data> {

    private prepareData(input: Serie[]): ChartSerie[] {
        // const start = input.find(inp => inp.type === 'start') as any;
        const span = input.find(inp => inp.type === 'span') as any;
        const data: ChartSerie[] = [];
        for (const s of input) {
            const serie = s as any;
            if (serie.type === 'data' && (span.begin >= serie.min_response_time && span.end <= serie.max_response_time)) {
                data.push({...serie, label: s.os + ' ' + s.browser});
            }
        }
        return data;
    }

    render() {
        console.log('chart generator --> ', this.props.series);
        const data = this.prepareData(this.props.series);
        const cols = {
            min_response_time: {
              range: [0, 1]
            }
        };
        return (
            <Chart height={400} data={data} scale={cols} autoFit>
                <Legend />
                <Axis name="min_response_time" />
                <Axis
                    name="max_response_time"
                />
                <Geom
                    type="line"
                    position="min_response_time*max_response_time"
                    size={2}
                    color={"city"}
                    shape={"smooth"}
                />
                <Geom
                    type="point"
                    position="min_response_time*max_response_time"
                    size={4}
                    shape={"circle"}
                    color={"city"}
                    style={{
                        stroke: "#fff",
                        lineWidth: 1
                    }}
                />
            </Chart>
        );
    }
}
