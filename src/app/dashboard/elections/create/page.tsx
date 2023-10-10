import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import ElectionForm from '@/components/dashboard/elections/form';

const CreateElectionPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Crear elección"
          subtitle="Registre un nuevo proceso electoral en el sistema"
        />
        <GoBack />
      </div>
      <ElectionForm />
    </div>
  );
};

export default CreateElectionPage;
