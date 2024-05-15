import EditVenue from "./AdminEditVenue";

export default function EditVenuePage(props) {
  const { params } = props;
  return (
    <>
      <EditVenue slug={params && params.slug} />
    </>
  );
}
