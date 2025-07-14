export default function LeadDetailPage({ params }: { params: { id: string } }) {
  return <h1>Détail du Lead ID : {params.id}</h1>;
}
