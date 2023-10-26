import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

const ListingPage = async () => {
  return (
    <ClientOnly>
      <EmptyState
        title="No favourite food found"
        subtitle="Looks like you have no favourite listings"
      />
    </ClientOnly>
  );
};

export default ListingPage;
