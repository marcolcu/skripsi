import EventDetailPage from "./EventDetail";

export default function EventDetail(props) {
  const { params } = props;
  return (
    <>
      <EventDetailPage slug={params && params.slug} />
    </>
  );
}
