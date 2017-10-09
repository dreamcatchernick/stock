import React from 'react';
import { Card } from 'antd';
import {connect} from 'react-redux';
import {
    loadConceptList
} from './action';

function mapStateToProps(store) {
    return {
        conceptList: store.stockReducer.conceptList
    };
}
const gridStyle = {
    width: '10%',
    textAlign: 'center',

};

export class Concept extends React.Component{
    constructor(){
        super();
    }

    componentWillMount(){
        this.props.dispatch(loadConceptList());
    }

    render() {
        // const conceptList = this.props.conceptList.map((item ,index) => {
        //     return <Card.Grid style={gridStyle} key={item.id}><a href="#">{item.name}</a></Card.Grid>
        // });
        const conceptList = <Card.Grid style={gridStyle} key="1"><a href="#">测试</a></Card.Grid>;
        return (
            <Card title="概念" noHovering>
                {conceptList}
            </Card>
        );
    }
}
export default connect(mapStateToProps)(Concept);