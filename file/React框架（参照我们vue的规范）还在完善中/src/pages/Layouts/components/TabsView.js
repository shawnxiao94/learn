import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd'
import router from '@/router/config'
import './TabsView.less'
const { TabPane } = Tabs
@withRouter
class TabsView extends Component {
    constructor(props) {
        super(props)
        this.newTabIndex = 0
        const panes = []
        this.state = {
            activeKey: '',
            panes
        }
    }

    onChange = activeKey => {
        this.setState({ activeKey })
        this.props.history.push(activeKey)
    };
    
    onEdit = (targetKey, action) => {
        this[action](targetKey)
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            if (this.state.panes.some(item => item.key === nextProps.location.pathname)) {
                this.setState({ activeKey: nextProps.location.pathname })
            } else {
                let nextRoute = router.find(item => item.path === nextProps.location.pathname)
                this.add({
                    title: nextRoute.name,
                    key: nextRoute.path
                })
            }
        }
    };
    
    onEdit = (targetKey, action) => {
        this[action](targetKey)
    };
    
    add = ({ title = 'New Tab', content = '', key }) => {
        const { panes } = this.state
        const activeKey = key || `newTab${this.newTabIndex++}`
        panes.push({ title: title, content: content, key: activeKey })
        if (panes.length === 1) {
            panes[0].closable = false
        } else if (panes.length > 1) {
            panes[0].closable = true
        }
        this.setState({ panes, activeKey })
    };

    remove = targetKey => {
        let { activeKey } = this.state
        let lastIndex
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1
            }
        })
        const panes = this.state.panes.filter(pane => pane.key !== targetKey)
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key
            } else {
                activeKey = panes[0].key
            }
        }
        if (panes.length === 1) {
            panes[0].closable = false
        }
        this.setState({ panes, activeKey })
        if (targetKey === this.props.location.pathname) {
            this.props.history.push(activeKey)
        }
    };

    render() {
        return (
            <div className='tabs-view'>
                <Tabs
                    hideAdd
                    onChange={this.onChange.bind(this)}
                    activeKey={this.state.activeKey}
                    type='editable-card'
                    onEdit={this.onEdit}
                    style={{ display: (this.state.panes.length) ? 'block' : 'none' }}
                >
                    {this.state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable} />
                    ))}
                </Tabs>
            </div>
        )
    }
}
export default TabsView