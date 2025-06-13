const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'User',
	tableName: 'users',

	columns: {
		id: {
			primary: true,
			type: 'int',
			generated: true
		},
		firstname: {
			type: 'varchar'
		},
		lastname: {
			type: 'varchar'
		},
		username: {
			type: 'varchar',
			unique: true
		},
		password: {
			type: 'varchar'
		}
	},
});