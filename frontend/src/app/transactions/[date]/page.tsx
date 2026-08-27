import React, { use } from 'react';

type Props = { params: Promise<{ date: string }> };

const TransactionDatePage = ({ params }: Props) => {
  const { date } = use(params);

  return <div>TransactionDatePage</div>;
};

export default TransactionDatePage;
