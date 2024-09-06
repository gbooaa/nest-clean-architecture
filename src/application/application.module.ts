import { ProvidersModule } from '@framework/providers/providers.module';
import { Module } from '@nestjs/common';
import { GendersUseCases } from './genders.use-cases';

@Module({
  imports: [ProvidersModule],
  providers: [
    // Add UseCases Provider | Don't remove this line
    GendersUseCases,
  ],
  exports: [
    // Add UseCases Exports | Don't remove this line
    GendersUseCases,
  ],
})
export class ApplicationLayerModule {}
