import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { getOngoingElections } from '@/app/actions/election';
import ElectionCard from '@/components/landing/election-card';
import EmptyState from '@/components/empty-state';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileDownIcon } from 'lucide-react';

const LandingPage = async () => {
  const elections = await getOngoingElections();

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
            Ejerce tu derecho al voto
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Con el sistema de votación electrónica {siteConfig.name}, los
            resultados de las elecciones se obtienen en minutos, no en días.
          </p>
          <div className="space-x-4">
            <Link href="/vote" className={cn(buttonVariants({ size: 'lg' }))}>
              Votar
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Resultados
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Elecciones en curso
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Conoce los procesos electorales en los que puedes participar.
          </p>
        </div>
        {elections && elections.length > 0 ? (
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {elections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No hay elecciones en curso"
            subtitle="Intenta más tarde"
          />
        )}
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Normativa legal
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Conoce los reglamentos que rigen el sistema de votación electrónica{' '}
            {siteConfig.name}.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reglamento">
              <AccordionTrigger>
                Reglamento de elecciones de representantes ante el órgano de
                Cogobierno UNIB.E
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="https://unibe.edu.ec/wp-content/uploads/2023/08/REGLAMENTO-DE-ELECCIONES-REPRESENTANTES-ANTE-EL-ORGANO-DE-COGOBIERNO-DE-LA-UNIBE-signed.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  <FileDownIcon className="mr-2 h-4 w-4" />
                  Descargar PDF
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
