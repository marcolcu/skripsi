import EditEvent from "./AdminEditEvent";

export default function EditEventPage(props) {
  const { params } = props;
  return (
    <>
      <EditEvent slug={params && params.slug} />
    </>
  );
}
