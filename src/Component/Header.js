import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, TabHeading, Icon } from 'native-base';
import Tab1 from './Product';
import Tab2 from '../Screen/ManageProduct';
import Tab3 from '../Screen/History';
import Tab4 from './Users'
import Tab5 from '../Screen/RecentOrder'
export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={<TabHeading><Icon name="home" /></TabHeading>}>
            <Tab1 navigate={this.props.navigate} />
          </Tab>
          <Tab heading={<TabHeading><Icon name="pie" /></TabHeading>}>
            <Tab3 />
          </Tab>
          <Tab heading={<TabHeading><Icon name="md-options" /></TabHeading>}>
            <Tab2 navigate={this.props.navigate} />
          </Tab>
          <Tab heading={<TabHeading><Icon name="clipboard" /></TabHeading>}>
            <Tab5 />
          </Tab>
          <Tab heading={<TabHeading><Icon name="person" /></TabHeading>}>
            <Tab4 navigate={this.props.navigate} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}