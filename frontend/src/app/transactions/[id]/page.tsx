type Props = {
  params: Promise<{ id: string }>;
};

const TransactionDetail = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div>
      TransactionDetail
      <span>transaction ID : {id}</span>
    </div>
  );
};

export default TransactionDetail;
