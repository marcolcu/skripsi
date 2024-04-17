import OrderDetail from "./OrderDetail";

export default function OrderDetailPage(props) {
  const { params } = props;
  return (
    <>
      <OrderDetail slug={params && params.slug} />
    </>
  );
}
