import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SidebarWrapper } from './style'
// import { Link } from 'react-router-dom';

class Sidebar extends PureComponent {
	render() {
    const { menuList } = this.props;
		return (
			<SidebarWrapper>
        {
          menuList.map((item, index) => (
          <a key={index} href={item.get('path')} style={{display:"block",margin:"10px"}}>
            {item.get('title')}
          </a>          
        ))          
        }
			</SidebarWrapper>
		)
	}

	componentDidMount() {

	}

}

const mapState = (state) => ({
  menuList: state.getIn(['menu','menuList'])
})

const mapDispatch = (dispatch) => ({

});

export default connect(mapState, mapDispatch)(Sidebar);
