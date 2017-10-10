import React from 'react';
import { Card , Col ,Row , Checkbox} from 'antd';
import {connect} from 'react-redux';
import {
    loadStockList,filterStockList
} from './action';

const CheckboxGroup = Checkbox.Group;

function mapStateToProps(store) {
    return {
        conceptList: store.stockReducer.conceptList,
        stockList: store.stockReducer.stockList,
        filteredStockList: store.stockReducer.filteredStockList,
    };
}

const colStyle = {
    paddingBottom: '8px',

};

const options = [
    { label: '市盈率', value: 'pe' },
    { label: '分类', value: 'size' },
    { label: '主力', value: 'main' },
];

let title = '';


export class Stock extends React.Component{
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        const conceptId = this.props.match.params.conceptId;
        const concept = _.find(this.props.conceptList , (concept) => {
            return concept.id == conceptId;
        });
        //console.log(concept);
        title = concept.name;
        this.props.dispatch(loadStockList(conceptId));
    }

    onChange(checkedValues){
        this.props.dispatch(filterStockList(checkedValues , this.props.stockList));
        //console.log(checkedValues);
    }

    render() {
        const stockList = this.props.filteredStockList.map((item ,index) => {
            return (<Col key={index} style={colStyle} span={6}>
                        <Card key={index} title={item.stockTitle} noHovering>
                            <p>市盈率(静): {item.pe_jing}</p>
                            <p>市盈率(动): {item.pe_dong}</p>
                            <p>分类:{item.size}</p>
                            <p>财务分析: {item.financePositionList}</p>
                            <p>主力: {item.main_control}</p>
                        </Card>
                    </Col>);
        });
        return (
            <div>
                <div style={{ padding: '30px' }}>
                    <h1>{title}</h1>
                </div>
                <div style={{ padding: '30px' }}>
                    <CheckboxGroup options={options} onChange={this.onChange} />
                </div>
                <div style={{ padding: '30px' }}>
                    <Row gutter={16}>
                        {stockList}
                    </Row>
                </div>
            </div>

        );
    }
}
export default connect(mapStateToProps)(Stock);
