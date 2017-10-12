import React from 'react';
import { Card } from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
        const conceptList = this.props.conceptList.map((item ,index) => {
            return <Card.Grid style={gridStyle} key={item.conceptId}><Link to={`/stocks/${item.conceptId}`}>{item.name}</Link></Card.Grid>
        });

        return (
            <Card title="概念" noHovering>
                {conceptList}
            </Card>
        );
    }
}
export default connect(mapStateToProps)(Concept);