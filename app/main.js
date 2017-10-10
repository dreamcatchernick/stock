import React from 'react';
import { Layout } from 'antd';
import Concept from './concept';
import Stock from './stock';
import {Route, HashRouter} from 'react-router-dom';
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
                <Layout>
                    <HashRouter>
                        <Content>
                                <Route exact path="/" component={Concept}/>
                                <Route path="/stocks/:conceptId" component={Stock}/>
                        </Content>
                    </HashRouter>
                </Layout>
            </Layout>
        );
    }
}

export default Main;
