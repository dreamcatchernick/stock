import React from 'react';
import { Layout } from 'antd';
import Concept from './concept';
import Stock from './stock';
const { Header, Content, Footer} = Layout;


const headerStyle = {
    color: 'white',
    fontSize: '26px'
};

export class Main extends React.Component{
    constructor(){
        super();
    }

    render() {
        return (
            <Layout>
                <Header style={headerStyle}>选股器</Header>
                <Layout><Content><Stock/></Content></Layout>
            </Layout>
        );
    }
}

export default Main;
