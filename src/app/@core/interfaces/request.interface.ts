export interface IRequest<T = any> {
	//! Essa interface está descontinuada e não deve ser
	//! utilizada em novos locais
	// * Utilizar o type ResquestT
	title: string;
	status: number;
	data: T;
}
