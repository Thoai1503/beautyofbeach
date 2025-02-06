import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Ôi Không!</h1>
      <p>Xin lỗi vì sự bất tiện này, hãy kiểm tra lại đường dẫn của bạn.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;