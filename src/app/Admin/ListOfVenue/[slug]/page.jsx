import BookingList from "./BookingList";

export default function BookingListPage(props) {
  const { params } = props;
  return (
    <>
      <BookingList slug={params && params.slug} />
    </>
  );
}
