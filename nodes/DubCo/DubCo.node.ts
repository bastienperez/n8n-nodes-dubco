import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class DubCo implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Dub Co',
		name: 'DubCo',
		icon: 'file:dubco.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from Dub.co API',
		defaults: {
			name: 'Dub Co',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'DubCoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.dub.co',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Links',
						value: 'links',
					},
					{
						name: 'Workspaces',
						value: 'workspaces',
					},
				],
				default: 'links',
			},
			// Operations will go here
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'links',
						],
					},
				},
				options: [
					{
						name: 'Get links',
						type: 'string',
						required: true,
						value: 'get',
						action: 'Get the links',

						routing: {
							request: {
								method: 'GET',
								url: '/links?workspaceId={{$value}}',
							},
						},
					},
					{
						name: 'New link',
						value: 'new',
						action: 'Create new link',

						routing: {
							request: {
								method: 'POST',
								url: '/links?workspaceId={{$value}}',
							},
						},
					},
				],
				default: 'get',
			}
		]
	};
}
