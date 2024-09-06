// Add Adapters for data providers | Don't remove this line
import { GendersAdapter } from '@domain/genders';

export abstract class IDataServices {
  // Add abstracts | Don't remove
  abstract genders: GendersAdapter;
}
