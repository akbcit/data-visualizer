import { VectorDoc } from '@datastax/astra-db-ts';
import { PublicSectorCompany } from "../../../dataModels/PublicSectorCompany.model.ts";

export interface PublicSectorCompanySchema extends PublicSectorCompany, VectorDoc {
}