import VenueDetailPage from "./VenueDetail";

export default function VenueDetail(props) {
  const { params } = props;
  return (
    <>
      <VenueDetailPage slug={params && params.slug} />
    </>
  );
}
