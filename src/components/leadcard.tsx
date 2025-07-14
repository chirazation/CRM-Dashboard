type LeadCardProps = {
  name: string;
  email: string;
};

export default function LeadCard({ name, email }: LeadCardProps) {
  return (
    <div className="border p-4 rounded">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
