import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inputData } from '../../store/actions/actions-creators/input-action';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Serie } from '../../models/Serie.interface';
import { SerieType } from '../../models/Serie.type';
import IfDirective from '../../directives/IfDirective';
import './InputArea.scss';

class InputArea extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
          form: [this.initSerie('start'), this.initSerie('span'), this.initSerie('stop')]
        };
    }

    private initSerie(type?: SerieType): Serie {
        if (type && type === 'start') {
            return {type: type, timestamp: new Date().getTime(), group: ['os', 'browser'], select: ['min_response_time', 'max_response_time']};
        } else if (type === 'span') {
            return {type: type, timestamp: new Date().getTime()};
        } else {
            return {type: type ? type : 'data', timestamp: new Date().getTime()};
        }
    }

    public addForm = () => {
        const newForm: Serie[] = this.state.form;
        const end = {...newForm[newForm.length - 1]};
        newForm.push(this.initSerie());
        newForm.push(end);
        this.setState({
            form: newForm
        });
    }

    public transformIntoDate(timestamp: number): Date {
        return new Date(timestamp);
    }

    public updateSeries = (index: number, value: any, field: any) => {
        const form: Serie[] = this.state.form;
        const serie: any = form[index];
        serie[field] = value;
        form[index] = serie;
        this.setState({
            form: form
        });
        this.props.inputData(form);
    }

    public removeData = (index: number) => {
        const form: any[] = this.state.form;
        form.splice(index, 1);
        this.setState({
            form: form
        });
    }

    render() {
        return (
            <div className="input-box">
                <h2>Insert data to create and display chart</h2>
                {this.state.form.map((form: Serie, index: number) => {
                    if (form.type === 'start' || form.type === 'stop') { return null; }
                    return (
                        <form key={index} className="input-line" noValidate autoComplete="off">
                            <IfDirective condition={form.type === 'span'}>
                                <TextField disabled value={form.type} select label="Type" onChange={(e) => this.updateSeries(index, e.target.value, 'type')} variant="outlined">
                                    <MenuItem key="span" value="span">span</MenuItem>
                                </TextField>
                            </IfDirective>
                            <IfDirective condition={form.type === 'data'}>
                            <TextField disabled value={form.type} select label="Type" onChange={(e) => this.updateSeries(index, e.target.value, 'type')} variant="outlined">
                                <MenuItem key="data" value="data">data</MenuItem>
                            </TextField>
                            </IfDirective>
                            <IfDirective condition={form.type === 'data'}>
                                <TextField
                                    label="Min_response_time"
                                    type="time"
                                    defaultValue="00:01"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    onChange={(e) => this.updateSeries(index, e.target.value, 'min_response_time')}
                                />
                                <TextField
                                    label="Max_response_time"
                                    type="time"
                                    defaultValue="00:01"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    onChange={(e) => this.updateSeries(index, e.target.value, 'max_response_time')}
                                />
                                <TextField label="OS" onChange={(e) => this.updateSeries(index, e.target.value, 'os')} />
                                <TextField label="Browser" onChange={(e) => this.updateSeries(index, e.target.value, 'browser')} />
                            </IfDirective>
                            <IfDirective condition={form.type === 'span'}>
                                <TextField
                                    label="Begin"
                                    type="time"
                                    defaultValue="00:01"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    onChange={(e) => this.updateSeries(index, e.target.value, 'begin')}
                                />
                                <TextField
                                    label="End"
                                    type="time"
                                    defaultValue="00:01"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    onChange={(e) => this.updateSeries(index, e.target.value, 'end')}
                                />
                            </IfDirective>
                            <IfDirective condition={index > 0}>
                                <button className="primary-button remove" onClick={() => this.removeData(index)}>Excluir</button>
                            </IfDirective>
                        </form>
                    )
                })}
                <button className="primary-button add-new" onClick={() => this.addForm()}>Adicionar dado</button>
            </div>
        );
    }
}

const mapStateToProps = (store: any) => ({
    inputDataStore: store.inputData.data
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ inputData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InputArea);