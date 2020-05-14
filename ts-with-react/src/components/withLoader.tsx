import React from 'react'
import axiso from 'axios'

interface ILoaderState {
  data: any,
  isLoading: boolean
}
interface ILoaderProps {
  data: any
}

const WithLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
    constructor(props: any) {
      super(props)
      this.state = {
        data: null,
        isLoading: false
      }
    }

    componentDidMount () {
      this.setState({
        isLoading: true
      })

      
    }
  }
}
