import type { Company, CreateCompany, UpdateCompany } from "@sculpt/drizzle";

export interface CompaniesRepository {
	create({
		corporateTaxCode,
		email,
		createdAt,
		id,
		logoUrl,
	}: CreateCompany): Promise<Company>;
	update({
		id,
		corporateTaxCode,
		email,
		createdAt,
		logoUrl,
	}: UpdateCompany): Promise<Company>;
	getById(id: string): Promise<Company | null>;
	delete(id: string): Promise<void>;
}
