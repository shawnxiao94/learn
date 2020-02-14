import React, { Component } from 'react'
import SearchBar from '@/components/UI/SearchBar'
import { Form, Input, Button } from 'antd'
class Search extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <SearchBar>
        <div className='search-bar-left'>
          <Form layout='inline'>
            <Form.Item>
              <Button type='primary'>Primary</Button>
            </Form.Item>
            <Form.Item>
              <Button>Default</Button>
            </Form.Item>
            <Form.Item>
              <Button type='dashed'>Dashed</Button>
            </Form.Item>
            <Form.Item>
              <Button type='link'>Link</Button>
            </Form.Item>
          </Form>
        </div>
        <div className='search-bar-right'>
          <Form layout='inline'>
            <Form.Item>
              <Input
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item>
              <Input
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary'>
                            Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </SearchBar>
    )
  }
}

export default Search