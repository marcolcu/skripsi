import RegistrationList from "./RegistrationList";

export default function RegistrationListPage(props) {
  const { params } = props;
  return (
    <>
      <RegistrationList slug={params && params.slug} />
    </>
  );
}
