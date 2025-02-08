import React from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị giao diện thay thế khi có lỗi
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Bạn có thể log lỗi vào dịch vụ báo cáo lỗi tại đây
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Bạn có thể render bất cứ UI thay thế nào khi có lỗi
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default Error;