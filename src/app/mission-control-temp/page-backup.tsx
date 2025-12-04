import { Hero } from '@/components/sections/hero';
import { CredibilityBar } from '@/components/sections/credibility-bar';
import { CurrentFocus } from '@/components/sections/current-focus';
import { StackRadar } from '@/components/sections/stack-radar';
import { DomainTranslation } from '@/components/sections/domain-translation';
import { SelectedWork } from '@/components/sections/selected-work';
import { Philosophy } from '@/components/sections/philosophy';
import { AvailabilityCta } from '@/components/sections/availability-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <CurrentFocus />
      <StackRadar />
      <DomainTranslation />
      <SelectedWork />
      <Philosophy />
      <AvailabilityCta />
    </>
  );
}
